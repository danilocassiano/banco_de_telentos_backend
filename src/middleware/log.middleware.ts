import { LogService } from './../services/log.service';

export class LogMiddleware {
  static logservice: LogService = new LogService();

  static init(req, res, next) {
    const send = res.send;

    res.send = async function (response: Record<string, any>) {
      const request = req.body;

      await LogMiddleware.logservice.upsert(
        'api-psicologia',
        request,
        response,
        res.statusCode,
        req.url,
        req.method,
      );

      send.call(this, response);
    };

    next();
  }
}
