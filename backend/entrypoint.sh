#!/bin/sh

# Wait for MySQL to be ready
while ! nc -z db 3306; do
  echo "Waiting for MySQL..."
  sleep 3
done

# Start the application
exec java -jar /app.jar
