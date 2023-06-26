class Booking < ApplicationRecord
	FIRST_TIME_SLOT = "00:00"
	LAST_TIME_SLOT = "23:45"

	def self.generate_15_min_timeslots(date, current_time_slot = FIRST_TIME_SLOT, end_time_slot = LAST_TIME_SLOT)
		slots = []
	  current_time = Time.zone.parse("#{date} #{current_time_slot}")
	  end_time = Time.zone.parse("#{date} #{end_time_slot}")

	  while current_time <= end_time
	    slots << current_time.strftime('%H:%M')
	    current_time += 900
	  end

	  slots
	end
end
