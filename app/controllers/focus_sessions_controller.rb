class FocusSessionsController < ApplicationController

    def show
        focusId = FocusSession.find_by!({duration: params[:duration], interval: params[:interval]}).id
        render json: focusId, status: :ok
    end

end
