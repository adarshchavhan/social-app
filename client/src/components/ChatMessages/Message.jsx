import React from 'react'
import { Avatar } from 'react-ig-icons'
import TimeAgo from "timeago-react";

const Message = ({message, own}) => {
  return (
    <div className={`message ${own ? 'own':''}`}>
        <Avatar h='30px' w='30px' src={message.sender.avatar?.url}/>
        <div>
            <div className="text">{message.text}</div>
            <span>
              <TimeAgo datetime={message.createdAt} locale="in" />
            </span>
        </div>
    </div>
  )
}

export default Message