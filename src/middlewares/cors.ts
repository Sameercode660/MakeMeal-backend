import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

export const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: process.env.FRONTEND_URL, // Replace with your frontend URL
  credentials: true,
});

// Utility function to run middleware
export function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}
