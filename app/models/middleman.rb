class Middleman < User
  has_one :address, as: :addressable
end
