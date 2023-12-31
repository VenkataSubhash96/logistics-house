# README

This application is a logistics management software where companies can book a time slot to load or unload goods at a warehouse.

Table of Contents
=================
* [Setting up development environment](#setting-up-development-environment)
  * [Prerequisites](#prerequisites)
* [Setting up the database](#setting-up-the-database)
* [Importing sample data](#importing-sample-data)
* [Starting the rails server](#starting-the-rails-server)
* [[UI for booking slot](#ui-for-booking-slot)
* [Running test cases](#running-test-cases)
* [Things to keep in mind](#things-to-keep-in-mind)



## Setting up development environment

### Prerequisites

* This app is using `ruby 3.0.5` and `rails 7.0.4`
* Install **rbenv** from [here](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-14-04)
* Install **ruby 3.0.5**: `rbenv install 3.0.5`
* Set **ruby 3.0.5** as local version in the project directory: `rbenv local 3.0.5`
* Install **bundler**: `gem install bundler`
* Run `npm install`
* Run `bundle install`

## Setting up the database

* Migrate the database using `bundle exec rake db:drop db:create db:migrate`

## Importing sample data

* Run the following commands in the console to populate sample data
```
bundle exec rake populate_sample_data:run
```

## Starting the rails server

* `bundle exec rails s` - This will start a rails server in the port 3000.
* Open `http://localhost:3000`

## UI for booking slot

* Once you open `http://localhost:3000`, you will see the form to book a slot for pickup or dropping.

## Running test cases

* This app is using `rspec` for test cases.
* Run `bundle exec rspec spec` to run the test cases. The test suite should be green.

## Things to keep in mind

* This app is using action cable to implement web socket for live updates on slot bookings.
* This app is using Importmap to manage Javascript dependencies.
