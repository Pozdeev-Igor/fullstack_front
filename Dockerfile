FROM node:16-alpine3.16

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# RUN npm run build

CMD ["npm", "start"]
