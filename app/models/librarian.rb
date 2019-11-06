class Librarian < User
  has_one :address, as: :addressable
  has_many :books, foreign_key: 'user_id', dependent: :destroy
end
