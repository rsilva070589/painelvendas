FROM node:16
 

WORKDIR /usr/app
COPY package*.json ./ 
RUN npm install
RUN yarn install

COPY . . 

EXPOSE 8282

CMD ["yarn", "dev"]
