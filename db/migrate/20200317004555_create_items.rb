class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.belongs_to :dinner, null: false, foreign_key: true
      t.belongs_to :lunch, null: false, foreign_key: true

      t.timestamps
    end
  end
end
