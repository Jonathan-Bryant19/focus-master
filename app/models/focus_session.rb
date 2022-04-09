class FocusSession < ApplicationRecord
    has_many :user_sessions, dependent: :destroy
    has_many :users, through: :user_sessions
end
