class UserSession < ApplicationRecord
    belongs_to :user
    belongs_to :focus_session
end
