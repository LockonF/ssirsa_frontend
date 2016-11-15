FROM node:4

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN apt-get -yq update && \
    apt-get install -y git python gcc binutils make linux-source && \
    rm -rf node_modules && \
    npm install && \
    npm install -g bower && \
    npm install -g gulp && \
    bower install --allow-root && \
    gulp buildAppConfig --env staging


