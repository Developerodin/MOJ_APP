import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IonText } from "@ionic/react";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";

const ChatCard = ({ Data, userType }) => {
  const history = useHistory();
  const [userData, setUserData] = useState({ user_img: '', name: '' });

  const handleClick = () => {
    const path = userType === 'Agent' ? `/agent-personal-chat/${Data.receiver_id}` : `/personal-chat/${Data.receiver_id}`;
    history.push({
      pathname: path,
      state: { userData: Data },
    });
  };

  const getUserData = async (id) => {
    const apiUrl = userType === 'Agent' ? `${Base_url}auth/agent_get` : `${Base_url}all_user_data/${id}`;

    try {
      const response = userType === 'Agent' 
        ? await axios.get(apiUrl, { params: { id } })
        : await axios.post(apiUrl, {}, { headers: { "Content-Type": "multipart/form-data" } });

      if (response.status === 200) {
        const data = response.data;
        console.log("Fetched user data:", data);

        if (userType === 'Agent') {
          if (data && data.Job) {
            const user = data.Job.find(job => job.user_id.toString() === id.toString());
            if (user && user.user) {
              setUserData({
                user_img: user.user_img || '',
                name: user.user.name || '',
                
              });
            } else {
              console.warn("No user data found for ID:", id);
            }
          } else {
            console.warn("No agent data found.");
          }
        } else {
          if (data && data.Job && data.Job.length > 0) {
            const user = data.Job[0].user;
            if (user) {
              setUserData({
                user_img: data.Job[0].user_img || '',
                name: user.name || '',
              });
            } else {
              console.warn("No user data found for ID:", id);
            }
          } else {
            console.warn("No user data found for ID:", id);
          }
        }
      } else {
        console.error("Error fetching user data: ", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData(Data.receiver_id);
  }, [Data.receiver_id]);

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInMs = now - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      if (diffInDays === 1) {
        return "Yesterday";
      } else if (diffInDays <= 7) {
        return `${diffInDays} days ago`;
      } else {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
      }
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div onClick={handleClick} style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "55px", height: "55px" }}>
            <img
              src={userData.user_img || 'placeholder_image_url'} // Placeholder image URL if no image is provided
              alt="User Image"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "100px",
              }}
            />
          </div>
          <div style={{ marginLeft: "6px" }}>
            <div>
              <IonText
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#2D3F65",
                }}
              >
                {userData.name || 'Unknown User'}
              </IonText>
            </div>
            <div style={{ marginTop: "3px" }}>
              <IonText style={{ fontSize: "14px", color: "grey" }}>
                {Data.message_content || "No content"}
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
            <IonText style={{ fontSize: "14px" }}>{formatRelativeTime(Data.sent_at)}</IonText>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", marginLeft: "7px" }}>
        {Data.LastSendImage && Data.LastSendImage.length > 0 ? (
          <div style={{ display: "flex" }}>
            <div style={{ width: "50px", height: "50px" }}></div>
            {Data.LastSendImage.map((el, index) => (
              <div key={index} style={{ marginRight: "5px" }}>
                <div style={{ height: "50px" }}>
                  <img
                    src={el}
                    alt="image"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
