class User < ApplicationRecord
    has_secure_password
    has_many :user_sessions, dependent: :destroy
    has_many :focus_sessions, through: :user_sessions

    validates :username, presence: :true
    validates :email, presence: :true, uniqueness: :true, on: :create
    validates :password, presence: :true, confirmation: :true, on: :create
    validates :password_confirmation, presence: :true, on: :create
end
