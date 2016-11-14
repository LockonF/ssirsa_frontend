FROM node:4

RUN apt-get -yq update && \
    apt-get install -y git && \
    rm -rf node_modules && \
    npm install && \
    npm install -g bower && \
    npm install -g gulp && \
    bower install --allow-root && \
    gulp buildAppConfig --env staging


