package com.robotron.server.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "BearerAuth";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                // 1. Метаданные нашего проекта для экзаменаторов IHK
                .info(new Info()
                        .title("B2B IT-Portal REST-API Dokumentation")
                        .version("1.0.0-PROD")
                        .description("Interaktives API-Kontrollzentrum für die B2B-Bestellplattform (Robotron DevZone)."))
                
                // 2. Глобально подключаем требование безопасности ко ВСЕМ эндпоинтам Swagger
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                
                // 3. Декларируем саму схему авторизации (Bearer JWT)
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME, new SecurityScheme()
                                .name(SECURITY_SCHEME_NAME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Fügen Sie hier Ihren kryptographischen JWT-Token ein (ohne das Wort 'Bearer' davor).")));
    }
}
