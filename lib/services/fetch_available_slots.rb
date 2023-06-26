# frozen_string_literal: true

require_relative "../helpers/bookings_helper"

module Services
  class FetchAvailableSlots
    include Helpers::BookingsHelper

    attr_accessor :errors

    def initialize(date, duration_in_minutes)
      @date = date.to_s
      @duration_in_minutes = duration_in_minutes.to_i
      @errors = []
    end

    def call
      return unless valid?

      Booking.generate_15_min_timeslots(date) - timeslots_to_exclude
    end

    private

    attr_reader :date, :duration_in_minutes

    def valid?
      valid_date? && valid_duration?
    end

    def timeslots_to_exclude
      slots = []
      bookings_on_given_date = Booking.where('date(starts) = ?', parsed_date)
                                      .or(Booking.where('date(ends) = ?', parsed_date))
      bookings_on_given_date.each do |booking|
        if booking.starts.to_date != booking.ends.to_date
          if Date.parse(date) == booking.starts.to_date
            slot_date = booking.starts - duration_in_minutes.minutes
            slots += Booking.generate_15_min_timeslots(
              date, "#{slot_date.hour}:#{slot_date.min}", Booking::LAST_TIME_SLOT
            )
          else
            slots += Booking.generate_15_min_timeslots(
              date, Booking::FIRST_TIME_SLOT, "#{booking.ends.hour}:#{booking.ends.min}"
            )
          end
        else
          slot_date = booking.starts - duration_in_minutes.minutes
          slots += Booking.generate_15_min_timeslots(
            date, "#{slot_date.hour}:#{slot_date.min}", "#{booking.ends.hour}:#{booking.ends.min}"
          )
        end
      end
      slots
    end
  end
end
