# frozen_string_literal: true

require_relative '../../lib/services/fetch_available_slots'
require_relative '../../lib/services/create_booking'

class BookingsController < ApplicationController
  def welcome; end

  def available_slots
    service = Services::FetchAvailableSlots.new(available_slots_params[:date], available_slots_params[:duration])
    response = service.call
    if response
      render json: { success: true, available_slots: response }, status: :ok
    else
      render json: { success: false, errors: service.errors.to_sentence }, status: :unprocessable_entity
    end
  end

  def create
    service = Services::CreateBooking.new(create_params)
    response = service.call
    if response
      render json: { success: true }, status: :ok
    else
      render json: { success: false, errors: service.errors.to_sentence }, status: :unprocessable_entity
    end
  end

  private

  def available_slots_params
    params.permit(:date, :duration)
  end

  def create_params
    params.permit(:booking_date, :duration_in_minutes, :slot)
  end
end
