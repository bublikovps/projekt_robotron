package com.robotron.server.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    
    // Встроенный инструмент Spring, который сам подхватит наши настройки localhost:1025
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String toEmail, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            
            message.setFrom("noreply@it-portal.de"); // Красивый B2B адрес отправителя
            message.setTo(toEmail);                  // Кому шлём (Email нашего юзера)
            message.setSubject("IT-Portal: Passwort zuruecksetzen"); // Тема письма на немецком
            
            // Текст письма по стандартам B2B
            String emailText = "Hallo,\n\n"
                    + "Sie haben das Zuruecksetzen Ihres Passworts angefordert.\n"
                    + "Klicken Sie auf den folgenden Link, um ein neues Passwort zu vergeben:\n\n"
                    + resetLink + "\n\n"
                    + "Dieser Link ist aus Sicherheitsgruenden nur 15 Minuten gueltig.\n\n"
                    + "Mit freundlichen Gruessen,\n"
                    + "Ihr IT-Portal Team";
            
            message.setText(emailText);
            
            log.info("Sende Passwort-Reset-Email an {}", toEmail);
            mailSender.send(message); // Отправка!
            log.info("Email erfolgreich an Mailpit uebergeben.");
            
        } catch (Exception e) {
            log.error("Fehler beim Senden der Email an " + toEmail, e);
            throw new RuntimeException("Email-Versand fehlgeschlagen!");
        }
    }
}
