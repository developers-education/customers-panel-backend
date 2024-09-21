import type { ZodType } from 'zod';
import { createDocument, oas31, ZodOpenApiObject } from 'zod-openapi';

export interface IOpenApi {
  build(): OpenAPIObject;
  setInfo(info: InfoObject): void;
  addPath(method: OpenApiMethod, path: string, params?: PathParams): void;
}

export type OpenAPIObject = ReturnType<typeof createDocument>;
export type InfoObject = ZodOpenApiObject['info'];

export type PathParams = {
  responses?: ResponseSpec[];
  requestBody?: RequestBodySpec;
  summary?: string;
  query?: ZodType;
  params?: ZodType;
  cookie?: ZodType;
  header?: ZodType;
};

export type ResponseSpec = {
  statusCode: number;
  contentType: string;
  schema?: ZodType | oas31.SchemaObject;
};

export type RequestBodySpec = {
  contentType: string;
  schema?: ZodType | oas31.SchemaObject;
};

export type OpenApiMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';
