FROM node:8

COPY ./mtg-tower/package.json /usr/app/mtg-tower/

WORKDIR /usr/app/mtg-tower
RUN npm install

WORKDIR /usr/app/mtg-tower/src

EXPOSE 3000

#ENTRYPOINT ["node", "index.js"]
CMD bash
