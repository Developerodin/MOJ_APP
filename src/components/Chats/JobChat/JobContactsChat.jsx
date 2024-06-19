import React, { useContext, useEffect, useState } from 'react';

import ChatCard from '../../Cards/JobChatCard';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';


const JobContactsChat = () => {
  
  const history = useHistory();
  const [uniqueReceiverIds, setUniqueReceiverIds] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleCardClick = (receiverId) => {
    history.push(`/job-personal-chat/${receiverId}`);
  };

  useEffect(() => {
    const getAllMessages = async () => {
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
          console.log('Messages retrieved:', response.data.Job);

          const { sender } = response.data.Job;

          if (Array.isArray(sender)) {
            setMessages(sender);

            // Use a Set to store unique receiver IDs
            const uniqueIdsSet = new Set(sender.map(message => message.receiver_id));
            setUniqueReceiverIds(Array.from(uniqueIdsSet));
          } else {
            console.warn('Sender is not an array');
          }
        } else {
          console.warn('No messages found');
        }
      } catch (error) {
        console.error(`Error getting all messages: ${error}`);
      }
    };

    getAllMessages();
  }, []);

  return (
    <div>
      {uniqueReceiverIds.length === 0 ? (
        <p>No messages found</p>
      ) : (
        uniqueReceiverIds.map((receiverId) => {
          const message = messages.find(msg => msg.receiver_id === receiverId);
          return (
            <div key={receiverId}>
              <ChatCard Data={message} onClick={() => handleCardClick(receiverId)} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default JobContactsChat;
