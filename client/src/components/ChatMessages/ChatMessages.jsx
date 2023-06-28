import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "react-ig-icons";
import Message from './Message';
import {Icon} from '@iconify/react'

const ChatMessages = ({currentChat, setCurrentChat, user, onlineUsers, socket}) => {
    const [reciver, setReciver] = useState('');
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState("");

  const scrollRef = useRef();

  // send message
  const sendMessage = async () => {
    socket.current?.emit('sendMessage', {
      reciverId: reciver._id,
      payload: {
        conversation: currentChat._id, 
        text:newMessage,
        sender: user,
        createdAt: Date.now()
      }
    })

    try {
        const {data} = await axios.post('/messages', {conversation: currentChat._id, text:newMessage});

        setMessages(messages => [...messages, {...data.message, sender: user}])
        setNewMessage('');
        

    } catch (error) {
        console.log(error)
    }
  };

  // fetch messages
  useEffect(() => {
    const handleMessages = async () => {
      try {
        const { data } = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    const getReciver = () => {
        setReciver(currentChat?.members.find(item => item._id !== user._id))
    }

    if (currentChat) {
        getReciver();
        handleMessages();
    }
  }, [currentChat]);

  // scroll auto to bottom
  useEffect(() => {    
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(()=>{
    socket.current?.on('getMessage', (payload)=>{
      if(currentChat._id === payload.conversation){
        setMessages(messages => [...messages, payload])
      }
    })
  },[])

  // console.log(reciver._id)

  return (
    <div>
      <div className="messages__header">
        <div>
          <Avatar w="35px" h="35px" src={reciver.avatar?.url} />
          {onlineUsers.some(user => user.userId === reciver._id) && <span></span>}
          <div className="text">
            <b>{reciver.name}</b>
            <small>{reciver.handle}</small>
          </div>
        </div>
        <div>
          <button onClick={() => setCurrentChat("")}>
            <Icon icon="mdi:arrow-left-thin" />
          </button>
        </div>
      </div>

      <div className="messages">
        {messages?.length > 0 ? (
          messages?.map((item, i) => {
            return(
            <div key={i} ref={scrollRef}>
              <Message 
                message={item} 
                own={item.sender?._id === user._id ? true : false}
                />
            </div>
          )})
        ) : (
          <p className="error__msg">No message yet</p>
        )}
      </div>

      <div className="message__input">
              <input
                type="text"
                placeholder="Write something..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={e => e.key==='Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  );
};

// const ChatMessages = () => {
//   return (
//     <>
//         <div
//               className="messages__header"
//               onClick={() => setCurrentChat('')}
//             >
//               <div>
//                 {/* <Avatar w="35px" h="35px" src={user.avatar?.url} />
//                 <div className="text">
//                   <b>{user.name}</b>
//                   <span>{user.handle}</span>
//                 </div> */}
//               </div>
//               <div>
//                 <button>
//                   <Icon icon="mdi:arrow-left-thin" />
//                 </button>
//               </div>
//             </div>
//             <div className="messages">
//               {/* {messages.length > 0 ? messages.map( */}
//                 (item, i) => (
//                   <div key={i} ref={scrollRef}>
//                     <Message user={user} own={false} />
//                   </div>
//                 )
//               ) : <p className='error__msg'>No message yet</p>}
//             </div>
{
  /* <div className="message__input">
              <input
                type="text"
                placeholder="Write something..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button>Send</button>
            </div> */
}
//     </>
//   )
// }

export default ChatMessages;
