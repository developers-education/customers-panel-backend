export function parseAccessToken(token: string): ParseAccessTokenResult {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

type ParseAccessTokenResult = {
  id: string;
};
