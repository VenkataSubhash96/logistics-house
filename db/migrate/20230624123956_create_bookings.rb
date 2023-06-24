class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings, id: :uuid do |t|
      t.string :customer_name
      t.datetime :starts
      t.datetime :ends

      t.timestamps
    end
  end
end
