FROM node:alpine as build
    WORKDIR /build/
    RUN npm install --no-package-lock \
        rollup \
    && true
    COPY ./src/ .
    RUN rollup main.js --file bundle.js
    RUN gzip -9 -k bundle.js && mv bundle.js.gz main.js.gz
    RUN gzip -9 -k index.html
    # TODO
    # https://rollupjs.org/introduction/
    # Alternatively ...
    #  ? https://vite.dev/guide/
    #  ? https://www.npmjs.com/package/concat-files
    #  ? https://github.com/putoutjs/minify
    # Consider
    #  ? Single html file with all js gziped?

FROM nginx:alpine as nginx
    WORKDIR /usr/share/nginx/html/
    COPY nginx.conf /etc/nginx/nginx.conf
    COPY ./src .
        # ws proxy
        # pre-gzipped static serving of main.js.gz
    #COPY --from=build /build/*.gz main.js.gz
