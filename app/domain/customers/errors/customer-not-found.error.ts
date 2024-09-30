import { defineError } from '@/common/errors/define-error';

export const [CustomerNotFoundError, customerNotFoundApiErrorSchema] =
  defineError('CUSTOMER_NOT_FOUND');
