import { IonCard, IonCardContent, IonIcon, IonText } from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { heartOutline, sendOutline, chatbubbleOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { AppContext } from "../../Context/AppContext";
const ChatCard = (props) => {
  const { Data } = props;
  
const history=useHistory();
  // if (Data.LastSendImage !== undefined)
  //   console.log("Imges", Data.LastSendImage.length);

    const handelClick =()=>{
      // console.log("going to personal chat");
      history.push(`/personal-chat/${Data.id}`)
     
  }

  useEffect(()=>{

  },[])

  return (
    <div style={{ marginBottom: "10px" }}>
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
          <div style={{ width: "50px", height: "50px" }}>
            <img
              src={Data.userImg}
              alt="user Image"
              style={{ width: "100%", height: "100%", borderRadius: "100px" }}
            />
          </div>

          <div style={{ marginLeft: "6px" }}>
            <div>
              <IonText
               onClick={handelClick}
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#2D3F65",
                }}
              >
                {Data.name}
              </IonText>
            </div>
            <div>
              <IonText style={{ fontSize: "9px", color: "grey" }}>
                {Data.discription}
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
            <IonText style={{ fontSize: "12px" }}>14.39</IonText>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", marginLeft: "7px" }}>
        {Data.LastSendImage !== undefined && Data.LastSendImage.length > 0 ? (
          <div style={{ display: "flex" }}>
            <div style={{ width: "50px", height: "50px" }}></div>
            {Data.LastSendImage.map((el, index) => {
              return (
                <div key={index} style={{ marginRight: "5px" }}>
                  <div style={{ height: "50px" }}>
                    <img
                      src={el}
                      alt="image"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
