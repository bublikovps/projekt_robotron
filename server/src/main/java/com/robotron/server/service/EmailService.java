package com.robotron.server.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log =
            LoggerFactory.getLogger(
                    EmailService.class
            );

    private final JavaMailSender mailSender;

    public EmailService(
            JavaMailSender mailSender
    ) {

        this.mailSender = mailSender;

    }

    public void sendPasswordResetEmail(
            String toEmail,
            String resetLink
    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setFrom(
                    "noreply@it-portal.de"
            );

            message.setTo(
                    toEmail
            );

            message.setSubject(
                    "IT-Portal: Passwort zurücksetzen"
            );

            String emailText =

                    "Hallo,\n\n"

                    + "Sie haben das Zurücksetzen Ihres Passworts angefordert.\n"

                    + "Klicken Sie auf den folgenden Link:\n\n"

                    + resetLink

                    + "\n\n"

                    + "Der Link ist 15 Minuten gültig.\n\n"

                    + "Mit freundlichen Grüßen\n"

                    + "Ihr IT-Portal Team";

            message.setText(
                    emailText
            );

            mailSender.send(
                    message
            );

        } catch (Exception e) {

            log.error(
                    "Fehler beim E-Mail Versand",
                    e
            );

            throw new RuntimeException(
                    "E-Mail Versand fehlgeschlagen."
            );

        }

    }

    public void sendWelcomeEmail(

            String toEmail,

            String login

    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setFrom(
                    "noreply@it-portal.de"
            );

            message.setTo(
                    toEmail
            );

            message.setSubject(
                    "Willkommen im IT-Portal"
            );

            String emailText =

                    "Willkommen im IT-Portal.\n\n"

                    + "Ihr Kundenkonto wurde erfolgreich erstellt.\n\n"

                    + "Login: "
                    + login
                    + "\n\n"

                    + "Startguthaben: 10.000 €\n\n"

                    + "Sie können sich jetzt anmelden und Produkte bestellen.\n\n"

                    + "Mit freundlichen Grüßen\n"

                    + "Ihr IT-Portal Team";

            message.setText(
                    emailText
            );

            mailSender.send(
                    message
            );

            log.info(
                    "Welcome-Mail an {} gesendet.",
                    toEmail
            );

        } catch (Exception e) {

            log.error(
                    "Fehler beim Versand der Welcome-Mail",
                    e
            );

        }

    }

}