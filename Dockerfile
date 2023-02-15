FROM node:18
COPY . /app
WORKDIR /app

RUN apt-get update && apt-get install -y libnss3
# Add user so we don't need --no-sandbox.
#RUN mkdir -p /home/pptruser/Downloads \
#    && chown -R pptruser:pptruser /home/pptruser \
#    && chown -R pptruser:pptruser /node_modules \
#    && chown -R pptruser:pptruser /package.json \
#    && chown -R pptruser:pptruser /package-lock.json

RUN npm install --dev
RUN npm run build
RUN npm run copy-files

CMD ["api/dist/index.js"]