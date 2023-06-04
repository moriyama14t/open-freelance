import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async(e) => {
  const prisma = new PrismaClient();
  
    const freelanceInfoArray = await prisma.service.findMany(); // 全件取得
    return freelanceInfoArray;
  }
)