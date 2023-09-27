FROM node:14
WORKDIR /app
COPY . /app
RUN yarn install
EXPOSE 8000
ENV SERVICE_NAME="Service2"
CMD [ "node", "service2.js"]