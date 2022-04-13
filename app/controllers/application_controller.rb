class ApplicationController < ActionController::API
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    before_action :authorize

    def hello_world
        session[:count] = (session[:count] || 0) + 1
        render json: { count: session[:count] }
    end

    def authorize 
        return render json: {error: "You are not logged in"}, status: :unauthorized unless current_user
    end

    def current_user  
        User.find_by(id: session[:user_id])
    end

    private

    def render_unprocessable_entity(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def render_not_found(error)
        render json: {error: "#{error.model} Not Found"}, status: :not_found
    end

end
