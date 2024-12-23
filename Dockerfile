FROM nginx:alpine

#COPY nginx.conf /etc/nginx/nginx.conf

# TODO
# https://www.npmjs.com/package/concat-files
# https://github.com/putoutjs/minify
# pre gzip

COPY ./src/ /app/www/