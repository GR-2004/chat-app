import React, { useEffect, useRef, useState } from "react";
import MessageSkeleton from "../MessageSkeletion";
import useConversation from "../../zustand/useConversation";
import Message from "./Message";
import { useSocket } from "../../context/SocketContext";
import axios from "axios";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const {socket} = useSocket();
  const lastMessageRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/message/${selectedConversation._id}`, {withCredentials: true});
        // console.log(res);
        setMessages(res.data.messages);
      } catch (error) {
        toast.error(error.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
         console.log(newMessage);
        setMessages([...messages, newMessage]);
    })
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages])
  
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages && 
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={index} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
