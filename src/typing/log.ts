export interface ILog {
  _source: null;
  request: string;
  response: string;
  status: number;
  method: string;
  quantidade: number;
}

export interface ILoggerService {
  create(index: string, body: any, id: string): Promise<void>;
  update(index: string, id: string, log: ILog): Promise<void>;
  findOne(index: string, id: string): Promise<ILog>;
}
