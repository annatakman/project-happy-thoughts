import React, { useState, useEffect } from 'react'
import { LikeButton } from "./LikeButton"
import moment from "moment"
import './message-list.css'

export const MessageList = () => {
  const messages_url = "https://technigo-thoughts.herokuapp.com/"
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch(messages_url)
      .then(res => res.json())
      .then(data => {
        setMessages(data)
      })
  }, [])

  const onMessageLiked = (likedMessageId) => {
    const updatedMessages = messages.map((message) => {
      if (message._id === likedMessageId) {
        message.hearts += 1
      }
      return message
    })
    setMessages(updatedMessages)
  }

  return (
    <section className="message-list">
      {
        messages.map(message => (
          <article className="message" key={message._id}>
            <p>{message.message}
            </p>
            <div className="likes-and-time-container">

              <div className="likes">  < LikeButton
                id={message._id}
                message={message}
                onMessageLiked={onMessageLiked} /> x {message.hearts}</div>
              <div className="time-stamp">{moment(message.createdAt).fromNow()}</div>
            </div>
          </article>
        ))
      }
    </section>
  )
}