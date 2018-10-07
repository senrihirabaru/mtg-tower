FROM node:8

#COPY ./src/ /usr/app/mtg/
#COPY ./package.json /usr/app/mtg/

#WORKDIR /usr/app/mtg
#RUN npm install

WORKDIR /usr/app/mtg-tower

EXPOSE 8888

#CMD ["node", "index.js"]
CMD bash
