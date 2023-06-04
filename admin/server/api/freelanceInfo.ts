import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async(e) => {
  const prisma = new PrismaClient();
  const method = e.req.method;

    if(method === 'GET'){
      const freelanceInfoArray = await prisma.service.findMany(); // 全件取得
      return freelanceInfoArray;
    }

    if (method === 'POST') {
      const body = await readBody(e);
      const createFreelanceInfo = await prisma.service.create(
      {data:body}
      );
      return createFreelanceInfo;
    }

    if (method === 'DELETE') {
      const body = await readBody(e);
      if (!body) {
        const detailError = createError({
          statusCode: 400,
          statusMessage: 'No item provided',
          data: {},
        });
        sendError(e, detailError);
      }
      let temp = null;
      try {
        temp = await prisma.service.delete({
          where: { id: body.id },
        });
      } catch (error) {
        console.log(error);
      }
      return temp;
    }
})