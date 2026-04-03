FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY html-saurus.jar /app/html-saurus.jar
COPY . /data/nigsc_homepage2/
EXPOSE 80
CMD ["java", "-jar", "/app/html-saurus.jar", "/data/nigsc_homepage2", \
     "--production", "--port", "80"]
