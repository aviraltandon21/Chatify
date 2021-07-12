import React, { useState, useEffect, useRef } from 'react'

import { Segment, Comment } from 'semantic-ui-react'
import MessagesHeader from './MessagesHeader'
import MessagesForm from './MessagesForm'
import firebase from '../../firebase'
import Message from './Message'

export default function Messages ({ currentUser, currentChannel }) {
    const [user] = useState(currentUser)
    const [channel] = useState(currentChannel)
    const [messages, setMessages] = useState([])
    const [messagesRef] = useState(firebase.database().ref('messages'))
   
    const messagesEndRef = useRef(null)
    

    useEffect(() => {
        if (user && channel) {
          addListeners(channel)
        }
      }, [])

      const addListeners = channel => {
        getAllMessagesListener(channel.id)
        
      }

      const getAllMessagesListener = channelId => {
         
        messagesRef
          .child(channelId)
          .on('child_added', snap => {
            const message = snap.val()
            
            setMessages(messages => [...messages, message])
          })
        
      }

      useEffect(() => {
        
        if (messagesEndRef) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
      }, [messages])


      const renderMessages = messages => {
        return (
          messages.length > 0 &&
          messages.map(message => (
            <Message key={message.timestamp} message={message} user={user}/>
          ))
        )
      }

      const getChannelName = channel =>
    channel ? `#${channel.name}` : '';

    const getUniqueUsers = messages => {
      const uniqueUsers = messages.reduce((acc, message) => {
        if (!acc.includes(message.user.name)) {
          acc.push(message.user.name)
        }
        return acc
      }, [])
  
      const numUniqueUsers = uniqueUsers.length
      
      return `${numUniqueUsers} users`
    }

    return (
        <>
        <MessagesHeader channelName={getChannelName(channel)} users={getUniqueUsers(messages)}/>
        <Segment className="messages">
            <Comment.Group>
                {renderMessages(messages)}
                <div ref={messagesEndRef}></div>
            </Comment.Group>
        </Segment>
        <MessagesForm
            currentChannel={currentChannel}
            currentUser={currentUser}
            messagesRef={messagesRef}
        />

        </>
    )
}