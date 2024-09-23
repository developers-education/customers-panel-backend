import {
  Body,
  Chain,
  Controller,
  Handler,
  HandlerMeta,
  Params,
  Query,
  Response,
} from '@/infrastructure/web-server/controllers-definition/decorators';
import {
  getValidatedQuery,
  getValidatedRouterParams,
  H3Event,
  readValidatedBody,
  setResponseStatus,
} from 'h3';
import { ICreateCustomerCase } from '@/domain/customers/types/create-customer-case.interface';
import { createCustomerSchema } from '@/api/customers/schemas/create-customer.schema';
import { updateCustomerSchema } from '@/api/customers/schemas/update-customer.schema';
import { IUpdateCustomerCase } from '@/domain/customers/types/update-customer-case.interface';
import { idParamSchema } from '@/common/schemas/id-param.schema';
import { IGetCustomerByIdCase } from '@/domain/customers/types/get-customer-by-id-case.interface';
import { plainCustomerResponseSchema } from '@/api/customers/schemas/plain-customer-response.schema';
import { appDi } from '@/infrastructure/ioc-container';
import { IChainHandler } from '@/infrastructure/web-server/types/chain-handler.interface';
import { IDeleteCustomerCase } from '@/domain/customers/types/delete-customer-case.interface';
import { IGetCustomersWithPagesCase } from '@/domain/customers/types/get-customers-with-pages-case.interface';
import { paginationSchema } from '@/common/schemas/pagination.schema';
import { customersWithPagesResponseSchema } from '@/api/customers/schemas/customers-with-pages-response.schema';
import { customerNotFoundErrorSchema } from '@/domain/customers/errors/customer-not-found.error';

const auth = appDi.resolve<IChainHandler>('authChainHandler');

@Controller('/customers')
@Chain(auth)
export class CustomersController {
  constructor(
    private readonly createCustomerCase: ICreateCustomerCase,
    private readonly updateCustomerCase: IUpdateCustomerCase,
    private readonly getCustomerByIdCase: IGetCustomerByIdCase,
    private readonly deleteCustomerCase: IDeleteCustomerCase,
    private readonly getCustomersWithPagesCase: IGetCustomersWithPagesCase,
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

    setResponseStatus(event, 204);
    return null;
  }

  @Handler('PATCH', '/:id')
  @HandlerMeta({
    summary: 'Update customer',
  })
  @Body(updateCustomerSchema)
  @Params(idParamSchema)
  @Response(204, '')
  @Response(404, customerNotFoundErrorSchema)
  public async updateCustomer(event: H3Event) {
    const { id } = await getValidatedRouterParams(event, idParamSchema.parse);
    const data = await readValidatedBody(event, updateCustomerSchema.parse);

    const birthDate = data.birthDate ? new Date(data.birthDate) : undefined;
    await this.updateCustomerCase.execute(id, { ...data, birthDate });

    setResponseStatus(event, 204);
    return null;
  }

  @Handler('GET', '/:id')
  @HandlerMeta({
    summary: 'Get customer by id',
  })
  @Params(idParamSchema)
  @Response(200, plainCustomerResponseSchema)
  @Response(404, customerNotFoundErrorSchema)
  public async getCustomerById(event: H3Event) {
    const { id } = await getValidatedRouterParams(event, idParamSchema.parse);
    const customer = await this.getCustomerByIdCase.execute(id);

    return plainCustomerResponseSchema.parse(customer);
  }

  @Handler('GET')
  @HandlerMeta({
    summary: 'Get customers',
  })
  @Response(200, customersWithPagesResponseSchema)
  @Query(paginationSchema)
  public async getCustomers(event: H3Event) {
    const pagination = await getValidatedQuery(event, paginationSchema.parse);
    const customersResult = await this.getCustomersWithPagesCase.execute(pagination);

    return customersWithPagesResponseSchema.parse(customersResult);
  }

  @Handler('DELETE', '/:id')
  @HandlerMeta({
    summary: 'Delete customer by id',
  })
  @Params(idParamSchema)
  @Response(204, '')
  @Response(404, customerNotFoundErrorSchema)
  public async deleteCustomerById(event: H3Event) {
    const { id } = await getValidatedRouterParams(event, idParamSchema.parse);
    await this.deleteCustomerCase.execute(id);

    setResponseStatus(event, 204);
    return null;
  }
}
