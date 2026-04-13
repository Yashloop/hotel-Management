package com.hotel.booking.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Email Service - sends notification emails for registration, booking, and cancellation.
 * All email operations are async to avoid blocking API responses.
 * 
 * Backend Dev 2 (Lead) Responsibility
 * 
 * NOTE: Configure spring.mail.* properties in application.properties with valid
 * Gmail credentials and App Password before using.
 */
@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@hotelbooking.com}")
    private String fromEmail;

    /**
     * Send registration confirmation email.
     */
    @Async
    public void sendRegistrationEmail(String toEmail, String userName) {
        logger.info("Sending registration email to: {}", toEmail);
        try {
            if (mailSender == null) {
                logger.warn("Mail sender not configured. Skipping email to: {}", toEmail);
                return;
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🏨 Welcome to Hotel Booking App!");
            message.setText(String.format(
                    "Dear %s,\n\n" +
                    "Welcome to Hotel Booking Application!\n\n" +
                    "Your account has been created successfully.\n" +
                    "You can now search hotels, view rooms, and make bookings.\n\n" +
                    "Happy Booking!\n" +
                    "Hotel Booking Team",
                    userName
            ));

            mailSender.send(message);
            logger.info("✅ Registration email sent to: {}", toEmail);
        } catch (Exception e) {
            logger.error("❌ Failed to send registration email to {}: {}", toEmail, e.getMessage());
        }
    }

    /**
     * Send booking confirmation email.
     */
    @Async
    public void sendBookingConfirmationEmail(String toEmail, String userName,
                                              String hotelName, String roomType,
                                              String checkIn, String checkOut,
                                              Double totalPrice) {
        logger.info("Sending booking confirmation email to: {}", toEmail);
        try {
            if (mailSender == null) {
                logger.warn("Mail sender not configured. Skipping email to: {}", toEmail);
                return;
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("✅ Booking Confirmed - " + hotelName);
            message.setText(String.format(
                    "Dear %s,\n\n" +
                    "Your booking has been confirmed!\n\n" +
                    "📋 Booking Details:\n" +
                    "━━━━━━━━━━━━━━━━━━━━━━\n" +
                    "🏨 Hotel: %s\n" +
                    "🛏️ Room Type: %s\n" +
                    "📅 Check-in: %s\n" +
                    "📅 Check-out: %s\n" +
                    "💰 Total Price: ₹%.2f\n" +
                    "━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                    "Thank you for choosing our service!\n" +
                    "Hotel Booking Team",
                    userName, hotelName, roomType, checkIn, checkOut, totalPrice
            ));

            mailSender.send(message);
            logger.info("✅ Booking confirmation email sent to: {}", toEmail);
        } catch (Exception e) {
            logger.error("❌ Failed to send booking email to {}: {}", toEmail, e.getMessage());
        }
    }

    /**
     * Send booking cancellation email.
     */
    @Async
    public void sendBookingCancellationEmail(String toEmail, String userName,
                                              String hotelName, Long bookingId) {
        logger.info("Sending cancellation email to: {}", toEmail);
        try {
            if (mailSender == null) {
                logger.warn("Mail sender not configured. Skipping email to: {}", toEmail);
                return;
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("❌ Booking Cancelled - " + hotelName);
            message.setText(String.format(
                    "Dear %s,\n\n" +
                    "Your booking (ID: %d) at %s has been cancelled.\n\n" +
                    "If this was not intentional, please contact our support team.\n\n" +
                    "Hotel Booking Team",
                    userName, bookingId, hotelName
            ));

            mailSender.send(message);
            logger.info("✅ Cancellation email sent to: {}", toEmail);
        } catch (Exception e) {
            logger.error("❌ Failed to send cancellation email to {}: {}", toEmail, e.getMessage());
        }
    }
}
