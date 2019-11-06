Rails.application.routes.draw do
  # namespace :dashboard do
  #   get 'dashboard/index'
  # end
  devise_for :librarians
  devise_for :middlemen

  root to: redirect('/books')

  get 'books', to: 'pages#index'
  get 'books/new', to: 'pages#index'
  get 'books/:id', to: 'pages#index'
  get 'books/:id/edit', to: 'pages#index'


  namespace :api do

    # authenticated :librarian do
    #     resources :books, module: "librarian", :only => [:show, :index]
    # end

    # authenticated :middleman do
    #     resources :books, module: "middleman"
    # end
    resources :books do
      get :manage, on: :collection
    end

  end
end
