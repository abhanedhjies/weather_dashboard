terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.2"
    }
  }
}

provider "docker" {}

# Pull backend image from GHCR
resource "docker_image" "backend" {
  name = "ghcr.io/abhanedhjies/weather-backend:latest"
}

# Pull frontend image from GHCR
resource "docker_image" "frontend" {
  name = "ghcr.io/abhanedhjies/weather-frontend:latest"
}

# Run backend container
resource "docker_container" "backend" {
  name  = "weather-backend"
  image = docker_image.backend.image_id
  ports {
    internal = 4000
    external = 4000
  }
}

# Run frontend container
resource "docker_container" "frontend" {
  name  = "weather-frontend"
  image = docker_image.frontend.image_id
  ports {
    internal = 80
    external = 8080
  }
  depends_on = [docker_container.backend]
}
