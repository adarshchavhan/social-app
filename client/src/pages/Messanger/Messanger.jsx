import React, { useState, useEffect, useRef } from 'react'
import './Messanger.scss'
import {useSelector} from 'react-redux'
import { SearchOutlined } from 'react-ig-icons';
import axios from 'axios'
import ChatUsers from '../../components/ChatUsers/ChatUsers';
import ChatMessages from '../../components/ChatMessages/ChatMessages';
import {io} from 'socket.io-client'

const Messanger = () => {
    const [text, setText] = useState('');
    const [users, setUsers] = useState([]);
    const [cusers, setCUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState('');
    const [conversations, setConversations] = useState([]); 
    const [onlineUsers, setOnlineUsers] = useState([]);

    const {user} = useSelector(state => state.user);
    
    const socket = useRef();

    //serach users
    const handleSearchUser = async(userId) => {
        try {
            const {data} = await axios.get(`/users/find?q=${text}`);
            setUsers(data.users.filter(item => item._id !== user._id));
        } catch (error) {
            console.log(error)
        }
    
    }

    // handle conversation
    const handleCurrentChat = async(reciverId) => {
        try {
            const {data} = await axios.post('/conversations', {reciverId})
            setCurrentChat(data.conversation);
        } catch (error) {
            console.log(error);
        }
    }
    
    // fetch all conversations
    useEffect(()=>{
        const handleConversations = async() => {
            try {
                const {data} = await axios.get('/conversations');
                setConversations(data.conversations);
            } catch (error) {
                console.log(error)
            }
        }
        handleConversations();
    },[currentChat])

    // merge conversations members
    useEffect(()=>{
        if(conversations){
            let arr = [];

            conversations.forEach(con => {
                arr.push(...con.members.filter(item => item._id !== user._id))
            })
            setCUsers(arr);
        }
    },[conversations]);


    useEffect(()=>{
      socket.current = io('ws://localhost:8900');
    },[])

    useEffect(()=>{
      socket.current?.emit('addUser', user._id)
      socket.current?.on('getUsers', (users)=>{
        setOnlineUsers(users);
      })
    },[user])

  return (
    <div className="messanger__page">
      <div className="wrapper">
        <div className={currentChat ? "hide" : ""}>
         
          <div className="search__bar">
            <input
              type="text"
              placeholder="Find users..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchUser()}
            />
            <button onClick={handleSearchUser}>
              <SearchOutlined h="16px" w="16px" />
            </button>
          </div>
         
          {text.length <= 0 ?
            <ChatUsers users={cusers} onlineUsers={onlineUsers} handleCurrentChat={handleCurrentChat}/> :
            <ChatUsers users={users} onlineUsers={onlineUsers} handleCurrentChat={handleCurrentChat}/>    
            }
        </div>

        {currentChat ? (
            <ChatMessages currentChat={currentChat} setCurrentChat={setCurrentChat} user={user} onlineUsers={onlineUsers} socket={socket}/>
        ) : (
          <div className="nochat">
            <p>Click to start conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messanger