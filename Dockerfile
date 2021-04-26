FROM node:14

WORKDIR /home/kaplan-books

COPY dist/kaplan-books ./

EXPOSE 4200

RUN npm install -g http-server
RUN npm install
CMD ["http-server", "." , "-p" , "4200"]
