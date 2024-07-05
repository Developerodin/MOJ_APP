import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import ChatCard from '../Cards/ChatCard';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';

const ContactsChat = ({ userType }) => {
  const { itemData } = useContext(AppContext);
  const history = useHistory();
  const [uniqueReceiverIds, setUniqueReceiverIds] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleCardClick = (receiverId) => {
    const path = userType === 'Agent' ? `/agent-personal-chat/${receiverId}` : `/personal-chat/${receiverId}`;
    history.push(path);
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

          const { sender, reciver } = response.data.Job;

          const validSender = Array.isArray(sender) ? sender : [];
          const validReciver = Array.isArray(reciver) ? reciver : [];

          if (validSender && validReciver) {
            let messages = [...validSender, ...validReciver];
            setMessages(messages);

            const uniqueIdsSet = new Set(validSender.map(message => message.receiver_id));
            const uniqueIdsSet2 = new Set(validReciver.map(message => message.sender_id));
            let uniqueIds = [...uniqueIdsSet, ...uniqueIdsSet2];
            let uniqueIdSet = new Set(uniqueIds);
            setUniqueReceiverIds(Array.from(uniqueIdSet));
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
    const interval = setInterval(() => {
      getAllMessages();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {uniqueReceiverIds.length === 0 ? (
        <p>No messages found</p>
      ) : (
        uniqueReceiverIds.map((receiverId) => {
          const message = messages.find(msg => msg.receiver_id === receiverId || msg.sender_id === receiverId);
          let msg = [message];
          const formattedMessages = msg.map(msg => ({
            message_content: msg.message_content,
            id: msg.id,
            receiver_id: receiverId,
            sent_at: msg.sent_at
          }));

          return (
            <div key={receiverId}>
              <ChatCard Data={formattedMessages[0]} userType={userType} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default ContactsChat;
