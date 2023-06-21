FROM httpd:latest
EXPOSE 88
COPY ./src/ /usr/local/apache2/htdocs/