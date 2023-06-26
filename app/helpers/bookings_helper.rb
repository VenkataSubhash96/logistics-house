module BookingsHelper
	MINIMUM_DURATION_TIME_IN_MINUTES = 30

	def valid_date?
    parsable_date? && date_is_not_in_past?
  end

  def parsable_date?
    parsed_date
  rescue ArgumentError
    @errors.push('Invalid date provided!')
    false
  end

  def date_is_not_in_past?
    return true if parsed_date >= Date.today

    @errors.push('Date cannot be in the past!')
    false
  end

  def parsed_date
    @parsed_date ||= Date.parse(date)
  end

  def valid_duration?
    return true if duration_in_minutes >= MINIMUM_DURATION_TIME_IN_MINUTES

    @errors.push('Minimum duration is 30 minutes!')
    false
  end
end
