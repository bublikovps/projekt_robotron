output "frontend_url" {
  value = "https://${azurerm_container_app.frontend.ingress[0].fqdn}"
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "postgres_fqdn" {
  value = azurerm_postgresql_flexible_server.db.fqdn
}
