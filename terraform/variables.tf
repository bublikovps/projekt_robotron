variable "location" {
  description = "Azure Region"
  type        = string
  default     = "germanywestcentral"
}

variable "postgres_location" {
  description = "PostgreSQL Region"
  type        = string
  default     = "polandcentral"
}

variable "project_name" {
  description = "Project Name"
  type        = string
  default     = "robotron"
}

variable "db_password" {
  description = "PostgreSQL Password"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT Secret"
  type        = string
  sensitive   = true
}

variable "image_tag" {
  description = "Docker Image Tag"
  type        = string
  default     = "latest"
}
