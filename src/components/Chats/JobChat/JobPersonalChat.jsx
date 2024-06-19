import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewDidLeave,
  IonButton,
} from "@ionic/react";
import { closeOutline, sendOutline } from "ionicons/icons";
import { useParams, useLocation } from "react-router";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
import { Base_url } from "../../../Config/BaseUrl";
import ChattingCardSender from "../../Cards/ChattingCardSender";
import ChattingGroupRecivedCard from "../../Cards/ChattingGroupRecivedCard";

const JobPersonalChat = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const history = useIonRouter();
  const { id } = useParams();
  const location = useLocation();
  const { setTabBarVisibility } = useContext(AppContext);
  const path = location.pathname;

  setTabBarVisibility(path);

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const handleHardwareBackButton = (event) => {
    event.detail.register(1, () => {
      handleBackButtonClick();
    });
  };

  useIonViewDidEnter(() => {
    document.addEventListener("ionBackButton", handleHardwareBackButton);
    return () => {
      document.removeEventListener("ionBackButton", handleHardwareBackButton);
    };
  });

  useIonViewDidLeave(() => {
    document.removeEventListener("ionBackButton", handleHardwareBackButton);
  });

  const getuserID = async (id) => {
    try {
      const response = await axios.post(
        `${Base_url}all_Huser_data/${id}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log("Fetched user data:", data);

        if (data && data.Job && data.Job.length > 0) {
          const hoteler = data.Job[0].hoteler_data;
          console.log("Hoteler data:", hoteler.name,data.Job[0].user_img);
          if (hoteler && hoteler.name) {
            setUserData({
              user_img: data.Job[0].user_img,
              name: hoteler.name,
            });
          } else {
            console.warn(
              "Hoteler data does not contain expected properties:",
              hotelerData
            );
          }
        } else {
          console.warn("No hoteler data found for ID:", id);
        }
      } else {
        console.error(
          "Error fetching hoteler data: ",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching hoteler data:", error);
    }
  };

  const sendMessage = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (!userDetails || !userDetails.user_id) {
        console.error("User details or user_id not found in localStorage.");
        return;
      }

      const senderId = userDetails.user_id;

      const response = await axios.post(
        `${Base_url}msg/store`,
        {
          sender_id: senderId,
          receiver_id: id,
          message_content: newMessage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      console.log("Message sent:", response.data);
      getAllMessages();
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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

      // Log the entire response to understand its structure
      console.log("API response:", response.data);

      const { sender, reciver } = response.data.Job;

      if (!Array.isArray(sender) || !Array.isArray(reciver)) {
        throw new Error("Invalid response format: sender or reciver is not an array");
      }

      // Combine and sort messages by sent_at
      const combinedMessages = [...sender, ...reciver];
      const sortedMessages = combinedMessages.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
      console.log("Sorted messages:", sortedMessages);
      const filteredMessages = sortedMessages.filter(msg => msg.sender_id === id || msg.receiver_id === id);
      console.log("Filtered messages:", filteredMessages);
      setMessages(filteredMessages);

    } catch (error) {
      console.error(`Error getting all messages: ${error}`);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (id) {
      console.log("User ID from PersonalChat component:", id); // Debugging log
      getuserID(id);
    }
    getAllMessages().then(data => {
      console.log(data); // Log the data to the console
    }).catch(error => {
      console.error(error); // Log any errors
    });
  }, [id]);

  useEffect(() => {
    
    getAllMessages();
    const interval = setInterval(() => {
      getAllMessages();
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const chatWindowRef = useRef(null);

  useEffect(() => {
    // Get the chat window element
    const chatWindow = chatWindowRef.current;
  
    if (chatWindow) {
      // Get the last message in the chat window
      const lastMessage = chatWindow.lastChild;
  
      if (lastMessage) {
        // Scroll the last message into view
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);
  return (
    <IonPage>
      <IonContent>
        <div
          style={{
            padding: "10px",
            position: "fixed",
            zIndex: "1",
            background: "#FFFF",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ width: "50px", height: "50px" }}>
                {userData && userData.user_img ? (
                  <img
                    src={userData.user_img}
                    alt="User Image"
                    style={{ width: "100%", height: "100%", borderRadius: "100px" }}
                  />
                ) : (
                  <IonText>No Image</IonText>
                )}
              </div>
              <div style={{ marginLeft: "10px" }}>
                <div>
                  <IonText style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {userData && userData.name}
                  </IonText>
                </div>
                <div>
                  <IonText style={{ fontSize: "11px", color: "grey" }}>
                    12 min ago
                  </IonText>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <IonIcon
                  onClick={handleBackButtonClick}
                  style={{ margin: "5px 3px 0px" }}
                  icon={closeOutline}
                  size="large"
                  color="dark"
                ></IonIcon>
              </div>
            </div>
          </div>
        </div>

        <div ref={chatWindowRef} style={{ marginTop: "100px", marginBottom: "60px", height: '79vh', overflow: 'auto' }} id="chatWindow" >
          {messages.map((msg, index) =>
            msg.sender_id === userDetails.user_id ? (
              <ChattingCardSender
                key={index}
                Data={msg.message_content}
                time={msg.time}
              />
            ) : (
              <ChattingGroupRecivedCard
                key={index}
                Data={msg.message_content}
                time={msg.time}
              />
            )
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            backgroundColor: "#F6F6F6",
            padding: "15px",
          }}
        >
          <IonList
            style={{
              borderRadius: "20px",
              height: "47px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IonItem lines="none" style={{ width: "100%" }}>
              <input
                type="text"
                placeholder="Type something..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleInputKeyPress}
                style={{ width: "100%", outline: "none", border: "none" }}
              />

              <IonButton slot="end" fill="clear" onClick={sendMessage}>
                <IonIcon icon={sendOutline}></IonIcon>
              </IonButton>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default JobPersonalChat;
