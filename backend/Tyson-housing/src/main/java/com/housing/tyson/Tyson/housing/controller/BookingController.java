package com.housing.tyson.Tyson.housing.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.housing.tyson.Tyson.housing.entity.Booking;
import com.housing.tyson.Tyson.housing.repository.BookingRepository;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200") // 1. Grants permission to your Angular app
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    /**
     * Handles POST requests to save a new booking
     */
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    /**
     * Handles GET requests to fetch all existing bookings
     * This fixes the 405 Method Not Allowed error!
     */
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(bookings);
    }
}