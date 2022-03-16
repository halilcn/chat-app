export {};

declare global {
  export namespace Express {
    export interface Request {
      validated: { [key: string]: any };
      user: { [key: string]: any };
      currentToken: string;
    }
  }
}
