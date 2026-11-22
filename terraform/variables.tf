variable "location" {
  description = "Azure Region (Frankfurt)"
  type        = string
  default     = "germanywestcentral"
}

variable "project_name" {
  description = "Projektname"
  type        = string
  default     = "robotron"
}

variable "db_password" {
  description = "PostgreSQL Passwort"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "Spring Boot JWT Secret"
  type        = string
  sensitive   = true
}

variable "image_tag" {
  description = "Docker Image Tag (Git SHA)"
  type        = string
  default     = "latest"
}
