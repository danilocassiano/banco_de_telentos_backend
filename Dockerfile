# Use uma imagem base leve e estável
FROM node:18-alpine

# Configura o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos essenciais para construir a aplicação
COPY package.json ./

# Instala as dependências
RUN yarn install --production

# Copia o restante do código
COPY . .

# Expõe a porta em que a API está rodando
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["yarn", "start"]