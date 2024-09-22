import {
  Body,
  Chain,
  Controller,
  Handler,
  HandlerMeta,
  Params,
  Response,
} from '@/infrastructure/web-server/controllers-definition/decorators';
import { getValidatedRouterParams, H3Event, readValidatedBody, send } from 'h3';
import { ICreateCustomerCase } from '@/domain/customers/types/create-customer-case.interface';
import { createCustomerSchema } from '@/api/customers/schemas/create-customer.schema';
import { updateCustomerSchema } from '@/api/customers/schemas/update-customer.schema';
import { IUpdateCustomerCase } from '@/domain/customers/types/update-customer-case.interface';
import { idParamSchema } from '@/common/schemas/id-param.schema';
import { IGetCustomerByIdCase } from '@/domain/customers/types/get-customer-by-id-case.interface';
import { customerResponseSchema } from '@/api/customers/schemas/customer-response.schema';
import { appDi } from '@/infrastructure/ioc-container';
import { IChainHandler } from '@/infrastructure/web-server/types/chain-handler.interface';

const auth = appDi.resolve<IChainHandler>('authChainHandler');

@Chain(auth)
@Controller('/customers')
export class CustomersController {
  constructor(
    private readonly createCustomerCase: ICreateCustomerCase,
    private readonly updateCustomerCase: IUpdateCustomerCase,
    private readonly getCustomerByIdCase: IGetCustomerByIdCase,
  ) {}

  @Handler('POST')
  @HandlerMeta({
    summary: 'Create customer',
  })
  @Body(createCustomerSchema)
  @Response(204, '')
  public async createCustomer(event: H3Event) {
    const params = await readValidatedBody(event, createCustomerSchema.parse);
    const birthDate = new Date(params.birthDate);
    await this.createCustomerCase.execute({ ...params, birthDate });
    await send(event);
  }

  @Handler('PATCH', '/:id')
  @HandlerMeta({
    summary: 'Update customer',
  })
  @Body(updateCustomerSchema)
  @Params(idParamSchema)
  @Response(204, '')
  public async updateCustomer(event: H3Event) {
    const { id } = await getValidatedRouterParams(event, idParamSchema.parse);
    const data = await readValidatedBody(event, updateCustomerSchema.parse);
    const birthDate = data.birthDate ? new Date(data.birthDate) : undefined;
    await this.updateCustomerCase.execute(id, { ...data, birthDate });
    await send(event);
  }

  @Handler('GET', '/:id')
  @HandlerMeta({
    summary: 'Get customer by id',
  })
  @Response(200, customerResponseSchema)
  public async getCustomerById(event: H3Event) {
    const { id } = await getValidatedRouterParams(event, idParamSchema.parse);
    const customer = await this.getCustomerByIdCase.execute(id);
    const result = customerResponseSchema.parse(customer);
    await send(event, result);
  }
}
