import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static values = {
    chatroomId: Number
  }
  static targets = ["messages", "form"]

  #resetForm() {
    this.formTarget.reset()
  }

  #scrollMessagesToEnd() {
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }

  connect() {
    this.channel = consumer.subscriptions.create(
      {
        channel: "ChatroomChannel",
        id: this.chatroomIdValue
      },
      {
        received: (data) => {
          this.messagesTarget.insertAdjacentHTML("beforeend", data)
          this.#scrollMessagesToEnd()
          this.#resetForm()
        }
      }
    )
    console.log(`Subscribed to the chatroom with the id ${this.chatroomIdValue}.`)
  }

  disconnect() {
    console.log("Unsubscribed from the chatroom")
    this.channel.unsubscribe()
  }
}
