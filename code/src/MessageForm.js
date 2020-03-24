import React, { useState } from 'react'
import './message-form.css'

export const MessageForm = () => {
  const [message, setMessage] = useState("")
  const messages_url = "https://technigo-thoughts.herokuapp.com/"

  const handleSubmit = event => {
    event.preventDefault()
    fetch(messages_url, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    }).then(() => {
      window.location.reload()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        What's making you happy right now?
      <textarea
          className="text-input"
          onChange={event => setMessage(event.target.value)}
        > </textarea>
      </label>
      <button
        className="submit-button"
        type="submit"
        {...message.length < 5 || message.length > 140 ? { disabled: true } : { enabled: true }}
      >
        <img className="heartIcon" src="./icons/heart.png" alt="Heart icon" />
        Send Happy Thought
        <img className="heartIcon" src="./icons/heart.png" alt="Heart icon" />
      </button>
    </form>
  )
}