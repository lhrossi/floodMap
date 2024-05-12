FROM node:20-alpine

WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
