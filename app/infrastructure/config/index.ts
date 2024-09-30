import * as process from 'process';
import {
  IConfig,
  NodeEnv,
} from '@/infrastructure/config/types/config.interface';

export const config: IConfig = {
  nodeEnv: (process.env.NODE_ENV ?? NodeEnv.DEVELOPMENT) as NodeEnv,
  webServer: {
    port: Number(process.env.WEB_SERVER_PORT),
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    accessToken: {
      expirationTime: '30d',
    },
    refreshToken: {
      expirationTime: '30d',
    },
  },
  openApi: {
    title: 'Customers Panel',
    version: '3.1.0',
  },
};
