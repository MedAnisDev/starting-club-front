import React, { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { Button, Input } from "antd";
import "./chat.css";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  const username = useSelector(
    (state) => state.auth.user?.firstname + " " + state.auth.user?.lastname
  ); 

  //styles
  const sendButtonStyles = {
    width: "100%",
  };

  //functions
  const onConnected = (client) => {
    setConnected(true);
    client.subscribe("/chatroom/public", onMessageReceive);
    addUser(client);
  };

  const onMessageReceive = (messagePayload) => {
    var receivedMessage = JSON.parse(messagePayload.body);

    var status = receivedMessage.type;
    switch (status) {
      case "JOIN":
        receivedMessage.content = `${receivedMessage.sender} JOINED`;
        break;

      case "LEAVE":
        receivedMessage.content = `${receivedMessage.sender} LEFT`;
        break;

      default:
        break;
    }

    console.log("receivedMessage :", receivedMessage);
    console.log("messages list : ", messages);

    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  const onError = (err) => {
    console.log(err);
  };

  const userLeave = (client) => {
    var chatMessage = {
      sender: username,
      type: "LEAVE",
    };
    client.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
  };

  const addUser = (client) => {
    const join = { 
       sender: username,
         type: "JOIN",
    };
    client.send("/app/chat.addUser",{},JSON.stringify(join));
};

  const sendMessage = () => {
    if (message && stompClient) {
      const chatMessage = {
        content: message,
        sender: username,
        type: "CHAT",
      };
      console.log("sending message ", chatMessage);

      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      setMessage("");
    }
  };

  
  //use Effect
  useEffect(() => {
    const socket = new SockJS("http://localhost:8082/ws");
    const client = Stomp.over(socket);
    setStompClient(client);

    client.connect({}, () => onConnected(client), onError);

    const heartbeatInterval = setInterval(() => {
      client.send("/app/chat.keepAlive", {}, JSON.stringify({}));
    }, 30000); // 30 seconds
    
    return () => {
      client.disconnect(() => {
        userLeave(client);
      });
      clearInterval(heartbeatInterval) ;
    };
      
  }, []);

  return (
    <div className="chat-container">
      
      <h1 className="title">Forum Chat</h1>

      <div className="discussion-container">
        <ul>
          {messages.map((msg, index) => (
            msg.type === "CHAT" ? (
              <li key={index}>
                <div className="chat-message border-bottom"><strong>{msg.sender}</strong> : {msg.content} </div>
              </li>
            ) : (
              <div className="status-message border-bottom">{msg.content} </div>
            )
          ))}
        </ul>
      </div>
      {!connected && <p>Connecting to chat...</p>}


      <div className="input-container">
        <Input
          style={sendButtonStyles}
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!connected}
        />
        <Button type="primary" onClick={sendMessage} disabled={!connected}>
          Send
        </Button>
      </div>

    </div>
  );
};

export default Chat;