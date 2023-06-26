import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function WelcomePage() {
  const [isBookYourSlotButtonVisible, setBookYourSlotButtonVisible] = useState(true);
  const [slotDate, setSlotDate] = useState(null);
  const [slotDuration, setSlotDuration] = useState(null);
  const [fieldMissingError, setFieldMissingError] = useState(null);
  const [suggestedSlots, setSuggestedSlots] = useState([]);
  const [suggestedSlotsApiErrors, setSuggestedSlotsApiErrors] = useState(null);
  const [showSuggestedTimeSlotsButtonClicked, setShowSuggestedTimeSlotsButtonClicked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotBooked, setSlotBooked] = useState(false);
  const [slotMissingError, setSlotMissingError] = useState(null);
  const [bookSlotApiError, setBookSlotApiError] = useState(null);

  const centerAlignStyle = {
    textAlign: 'center'
  };

  const lineStyle = {
    border: 'none',
    borderBottom: '2px solid #ccc',
    width: '100%',
    margin: '0',
    height: '50px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '15px',
    backgroundColor: '#484dff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff'
  };

  const dateStyle = {
    textAlign: 'center',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: 'orange',
    border: '1px solid #ccc',
    outline: 'none',
    width: '250px',
    color: 'black',
    textTransform: 'uppercase'
  };

  const boxStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: 'green',
    borderRadius: '20px',
    width: '300px',
    height: '50px',
    textAlign: 'center'
  };

  const slotBookedConfirmationContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25vh'
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const hideBookYourSlotButton = () => {
    setBookYourSlotButtonVisible(false);
  };

  const handleSlotDateChange = (event) => {
    setSlotDate(event.target.value);
  };

  const handleSlotDurationChange = (event) => {
    setSlotDuration(event.target.value);
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const redirectToHome = () => {
    window.location.reload();
  }

  const bookSlot = () => {
    if (selectedSlot === null || selectedSlot === '') {
      setSlotMissingError("Please choose a slot to proceed!")
    } else {
      fetch('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          booking_date: slotDate,
          duration_in_minutes: slotDuration,
          slot: selectedSlot
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          console.log("Error")
        }
        return response.json();
      })
      .then(data => {
        if (data.success === true) {
          setSlotBooked(true)
        } else {
          setBookSlotApiError(data.errors)
        }
      })
      .catch(error => {
        setSuggestedSlotsApiErrors(data.errors)
      });
    }
  };

  const showSuggestedTimeSlots = () => {
    if (slotDate === null || slotDate === '' || slotDuration === null || slotDuration === '') {
      setFieldMissingError("Please choose both the fields to proceed!")
    } else {
      fetch(`/bookings/available_slots?date=${slotDate}&duration=${slotDuration}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          console.log("Error")
        }
        return response.json();
      })
      .then(data => {
        if (data.success === true) {
          setShowSuggestedTimeSlotsButtonClicked(true)
          setSuggestedSlots(data.available_slots)
        } else {
          setSuggestedSlotsApiErrors(data.errors)
        }
      })
      .catch(error => {
        console.log(error)
      });
    }
  };

  const lineElement = React.createElement('hr', { style: lineStyle });

  const companyTitleElement = React.createElement(
    'h1', {style: centerAlignStyle}, 'Swift Logistics'
  );

  const companySubtitleElement = React.createElement(
    'p', {style: {textAlign: 'center', marginTop: '-20px'}}, 'Delivering Excellence at Every Step'
  );

  const bookPickupTextElement = React.createElement(
    'h3', {style: {textAlign: 'center', marginTop: '50px'}}, 'Book your pickup or drop'
  );

  const bookYourSlotButton = isBookYourSlotButtonVisible ? React.createElement(
    'button', { onClick: hideBookYourSlotButton, style: buttonStyle }, 'Book your slot'
  ) : null

  const bookYourSlotElement = React.createElement(
    'div', { style: buttonContainerStyle }, bookYourSlotButton
  );

  const slotDateElement = React.createElement(
    'input', { type: 'date', onChange: handleSlotDateChange, style: dateStyle, required: true, min: currentDate }
  );

  const slotDurationElement = React.createElement(
    'select',
    { onChange: handleSlotDurationChange, style: dateStyle, required: true },
    React.createElement('option', { value: '' }, 'Duration'),
    React.createElement('option', { value: '30' }, '30 Minutes'),
    React.createElement('option', { value: '60' }, '1 Hour'),
    React.createElement('option', { value: '120' }, '2 Hours'),
    React.createElement('option', { value: '180' }, '3 Hours'),
    React.createElement('option', { value: '240' }, '4 Hours'),
    React.createElement('option', { value: '300' }, '5 Hours'),
    React.createElement('option', { value: '500' }, '10 Hours')
  );

  const slotDateDivElement = !isBookYourSlotButtonVisible ? React.createElement(
    'div',
    { style: centerAlignStyle },
    React.createElement('p', {}, 'Please choose a date and duration'),
    slotDateElement,
    slotDurationElement
  ) : null

  const showSuggestedTimeSlotsButton = React.createElement(
    'button', { onClick: showSuggestedTimeSlots, style: buttonStyle }, 'Show suggested time slots'
  )

  const showSuggestedTimeSlotsButtonElement = !isBookYourSlotButtonVisible ? React.createElement(
    'div', { style: {textAlign: 'center', marginTop: '20px'} }, showSuggestedTimeSlotsButton
  ) : null

  const fieldsMissingErrorMessageElement = fieldMissingError ? React.createElement(
    'p', { style: {textAlign: 'center', marginTop: '20px', color: 'red'} }, fieldMissingError
  ) : null

  const showSuggestedTimeSlotsApiErrorMessage = suggestedSlotsApiErrors ? React.createElement(
    'p', { style: {textAlign: 'center', marginTop: '20px', color: 'red'} }, suggestedSlotsApiErrors
  ) : null

  const bookSlotApiErrorMessage = bookSlotApiError ? React.createElement(
    'p', { style: {textAlign: 'center', marginTop: '20px', color: 'red'} }, bookSlotApiError
  ) : null

  const suggestedSlotsSelectElement = suggestedSlots.map((suggestedSlot, index) =>
    React.createElement('option', { value: suggestedSlot }, suggestedSlot)
  )

  const suggestedSlotsElement = suggestedSlots.length > 0 ? React.createElement(
    'div',
    { onChange: handleSlotChange, style: {textAlign: 'center', marginTop: '20px'} },
    React.createElement(
      'select',
      { style: dateStyle, required: true },
      [React.createElement('option', { value: '' }, 'Please choose a slot'), ...suggestedSlotsSelectElement]
    )
  ) : null

  const bookThisSlotButton = React.createElement(
    'button', { onClick: bookSlot, style: buttonStyle }, 'Book this slot'
  )

  const bookThisSlotButtonElement = showSuggestedTimeSlotsButtonClicked ? React.createElement(
    'div', { style: {textAlign: 'center', marginTop: '20px'} }, bookThisSlotButton
  ) : null

  const slotMissingErrorMessageElement = slotMissingError ? React.createElement(
    'p', { style: {textAlign: 'center', marginTop: '20px', color: 'red'} }, slotMissingError
  ) : null

  const slotBookingForm = React.createElement(
    'div',
    {},
    lineElement,
    companyTitleElement,
    companySubtitleElement,
    bookPickupTextElement,
    bookYourSlotElement,
    slotDateDivElement,
    showSuggestedTimeSlotsButtonElement,
    showSuggestedTimeSlotsApiErrorMessage,
    fieldsMissingErrorMessageElement,
    suggestedSlotsElement,
    bookThisSlotButtonElement,
    slotMissingErrorMessageElement,
    bookSlotApiErrorMessage
  )

  const successfullyBookedMessage = React.createElement(
    'p', {style: {color: 'white'}}, 'You have successfully booked a slot!'
  )

  const slotBookedConfirmationMessage = React.createElement(
    'div', { style: boxStyle }, successfullyBookedMessage
  )

  const slotBookedConfirmationMessageContainer = React.createElement(
    'div',
    { style: slotBookedConfirmationContainerStyle },
    slotBookedConfirmationMessage
  )

  const homeButton = React.createElement(
    'button', { onClick: redirectToHome, style: buttonStyle }, 'Home'
  )

  const homeButtonElement = React.createElement(
    'div', {style: centerAlignStyle}, homeButton
  )

  const slotBookedConfirmationMessageElement = React.createElement(
    'div',
    {},
    lineElement,
    companyTitleElement,
    companySubtitleElement,
    slotBookedConfirmationMessageContainer,
    homeButtonElement
  )

  const loadPage = slotBooked ? slotBookedConfirmationMessageElement : slotBookingForm

  return React.createElement(
    'div',
    {},
    loadPage
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(WelcomePage, {}, null),
    document.getElementById('welcome'),
  )
})