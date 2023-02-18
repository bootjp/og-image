FROM node:18
COPY . /app
WORKDIR /app

RUN apt-get update && apt-get install -y libnss3

RUN npm install
RUN npm run build

CMD ["api/dist/index.js"]