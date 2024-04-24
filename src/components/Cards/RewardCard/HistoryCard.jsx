import { IonCard, IonCardContent, IonIcon, IonText } from "@ionic/react";
import React from "react";
import { heartOutline, sendOutline, chatbubbleOutline } from "ionicons/icons";

const HistoryCard = (props) => {
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
          <div style={{ width: "50px", height: "50px",borderRadius: "100px",backgroundColor:`${Data.Color}` }}>
            {/* <img
              src={Data.Img}
              alt="user Image"
              style={{ width: "100%", height: "100%", borderRadius: "100px" }}
            /> */}
          </div>

          <div style={{ marginLeft: "20px" }}>
            <div>
              <IonText
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                {Data.title}
              </IonText>
            </div>
            <div style={{marginTop:"3px"}}>
              <IonText style={{ fontSize: "14px", color: "grey" }}>
                {Data.subHeading}
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
          <div style={{height:"45px",width:"45px",border:"1px solid #E4E4E4",borderRadius:"30px",background:"#F7A708",display: "flex",
            justifyContent: "center",
            alignItems: "center"}}>
            <span style={{color:"#fff",fontSize:"14px"}}>100</span>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default HistoryCard;
