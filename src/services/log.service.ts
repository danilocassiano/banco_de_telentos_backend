import { createHash } from 'crypto';
import { format } from 'date-fns';
import { ILoggerService } from './../typing/log';
import { ElasticService } from './elastic.service';

export class LogService {
  private logger: ILoggerService;

  constructor() {
    this.logger = new ElasticService();
  }

  createHash(str: string) {
    return createHash('md5').update(str).digest('hex');
  }

  async upsert(
    index: string,
    request: Record<string, any>,
    response: Record<string, any>,
    status: number,
    url: string,
    method: string,
  ) {
    try {
      const body = {
        createdAt: format(new Date(), 'dd-MM-yyyy  hh:mm:ss:SSS'),
        url,
        method,
        request,
        response,
        status,
        updatedAt: format(new Date(), 'dd-MM-yyyy  hh:mm:ss:SSS'),
      };

      const id = this.createHash(JSON.stringify(body));

      const log = await this.logger.findOne(index, id);

      if (log) {
        return this.logger.update(index, id, log);
      }

      return this.logger.create(index, body, id);
    } catch (error) {
      console.error('Erro ao inserir o log:', error);
    }
  }
}
