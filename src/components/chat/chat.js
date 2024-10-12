import React, { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { json } from "react-router";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const username = useSelector((state) => state.auth.user?.firstname); // Get the username from Redux store
  const [connected, setConnected] = useState(false); // Track connection status

  const onConnected = (client) => {
    setConnected(true);
    addUser();
    client.subscribe("/chatroom/public",onMessageReceive);
    userJoin();
  };


  const onMessageReceive = (messagePayload) => {
    const receivedMessage = JSON.parse(messagePayload.body);

    const status = receivedMessage.type ;
    console.log("statsu : ",status);
    
    console.log("receivedMessage :", receivedMessage);
    console.log("messages list : ",messages);

    setMessages((prevMessages) => [...prevMessages, receivedMessage]);

    
  };


  const onError = (err) => {
    console.log(err);
  };


  const userJoin = () => {
    const joinMessage = username + " joined";

    var chatMessage = {
        content: joinMessage,
        sender: username,
        type: "JOIN",
    };
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
  };

  const userLeave = () => {
    const leaveMessage = username + " left";
    var chatMessage = {
       content: leaveMessage,
        sender: username,
        type: "LEAVE",
    };
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
  };

  const sendMessage = () => {
    if (message && stompClient) {
      const chatMessage = {
        content: message,
        sender: username,
        type: "CHAT",
      };
      console.log("sending message ", chatMessage);

      stompClient.send("/app/chat.sendMessage",{},JSON.stringify(chatMessage)
      );
      setMessage("");
    }
  };

  const addUser = () => {
    if (stompClient) {
      const chatMessage = {
        sender: username,
        type: "JOIN",
      };
      stompClient.send("/app/chat.addUser", {}, JSON.stringify(chatMessage));
    }
  };

  useEffect(() => {
    const socket = new SockJS("http://localhost:8082/ws");
    const client = Stomp.over(socket);
    setStompClient(client);

    //connect to webSocket
    client.connect({}, () => onConnected(client), onError);


    //for keeping chat a alive
    const heartbeatInterval = setInterval(() => {
        client.send("/app/chat.keepAlive", {}, JSON.stringify({}));
    }, 30000); // 30 seconds


    //clean Up
    return ()=>{
      client.disconnect(() => {
        userLeave();
        console.log("WebSocket disconnected");
      });
      clearInterval(heartbeatInterval) ;
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Chat</h1>
      {/* Message Input */}
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!connected}
        />
        <button onClick={sendMessage} disabled={!connected}>
          Send
        </button>
      </div>
      {/* Chat Messages Display */}
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}</strong>: {msg.content}
            </li>
          ))}
        </ul>
      </div>
      {!connected && <p>Connecting to chat...</p>}{" "}
      {/* Show a message while connecting */}
    </div>
  );
};
