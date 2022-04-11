Rails.application.routes.draw do
  
  get '/hello', to: 'application#hello_world'

  resources :users, only: [:create, :show, :update]
  resources :sessions, only: [:create, :destroy]

  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
