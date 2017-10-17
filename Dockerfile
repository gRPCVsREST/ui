FROM node:6
WORKDIR /
ADD app/ /app
ADD node_modules/ /node_modules
ADD index.js /
ADD *.json /
EXPOSE 3000
CMD npm start
