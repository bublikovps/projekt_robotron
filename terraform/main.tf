terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "sttfstaterobotron01"
    container_name       = "tfstate"
    key                  = "robotron.terraform.tfstate"
    use_oidc             = true
  }
}

provider "azurerm" {
  features {}
}

resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# 1. Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.project_name}-demo"
  location = var.location
}

# 2. Container Registry (ACR Basic)
resource "azurerm_container_registry" "acr" {
  name                = "acr${var.project_name}${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

# 3. Log Analytics & Container Apps Environment
resource "azurerm_log_analytics_workspace" "logs" {
  name                = "law-${var.project_name}-${random_string.suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "env" {
  name                       = "cae-${var.project_name}-${random_string.suffix.result}"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.logs.id
}



# 5. Spring Boot Backend Container App (Nur intern erreichbar)
resource "azurerm_container_app" "backend" {
  name                         = "robotron-backend"
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-password"
  }

  secret {
    name  = "acr-password"
    value = azurerm_container_registry.acr.admin_password
  }

  secret {
    name  = "db-password"
    value = var.db_password
  }

  secret {
    name  = "jwt-secret"
    value = var.jwt_secret
  }

  template {
    min_replicas = 0
    max_replicas = 1

    container {
      name   = "backend"
      image  = "${azurerm_container_registry.acr.login_server}/robotron-backend:${var.image_tag}"
      cpu    = 0.5
      memory = "1Gi"

      env {
  		name  = "DB_URL"
  		value = "jdbc:postgresql://placeholder:5432/robotron_db"
	}
      env {
        name  = "DB_USERNAME"
        value = "postgres"
      }
      env {
        name        = "DB_PASSWORD"
        secret_name = "db-password"
      }
      env {
        name        = "JWT_SECRET"
        secret_name = "jwt-secret"
      }
      env {
        name  = "MAIL_HOST"
        value = "localhost"
      }
      env {
        name  = "MAIL_PORT"
        value = "1025"
      }
    }
  }

  ingress {
    external_enabled = false
    target_port      = 8080
    transport        = "http"
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

 
}

# 6. Angular SSR Frontend Container App (Öffentlich über HTTPS erreichbar)
resource "azurerm_container_app" "frontend" {
  name                         = "robotron-frontend"
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-password"
  }

  secret {
    name  = "acr-password"
    value = azurerm_container_registry.acr.admin_password
  }

  template {
    min_replicas = 0 
    max_replicas = 1

    container {
      name   = "frontend"
      image  = "${azurerm_container_registry.acr.login_server}/robotron-frontend:${var.image_tag}"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "PORT"
        value = "4000"
      }
      env {
        name  = "BACKEND_URL"
        value = "http://robotron-backend:8080"
      }
    }
  }

  ingress {
    external_enabled = true
    target_port      = 4000
    transport        = "http"
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  depends_on = [azurerm_container_app.backend]
}
