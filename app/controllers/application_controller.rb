class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  # Note order of array defines redirect paths
  devise_group :user, contains: [:librarian, :middleman]
end
