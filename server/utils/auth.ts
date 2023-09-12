import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret: string | undefined = process.env.JWT_SECRET as string;
const expiration: '2h' = '2h';

interface JwtPayload {
  data: string
}

export default {
  authMiddleware: function ({ req }: { req: any }): any {
    // allows token to be sent via req.body, req.query, or headers
    let token: any =
      req.body.token || req.query.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration }) as JwtPayload;
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    return req;
  },

  signToken: function ({
    userName,
    email,
    _id,
  }: {
    userName: string;
    email: string;
    _id: string;
  }): any {
    const payload: { userName: string; email: string; _id: string } = {
      userName,
      email,
      _id,
    };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
