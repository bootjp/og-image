FROM node:18-slim
COPY . /app
WORKDIR /app

RUN apt-get update && apt-get install -y libnss3 && npm install && npm run build

CMD ["api/dist/index.js"]