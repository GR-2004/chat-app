import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Conversation from "./Conversation";

const Conversations = () => {
  const [ loading, setLoading ] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/user", {withCredentials: true});
        setConversations(res.data.users);
      } catch (error) {
        toast.error(error.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations && conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
