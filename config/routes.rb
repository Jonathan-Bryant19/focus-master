Rails.application.routes.draw do
  
  get '/hello', to: 'application#hello_world'

  resources :users, only: [:create, :show, :destroy]
  resources :sessions, only: [:create, :destroy]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  
  post '/newfocus', to: 'user_sessions#create'
  post '/findfocussessionid', to: 'focus_sessions#show'

  delete '/deleteaccount', to: 'users#destroy'
end
