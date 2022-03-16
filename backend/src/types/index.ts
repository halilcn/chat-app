export {};

declare global {
  export namespace Express {
    export interface Request {
      validated: object;
      user: object;
      currentToken: string;
    }
  }
}