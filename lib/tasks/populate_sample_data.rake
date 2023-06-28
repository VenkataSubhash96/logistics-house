# frozen_string_literal: true
require_relative "../../lib/services/create_booking"

namespace :populate_sample_data do
  desc 'Populate Bookings table with some sample data'
  task run: :environment do
    data = [
      { "id" => SecureRandom.uuid, "start" => '2022-02-01T20:00:00.000Z',
        "end" => '2023-07-01T22:30:00.000Z' },
      { "id" => SecureRandom.uuid, "start" => '2022-01-31T23:00:00.000Z',
        "end" => '2023-07-01T06:00:00.000Z' },
      { "id" => SecureRandom.uuid, "start" => '2022-02-01T10:15:00.000Z',
        "end" => '2023-07-01T10:45:00.000Z' },
      { "id" => SecureRandom.uuid, "start" => '2022-02-01T13:55:00.000Z',
        "end" => '2023-07-01T14:30:00.000Z' },
      { "id" => SecureRandom.uuid, "start" => '2022-02-02T10:00:00.000Z',
        "end" => '2023-07-02T20:00:00.000Z' },
      { "id" => SecureRandom.uuid, "start" => '2022-02-01T09:00:00.000Z',
        "end" => '2023-07-01T10:00:00.000Z' },
      { "id" => SecureRandom.uuid, "start" => '2022-02-01T11:30:00.000Z',
        "end" => '2023-07-01T13:00:00.000Z' },
      { "id" => SecureRandom.uuid, "start" => '2022-02-01T13:00:00.000Z',
        "end" => '2023-07-01T13:10:00.000Z' }
    ]

    data.each do |values|
      Booking.create!(id: values["id"], starts: values["start"], ends: values["end"])
    end
  end
end
