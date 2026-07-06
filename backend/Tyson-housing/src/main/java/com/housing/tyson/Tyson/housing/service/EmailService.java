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

		// 1. If the guest email is null or blank, default it to YOUR email so it won't
		// bounce
		String recipientEmail = (booking.getGuestEmail() != null && !booking.getGuestEmail().isBlank())
				? booking.getGuestEmail()
				: "kirilanastasoff@gmail.com";

		String guestName = booking.getGuestName() != null ? booking.getGuestName() : "Valued Guest";

		// 2. Send Confirmation Email to the Guest
		SimpleMailMessage guestMail = new SimpleMailMessage();
		guestMail.setFrom("kirilanastasoff@gmail.com");
		guestMail.setTo(recipientEmail);
		guestMail.setSubject("Reservation Confirmed - Tyson Housing");
		guestMail.setText(String.format(
				"Hello %s,\n\nYour reservation is confirmed for %s to %s (%d nights).\nTotal Cost: €%.2f\n\nThank you!",
				guestName, booking.getStartDate(), booking.getEndDate(), booking.getTotalNights(), totalCost));
		mailSender.send(guestMail);

		// 3. Send Alert Email to Yourself (The Host) - FIXED TYPOS (.com added)
		SimpleMailMessage hostMail = new SimpleMailMessage();
		hostMail.setFrom("kirilanastasoff@gmail.com");
		hostMail.setTo("kirilanastasoff@gmail.com");
		hostMail.setSubject("🚨 NEW BOOKING ALERT - Tyson Housing");
		hostMail.setText(String.format(
				"New reservation received from %s (%s).\nDates: %s to %s (%d nights).\nTotal Payout: €%.2f", guestName,
				recipientEmail, booking.getStartDate(), booking.getEndDate(), booking.getTotalNights(), totalCost));
		mailSender.send(hostMail);
	}
}