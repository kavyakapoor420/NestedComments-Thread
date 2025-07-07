
// declare namespace Express {
//   interface Request {
//     user?: {
//       id: number;
//       username: string;
//     };
//   }
// }

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
      };
    }
  }
}
