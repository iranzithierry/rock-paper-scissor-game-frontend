#!/bin/bash

# Ensure script is run with elevated privileges
if [ "$(id -u)" != "0" ]; then
  echo "This script must be run as root. Try using sudo."
  exit 1
fi

# Stop all running containers
docker stop $(docker ps -q)

# Remove all containers (including stopped ones)
docker rm $(docker ps -a -q)

# Remove all Docker images
docker rmi $(docker images -q)

# Remove dangling images
docker image prune -f

echo "All Docker containers and images have been removed."
