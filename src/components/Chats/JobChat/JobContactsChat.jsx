import React, { useContext, useEffect, useState } from 'react';

import ChatCard from '../../Cards/JobChatCard';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import { AppContext } from '../../../Context/AppContext';


const JobContactsChat = () => {
  
  const history = useHistory();
  const [uniqueReceiverIds, setUniqueReceiverIds] = useState([]);
  const [messages, setMessages] = useState([]);
  const { languageUpdate } = useContext(AppContext);
   const [selectedLanguage, setSelectedLanguage] = useState(
      localStorage.getItem("selectedLanguage") || "English"
    );
    useEffect(() => {
      // Code to update selectedLanguage from localStorage
      const languageFromStorage = localStorage.getItem("selectedLanguage");
      if (languageFromStorage) {
        setSelectedLanguage(languageFromStorage);
      }
    }, [languageUpdate]);

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

          const { sender,reciver } = response.data.Job;

          const validSender = Array.isArray(sender) ? sender : [];
      const validReciver = Array.isArray(reciver) ? reciver : [];

          if (validSender && validReciver) {
            let messages = [...validSender, ...validReciver];
            setMessages(messages);

            // Use a Set to store unique receiver IDs
            console.log('Sender++++++:', validSender,validReciver);
            const uniqueIdsSet = new Set(validSender.map(message => message.receiver_id));
            const uniqueIdsSet2 = new Set(validReciver.map(message => message.sender_id));
            console.log('Unique receiver IDs:', Array.from(uniqueIdsSet),Array.from(uniqueIdsSet2));

            let uniqueIds = [...uniqueIdsSet,...uniqueIdsSet2];
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
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {uniqueReceiverIds.length === 0 ? (
         <p>{selectedLanguage === "English" ? "No messages found" : "कोई संदेश नहीं मिला"}</p>
      ) : (
        uniqueReceiverIds.map((receiverId) => {
          console.log('Receiver ID++++++:', receiverId);
          console.log('Message:>>>>>', messages);

          const message = messages.find(msg => msg.receiver_id === receiverId || msg.sender_id === receiverId);
          let msg = [message]
          const formattedMessages = msg.map(msg => ({
            message_content: msg.message_content,
            id: msg.id,
            receiver_id: receiverId,
            sent_at: msg.sent_at
          }));
          console.log('Message2:>>>>>///////', formattedMessages);
          return (
            <div key={receiverId}>
              <ChatCard Data={formattedMessages[0]} onClick={() => handleCardClick(receiverId)} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default JobContactsChat;
