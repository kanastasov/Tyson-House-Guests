package com.housing.tyson.Tyson.housing.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.housing.tyson.Tyson.housing.entity.Booking;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	public void sendBookingNotifications(Booking booking, double totalCost) {
		// 1. If the guest email is null or blank, default it to YOUR email so it won't bounce
		String recipientEmail = (booking.getGuestEmail() != null && !booking.getGuestEmail().isBlank())
				? booking.getGuestEmail()
				: "kirilanastasoff@gmail.com";
				
		String guestName = booking.getGuestName() != null ? booking.getGuestName() : "Valued Guest";
		
		// Fallback for phone number if not captured cleanly
		String guestPhone = (booking.getGuestPhone() != null && !booking.getGuestPhone().isBlank()) 
				? booking.getGuestPhone() 
				: "Not Provided";

		// 2. Send Confirmation Email to the Guest
		SimpleMailMessage guestMail = new SimpleMailMessage();
		guestMail.setFrom("kirilanastasoff@gmail.com");
		guestMail.setTo(recipientEmail);
		guestMail.setSubject("Reservation Confirmed - Tyson Housing");
		guestMail.setText(String.format(
			    "Hello %s,\n\n" +
			    "Your reservation is confirmed for %s to %s (%d nights).\n" +
			    "Total Cost: €%.2f\n\n" +
			    "Thank you!\n\n" +
			    "----------------------------------------\n\n" + // Visual divider
			    "Здравейте %s,\n\n" +
			    "Вашата резервация е потвърдена от %s до %s (%d нощувки).\n" +
			    "Обща сума: €%.2f\n\n" +
			    "Благодарим Ви!",
			    // English placeholders
			    guestName, booking.getStartDate(), booking.getEndDate(), booking.getTotalNights(), totalCost,
			    // Bulgarian placeholders (repassing variables)
			    guestName, booking.getStartDate(), booking.getEndDate(), booking.getTotalNights(), totalCost
			));
		mailSender.send(guestMail);

		// 3. Send Alert Email to Yourself (The Host) - Now featuring phone number details
		SimpleMailMessage hostMail = new SimpleMailMessage();
		hostMail.setFrom("kirilanastasoff@gmail.com");
		hostMail.setTo("kirilanastasoff@gmail.com");
		hostMail.setSubject("🚨 NEW BOOKING ALERT - Tyson Housing");
		hostMail.setText(String.format(
				"New reservation received!\n\n" +
				"Guest Details:\n" +
				"- Name:  %s\n" +
				"- Email: %s\n" +
				"- Phone: %s\n\n" + 
				"Stay Details:\n" +
				"- Dates: %s to %s (%d nights)\n" +
				"- Total Payout: €%.2f", 
				guestName, recipientEmail, guestPhone, 
				booking.getStartDate(), booking.getEndDate(), booking.getTotalNights(), totalCost));
		mailSender.send(hostMail);
	}
}