import { Client } from '@elastic/elasticsearch';
import { format } from 'date-fns';
import { ILog, ILoggerService } from './../typing/log';

export class ElasticService implements ILoggerService {
  private client: Client;

  constructor() {
    this.client = new Client({
      node: 'http://localhost:9200',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  // Criar um documento
  async create(index: string, body: any, id: string): Promise<void> {
    try {
      await this.client.index({
        index,
        id,
        body: {
          ...body,
          quantidade: 1,
        },
      });
    } catch (error) {
      console.error('Erro ao criar documento:', error.meta.meta);
      throw error;
    }
  }

  // Atualizar um documento
  async update(index: string, id: string, log: ILog): Promise<void> {
    try {
      console.log('Atualizando documento:', id);
      const quantidadeAtual = log.quantidade || 0; // Evitar erros caso `quantidade` seja undefined
      const date = new Date();
      await this.client.update({
        index,
        id,
        body: {
          doc: {
            quantidade: quantidadeAtual + 1,
            updateAt: format(date, 'dd-MM-yyyy  hh:mm:ss:SSS'),
          },
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar documento:', error);
      throw error;
    }
  }

  // Buscar um documento
  async findOne(index: string, id: string): Promise<ILog | null> {
    try {
      const result = await this.client.get<ILog>({
        index,
        id,
      });

      return result.body._source || null; // Retornar os dados do documento encontrado
    } catch (error: any) {
      if (error.meta?.body?.error?.type === 'index_not_found_exception') {
        console.log('Índice não encontrado, criando automaticamente...');
        await this.createIndex(index); // Criar o índice automaticamente
        return null; // Retornar null para indicar que o documento não existe
      } else if (error.meta?.statusCode === 404) {
        console.log('Documento não encontrado.');
        return null; // Documento não encontrado
      }

      console.error('Erro ao buscar documento:', error);
      throw error; // Repassar outros erros
    }
  }

  // Criar um índice com mapeamento inicial
  private async createIndex(index: string): Promise<void> {
    try {
      await this.client.indices.create({
        index,
      });

      console.log(`Índice "${index}" criado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao criar índice "${index}":`, error);
      throw error;
    }
  }
}
