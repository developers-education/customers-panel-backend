export interface IConfig {
  nodeEnv: NodeEnv;
  webServer: {
    port: number;
  };
  jwt: {
    secret: string;
    accessToken: {
      expirationTime: string;
    };
    refreshToken: {
      expirationTime: string;
    };
  };
  openApi: {
    title: string;
    version: string;
    description?: string;
  };
}

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}
