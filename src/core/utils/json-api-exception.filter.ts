import { Logger } from '@nestjs/common'
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'

@Catch()
export class JsonApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(JsonApiExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    // const request = ctx.getRequest()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let errorResponse: any

    this.logger.error(exception as any)
    console.error(exception)

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      errorResponse = {
        errors: [
          {
            status: status.toString(),
            title: typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as Record<string, any>).error,
            detail: typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as Record<string, any>).message,
          },
        ],
      };
    } else {
      errorResponse = {
        errors: [
          {
            status: status.toString(),
            title: 'Internal Server Error',
            detail: 'An unexpected error occurred.',
          },
        ],
      };
    }

    response.status(status).json(errorResponse);
  }
}