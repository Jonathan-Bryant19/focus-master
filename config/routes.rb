Rails.application.routes.draw do
  
  get '/hello', to: 'application#hello_world'

  resources :users, only: [:create, :show, :update]
  post '/signup', to: 'users#create'
end
