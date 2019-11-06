class Book < ApplicationRecord
  belongs_to :user
  has_one :address, as: :addressable
  alias_method :location, :address
end
