class Item < ApplicationRecord
  belongs_to :dinner
  belongs_to :lunch
end
