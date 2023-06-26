# frozen_string_literal: true

require 'rails_helper'
require_relative '../../../lib/services/create_booking'

RSpec.describe Services::CreateBooking do
  describe '#call' do
    context 'When date is not parsable' do
      let(:params) do
        {
          booking_date: 'invalid_date',
          duration_in_minutes: 60,
          slot: '15:00'
        }
      end

      it 'throws an error' do
        service = described_class.new(params)

        expect(service.call).to be_nil
        expect(service.errors).to include('Invalid date provided!')
      end
    end

    context 'When date is in past' do
      let(:params) do
        {
          booking_date: '01/01/2000',
          duration_in_minutes: 60,
          slot: '15:00'
        }
      end

      it 'throws an error' do
        service = described_class.new(params)

        expect(service.call).to be_nil
        expect(service.errors).to include('Date cannot be in the past!')
      end
    end

    context 'When duration is less than 30' do
      let(:params) do
        {
          booking_date: '01/01/2030',
          duration_in_minutes: 20,
          slot: '15:00'
        }
      end

      it 'throws an error' do
        service = described_class.new(params)

        expect(service.call).to be_nil
        expect(service.errors).to include('Minimum duration is 30 minutes!')
      end
    end

    context 'When the slot is already booked' do
      let!(:booking) do
        create(:booking, starts: Time.zone.parse('01/01/2030 15:00'), ends: Time.zone.parse('01/01/2030 16:00'))
      end

      let(:params) do
        {
          booking_date: '01/01/2030',
          duration_in_minutes: 60,
          slot: '15:00'
        }
      end

      it 'throws an error' do
        service = described_class.new(params)

        expect(service.call).to be_nil
        expect(service.errors).to include('Sorry! The slot that you picked is already booked')
      end
    end

    context 'When params are valid' do
      let(:params) do
        {
          booking_date: '01/01/2030',
          duration_in_minutes: 60,
          slot: '15:00'
        }
      end

      it 'creates a booking' do
        expect { described_class.new(params).call }.to change { Booking.count }.by(1)
      end
    end
  end
end
