Rails.application.routes.draw do
  root 'pages#index'
  get 'home', to: 'pages#index'
  get 'about', to: 'pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
