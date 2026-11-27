package com.robotron.server.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class EmailService {

    @Value("${MAIL_FROM:noreply@it-portal.de}")
    private String mailFrom;


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
                    "mailFrom"
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
                    "mailFrom"
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

                    + "Support:\n"

                    + "support@it-portal.de\n\n"

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

    public void sendPaymentConfirmationEmail(

            String toEmail,

            String orderNumber,

            String invoiceNumber,

            BigDecimal amount,

            BigDecimal remainingBalance

    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setFrom(
                    "mailFrom"
            );

            message.setTo(
                    toEmail
            );

            message.setSubject(
                    "Zahlung erfolgreich eingegangen"
            );

            String emailText =

                    "Ihre Zahlung wurde erfolgreich verarbeitet.\n\n"

                    + "Bestellung:\n"
                    + orderNumber
                    + "\n\n"

                    + "Rechnung:\n"
                    + invoiceNumber
                    + "\n\n"

                    + "Betrag:\n"
                    + amount
                    + " €\n\n"

                    + "Verfügbares Guthaben:\n"
                    + remainingBalance
                    + " €\n\n"

                    + "Vielen Dank für Ihre Bestellung.\n\n"

                    + "Mit freundlichen Grüßen\n"

                    + "Ihr IT-Portal Team";

            message.setText(
                    emailText
            );

            mailSender.send(
                    message
            );

            log.info(
                    "Payment-Mail an {} gesendet.",
                    toEmail
            );

        } catch (Exception e) {

            log.error(
                    "Fehler beim Versand der Payment-Mail",
                    e
            );

        }

    }

    public void sendShipmentConfirmationEmail(

            String toEmail,

            String orderNumber,

            String deliveryNumber,

            String trackingNumber,

            String shippingAddress

    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setFrom(
                    "mailFrom"
            );

            message.setTo(
                    toEmail
            );

            message.setSubject(
                    "Ihre Bestellung wurde versendet"
            );

            String emailText =

                    "Ihre Bestellung wurde an den Versand übergeben.\n\n"

                    + "Bestellung:\n"
                    + orderNumber
                    + "\n\n"

                    + "Lieferschein:\n"
                    + deliveryNumber
                    + "\n\n"

                    + "Trackingnummer:\n"
                    + trackingNumber
                    + "\n\n"

                    + "Lieferadresse:\n"
                    + shippingAddress
                    + "\n\n"

                    + "Vielen Dank für Ihre Bestellung.\n\n"

                    + "Mit freundlichen Grüßen\n"

                    + "Ihr IT-Portal Team";

            message.setText(
                    emailText
            );

            mailSender.send(
                    message
            );

            log.info(
                    "Shipment-Mail an {} gesendet.",
                    toEmail
            );

        } catch (Exception e) {

            log.error(
                    "Fehler beim Versand der Shipment-Mail",
                    e
            );

        }

    }

        public void sendAnonymizationConfirmationEmail(

            String toEmail

    ) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setFrom(
                    "mailFrom"
            );

            message.setTo(
                    toEmail
            );

            message.setSubject(
                    "Bestätigung der DSGVO-Anonymisierung"
            );

            String emailText =

                    "Sehr geehrte Kundin,\n"
                    + "sehr geehrter Kunde,\n\n"

                    + "Ihr Antrag auf Anonymisierung wurde erfolgreich bearbeitet.\n\n"

                    + "Ihre personenbezogenen Daten werden gemäß Art. 17 DSGVO aus unserem operativen System entfernt oder anonymisiert.\n\n"

                    + "Gesetzliche Aufbewahrungspflichten für Bestellungen, Rechnungen, Lieferscheine und Buchungsdaten bleiben davon unberührt.\n\n"

                    + "Der Zugriff auf Ihr Kundenkonto wird nach Abschluss der Verarbeitung deaktiviert.\n\n"

                    + "Bei Fragen zum Datenschutz wenden Sie sich bitte an unser Datenschutz- und Compliance-Team.\n\n"

                    + "Mit freundlichen Grüßen\n"

                    + "IT-Portal Datenschutz & Compliance";

            message.setText(
                    emailText
            );

            mailSender.send(
                    message
            );

            log.info(
                    "DSGVO-Mail an {} gesendet.",
                    toEmail
            );

        } catch (Exception e) {

            log.error(
                    "Fehler beim Versand der DSGVO-Mail",
                    e
            );

        }

    }

}