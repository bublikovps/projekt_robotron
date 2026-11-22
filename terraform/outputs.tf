output "frontend_url" {
  description = "Öffentliche HTTPS-URL der Angular-Anwendung"
  value       = "https://${azurerm_container_app.frontend.ingress[0].fqdn}"
}

output "acr_login_server" {
  description = "Azure Container Registry URL"
  value       = azurerm_container_registry.acr.login_server
}

