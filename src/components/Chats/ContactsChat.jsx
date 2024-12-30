import React, { useEffect, useState } from 'react';
import ChatCard from '../Cards/ChatCard';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';

const ContactsChat = ({ userType,refresh }) => {
  const [uniqueReceiverIds, setUniqueReceiverIds] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (!userDetails || !userDetails.user_id) {
          console.error("User details or user_id not found in localStorage.");
          return;
        }

        const senderId = userDetails.user_id;
        const response = await axios.post(`${Base_url}msg/BysenderId/${senderId}`, {}, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });

        if (response.data && response.data.Job) {
          const { sender, reciver } = response.data.Job;

          const validSender = Array.isArray(sender) ? sender : [];
          const validReceiver = Array.isArray(reciver) ? reciver : [];

          if (validSender.length > 0 || validReceiver.length > 0) {
            const allMessages = [...validSender, ...validReceiver];
            setMessages(allMessages);

            const uniqueIdsSet = new Set(allMessages.map(message => message.receiver_id || message.sender_id));
            setUniqueReceiverIds(Array.from(uniqueIdsSet));
          } else {
            console.warn('No sender or receiver data found.');
          }
        } else {
          console.warn('No messages found.');
        }
      } catch (error) {
        console.error(`Error fetching messages: ${error}`);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);

    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div>
      {uniqueReceiverIds.length === 0 ? (
        <p>No messages found</p>
      ) : (
        uniqueReceiverIds.map((receiverId) => {
         
          const filteredMessages = messages.filter(msg => {
            if (userType === "Job Seeker") {
              return msg.receiver_role === "Job Seeker" && msg.receiver_id === receiverId;
            } else if (userType === "Agent") {
              return msg.receiver_role === "Agent" && msg.receiver_id === receiverId;
            }
            return false;
          });

          
          if (filteredMessages.length === 0) {
            return null;
          }

          
          const formattedMessage = {
            message_content: filteredMessages[0].message_content,
            id: filteredMessages[0].id,
            receiver_id: receiverId,
            sent_at: filteredMessages[0].sent_at
          };

          return (
            <div key={receiverId}>
              <ChatCard Data={formattedMessage} userType={userType} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default ContactsChat;
