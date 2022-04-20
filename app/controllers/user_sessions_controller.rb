class UserSessionsController < ApplicationController

    def create
        render json: UserSession.create!(user_session_params), status: :created

        # user = User.find_by(username: params[:username])
        # session[:user_id] = user.id
        # render json: user
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
