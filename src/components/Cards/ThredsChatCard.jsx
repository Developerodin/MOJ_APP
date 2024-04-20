import { IonCard, IonCardContent, IonIcon, IonText } from "@ionic/react";
import React from "react";
import { heartOutline, sendOutline, chatbubbleOutline } from "ionicons/icons";

const ThredsChatCard = (props) => {
  const { Data} = props;

  if (Data.LastSendImage !== undefined)
    console.log("Imges", Data.LastSendImage.length);

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
          <div style={{ width: "60px", height: "60px",borderRadius: "100px",backgroundColor:`${Data.Color}` }}>
            {/* <img
              src={Data.Img}
              alt="user Image"
              style={{ width: "100%", height: "100%", borderRadius: "100px" }}
            /> */}
          </div>

          <div style={{ marginLeft: "6px" }}>
            <div>
              <IonText
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                {Data.Name}
              </IonText>
            </div>
            <div>
              <IonText style={{ fontSize: "13px", color: "grey" }}>
                {Data.LastChat}
              </IonText>
            </div>
          </div>
        </div>

        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <IonText style={{ fontSize: "12px" }}>{Data.LastSeen}</IonText>
          </div>
        </div> */}
      </div>

      <div style={{ display: "flex", marginLeft: "25px" }}>
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

export default ThredsChatCard;
