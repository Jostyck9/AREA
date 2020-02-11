FROM mysql:5
RUN apt update
RUN apt upgrade -y
# ADD test.sql /docker-entrypoint-initdb.d
ADD area.sql /docker-entrypoint-initdb.d