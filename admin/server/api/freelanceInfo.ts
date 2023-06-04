import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async(e) => {
  const prisma = new PrismaClient();

    if(e.node.req.method === 'GET'){
      const freelanceInfoArray = await prisma.service.findMany(); // 全件取得
      return freelanceInfoArray;
    }
    if (e.node.req.method === 'POST') {
      const body = await readBody(e);
      const createFreelanceInfo = await prisma.service.create(
      {data:body}
      );
      return createFreelanceInfo;
    }
})