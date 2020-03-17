class CreateDinners < ActiveRecord::Migration[6.0]
  def change
    create_table :dinners do |t|
      t.string :name

      t.timestamps
    end
  end
end
