import React, { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useAuth } from "../../context/AuthContext";
import { TiMessages } from "react-icons/ti";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { user } = useAuth();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full flex flex-col h-full bg-gray-900 rounded-lg shadow-md p-4">
      {!selectedConversation ? (
        <div className="flex flex-col items-center justify-center w-full h-full text-gray-200 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Welcome 👋 {user.fullName}</h2>
          <p className="text-lg md:text-xl">Select a chat to start messaging</p>
          <TiMessages className="text-4xl md:text-7xl text-blue-500" />
        </div>
      ) : (
        <>
          <div className="bg-gray-800 rounded-lg p-3 mb-4 text-white flex items-center justify-between">
            <span className="text-lg font-semibold">To: {selectedConversation.fullName}</span>
            <button 
              onClick={() => setSelectedConversation(null)} 
              className="text-sm text-red-400 hover:text-red-600"
            >
              Close Chat
            </button>
          </div>
          <div className="flex-1 bg-gray-800 p-4 rounded-lg overflow-auto">
            <Messages />
          </div>
          <div className="mt-4">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
