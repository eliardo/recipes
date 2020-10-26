FROM node:latest
WORKDIR /RecipePuppy
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT ["node", "src/index.js"]
