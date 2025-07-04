FROM node:21.7.3
WORKDIR /usr/src/service-product-update
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD ["node", "app.js"]
