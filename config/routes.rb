Rails.application.routes.draw do
  get "serveur/dashboard"
  get "chef/dashboard"
  get "admin/dashboard"
  devise_for :users, skip: :registrations
  resources :users
  resources :menus
  resources :clients
  root "home#index"
end
