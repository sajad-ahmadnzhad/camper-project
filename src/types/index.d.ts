import AdminModel from "../models/Admin";

interface User {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user: User | undefined;
    }
  }
}
