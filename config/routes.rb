Rails.application.routes.draw do
  get 'bookings/welcome'
  get 'bookings/available_slots'

  resources :bookings
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "bookings#welcome"
end
