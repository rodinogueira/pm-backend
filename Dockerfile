# Usar a imagem oficial do Node.js como base
FROM node:16

# Criar o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Definir o comando para rodar a aplicação
CMD ["npm", "start"]
