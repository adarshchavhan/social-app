import React from "react";
import User from "./User";

const ChatUsers = ({ users, onlineUsers, handleCurrentChat }) => {
  return (
    <div className="users">
      {users?.length > 0 ? (
        users.map((item, i) => (
          <div key={i} onClick={() => handleCurrentChat(item._id)}>
            <User user={item} online={onlineUsers.some(user => user.userId === item._id)} />
          </div>
        ))
      ) : (
        <p className="error__msg">No users yet.</p>
      )}
    </div>
  );
};

export default ChatUsers;
