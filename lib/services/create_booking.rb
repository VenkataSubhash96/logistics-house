# frozen_string_literal: true

require_relative "./fetch_available_slots"
require_relative "../helpers/bookings_helper"

module Services
  class CreateBooking
    include Helpers::BookingsHelper

    attr_accessor :errors

    def initialize(params)
      @date = params[:booking_date].to_s
      @duration_in_minutes = params[:duration_in_minutes].to_i
      @slot = params[:slot].to_s
      @errors = []
    end

    def call
      return unless valid?

      Booking.create!(id: id, starts: starts, ends: ends)
    end

    private

    attr_reader :date, :duration_in_minutes, :slot

    def valid?
      valid_date? && valid_duration? && slot_not_booked?
    end

    def id
      @id ||= SecureRandom.uuid
    end

    def starts
      @starts ||= Time.zone.parse("#{date} #{slot}")
    end

    def ends
      @ends ||= starts + duration_in_minutes.minutes
    end

    def slot_not_booked?
      return true if available_slots.present? && available_slots.include?(slot)

      @errors.push("Sorry! The slot that you picked is already booked")
      false
    end

    def available_slots
      @available_slots ||= Services::FetchAvailableSlots.new(date, duration_in_minutes).call
    end
  end
end
