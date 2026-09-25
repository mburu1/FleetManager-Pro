// api/src/middleware/error-handler.ts
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  request.log.error(error);

  const statusCode = error.statusCode || 500;
  
  const response = {
    statusCode,
    error: error.name || 'Internal Server Error',
    message: error.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  reply.status(statusCode).send(response);
}