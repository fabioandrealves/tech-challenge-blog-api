FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install

ENV NODE_ENV=production

COPY . .
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
  && npm run build

EXPOSE 3333

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "build/bin/server.js"]