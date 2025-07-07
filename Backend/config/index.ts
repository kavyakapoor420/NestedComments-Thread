import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
export const GRACE_PERIOD_MINUTES = 15;
export const DATABASE_URL = process.env.DATABASE_URL || "postgres://612a2dd0a487491a9b401ca7ed535fbb5211055040111e2935a59fc4f9bc9470:sk_RHPsCwIffMVj_2Z6Yfwha@db.prisma.io:5432/?sslmode=require";
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';