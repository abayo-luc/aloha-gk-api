FROM node

# create app directory

WORKDIR /user/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./
COPY .sequelizerc ./
RUN npm install

RUN npm i -g sequelize-cli

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

RUN npm run build 
RUN NODE_ENV=production npm run db:migrate

EXPOSE 3000 

CMD ["node", "./dist/app.js"]