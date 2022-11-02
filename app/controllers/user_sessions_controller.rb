class UserSessionsController < ApplicationController

    def index
        render json: UserSession.where({user_id: current_user.id})
    end
    
    def create
        render json: UserSession.create!(user_session_params), status: :created
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

    private

    def user_session_params
        params.permit(:user_id, :focus_session_id, :score)
    end

end
