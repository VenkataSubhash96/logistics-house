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

* Copy the sample data to a CSV file and place it inside `db/csvs`
  ```
	{ "id": "bd8fc476-ac50-3327-4ece-d73897796852", "start": "2022-02-01T20:00:00.000Z", "end": "2023-07-01T22:30:00.000Z" },
	{ "id": "8c73d0ca-d999-4081-1558-e5ee6a40fcc2", "start": "2022-01-31T23:00:00.000Z", "end": "2023-07-01T06:00:00.000Z" },
	{ "id": "086e3a96-2c74-3d2a-e839-ad10c82626d5", "start": "2022-02-01T10:15:00.000Z", "end": "2023-07-01T10:45:00.000Z" },
	{ "id": "9e323a9e-adf9-605f-9386-c939a9a6af3f", "start": "2022-02-01T13:55:00.000Z", "end": "2023-07-01T14:30:00.000Z" },
	{ "id": "0510de47-c86e-a64c-bb86-461c039b1012", "start": "2022-02-02T10:00:00.000Z", "end": "2023-07-02T20:00:00.000Z" },
	{ "id": "4b24e6ab-bdc6-6b2c-e405-a8e01f0fde84", "start": "2022-02-01T09:00:00.000Z", "end": "2023-07-01T10:00:00.000Z" },
	{ "id": "087ddebe-dd41-7e39-bda8-f617d8c4385d", "start": "2022-02-01T11:30:00.000Z", "end": "2023-07-01T13:00:00.000Z" },
	{ "id": "5117e557-8d86-4180-9326-1ce0cf733982", "start": "2022-02-01T13:00:00.000Z", "end": "2023-07-01T13:10:00.000Z" }
  ```
* Run the following commands in the console
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
