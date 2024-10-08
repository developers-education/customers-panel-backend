import { IControllerInitializer } from '@/infrastructure/web-server/controllers-definition/types/controller-initializer.interface';
import {
  Controller,
  HandlerFunc,
} from '@/infrastructure/web-server/types/shared';
import { defineEventHandler, H3Event, HTTPMethod, Router } from 'h3';
import { IControllersState } from '@/infrastructure/web-server/controllers-definition/types/controllers-state.interface';
import { ILogger } from '@/infrastructure/logger/types/logger.interface';
import { normalizeApiError } from '@/infrastructure/web-server/errors/normalize-api-error';
import { IChainHandler } from '@/infrastructure/web-server/types/chain-handler.interface';
import { IOpenApi } from '@/infrastructure/web-server/types/open-api-builder.interface';
import { IConfig } from '@/infrastructure/config/types/config.interface';

export class ControllerInitializer implements IControllerInitializer {
  constructor(
    private readonly openApi: IOpenApi,
    private readonly logger: ILogger,
    private readonly controllersState: IControllersState,
    private readonly apiRouter: Router,
    private readonly config: IConfig,
  ) {}

  public init(controller: Controller): this {
    const controllerDef = this.controllersState.getControllerDef(
      controller.constructor.prototype,
    );
    if (!controllerDef) {
      this.logger.warn(
        `${controller.constructor.name} not registered: not defined in controllers state.`,
      );
      return this;
    }

    this.openApi.setInfo(this.config.openApi);

    controllerDef.handlers.forEach((handlerDef) => {
      const fullPath = (controllerDef.prefix ?? '') + (handlerDef.path ?? '');
      const fullChain = [...controllerDef.chain, ...handlerDef.chain];
      const boundHandler = handlerDef.handler.bind(controller);
      const handler = this.withErrorHandler(
        this.withChain(boundHandler, fullChain),
      );
      const method = handlerDef.method.toLowerCase() as Lowercase<HTTPMethod>;

      this.apiRouter.add(fullPath, defineEventHandler(handler), method);

      if (method === 'connect') return;

      const openApiPath = fullPath
        .split('/')
        .map((part) => {
          if (part.startsWith(':')) {
            return `{${part.substring(1)}}`;
          } else {
            return part;
          }
        })
        .join('/');

      this.openApi.addPath(method, openApiPath, {
        responses: [
          ...controllerDef.openApiResponses,
          ...handlerDef.openApiResponses,
        ],
        requestBody: handlerDef.openApiBody,
        summary: handlerDef.openApiSummary,
        params: handlerDef.openApiParams,
        query: handlerDef.openApiQuery,
        cookie: handlerDef.openApiCookie,
        header: handlerDef.openApiHeader,
      });
    });

    return this;
  }

  private withChain(handler: HandlerFunc, chain: IChainHandler[]): HandlerFunc {
    let lastFunc = handler;
    for (const chainHandler of chain.reverse()) {
      const chainFunc = chainHandler.handle.bind(chainHandler);
      const prev = lastFunc;
      lastFunc = (event) => chainFunc(event, prev);
    }
    return lastFunc;
  }

  private withErrorHandler(handler: HandlerFunc): HandlerFunc {
    return async (event: H3Event) => {
      try {
        return await handler(event);
      } catch (error: unknown) {
        this.logger.error(error as Error, 'Caught error.');
        throw normalizeApiError(error);
      }
    };
  }
}
