FactoryBot.define do
  factory :booking do
    id { SecureRandom.uuid }
    customer_name { 'Trade Link exports' }
  end
end