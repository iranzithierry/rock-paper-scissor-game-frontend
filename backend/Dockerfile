FROM python:3.8

ARG REQUIREMENTS_FILE

WORKDIR /app
EXPOSE 80
ENV PYTHONUNBUFFERED 1

RUN set -x && \
	apt-get update && \
	apt -f install	&& \
	apt-get -qy install netcat-traditional && \
	rm -rf /var/lib/apt/lists/* && \
	sudo apt install daphne && \
	wget -O /wait-for https://raw.githubusercontent.com/eficode/wait-for/master/wait-for && \
	chmod +x /wait-for

CMD ["sh", "/entrypoint-web.sh"]
COPY ./docker/ /

COPY ./requirements/ ./requirements
RUN pip install -r ./requirements/${REQUIREMENTS_FILE}

COPY . ./


# sudo docker run -it iranzithierry/jeezy:backend /bin/
# docker-compose run --rm web ./manage.py migrate // run inside image
# docker-compose run --rm web ./manage.py collectstatic --noinput 
# sudo docker ps // see all runing containers
# sudo docker down
# sudo docker-compose restart // restart all containes
# sudo docker exec -it e92fd59ecef4 mysql -u root -p // running in container