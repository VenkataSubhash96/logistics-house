# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BookingsChannel, type: :channel do
  describe '#subscribed' do
    it 'successfully subscribes to the channel' do
      subscribe

      expect(subscription).to be_confirmed
    end

    it 'broadcasts a welcome message to the subscribed user' do
      subscribe

      expect(subscription).to have_stream_from('bookings_channel')
    end
  end
end
