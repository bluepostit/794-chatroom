class MessagesController < ApplicationController
  def create
    # create a message
    # assign a user and a chatroom
    # save
    # redirect to CHATROOM show page
    @message = Message.new(message_params)
    @message.user = current_user
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message.chatroom = @chatroom

    if @message.save
      ChatroomChannel.broadcast_to(
        @chatroom,
        render_to_string(partial: "message", locals: { message: @message })
      )
      head :ok
    else
      render 'chatrooms/show'
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
