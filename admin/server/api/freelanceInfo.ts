import { PrismaClient, Prisma } from '@prisma/client';

export default defineEventHandler(async (e) => {
  const prisma:any = new PrismaClient();
  const method = e.req.method;
  
  if (method === 'POST') {
    const body = await readBody(e);
    
    if (!body) {
      const detailError = createError({
        statusCode: 400,
        statusMessage: 'No item provided',
        data: {},
      });
      sendError(e, detailError);
    }
    let temp:any = {};
    try {
      temp = await prisma.todo.create({
        data: body.data,
      });
    } catch (error) {
      console.log(error);
    }
    return temp; // awaitしてるので何か返してあげる
  }
  
});