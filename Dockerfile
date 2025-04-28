# Imagem base (com Node.js)
FROM node:20.0.0

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install -g @ionic/cli
RUN npm install

# Copia todo o restante do projeto
COPY . .

# Expõe a porta padrão do Ionic
EXPOSE 8100

# Comando para iniciar o app
CMD ["ionic", "serve", "--host", "0.0.0.0"]
