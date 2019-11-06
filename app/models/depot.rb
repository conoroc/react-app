class Depot < ApplicationRecord
  has_one :address, as: :addresssable, dependent: :destroy
end
