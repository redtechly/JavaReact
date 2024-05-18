FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app
COPY target/*.jar /app/app.jar

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use the script as the entrypoint
ENTRYPOINT ["java","-jar","app.jar"]

