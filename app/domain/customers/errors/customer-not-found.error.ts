import { AppError } from '@/common/errors/app-error';

interface Data {
  login: string;
}

export class CustomerNotFoundError extends AppError {
  constructor(data: Data) {
    super('LOGIN_TAKEN', data);
  }
}
