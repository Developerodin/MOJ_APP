import { IonCard, IonCardContent, IonIcon, IonText } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { heartOutline,paperPlaneOutline,chatbubbleOutline,ellipsisVertical,bookmarkOutline,heart,bookmark, arrowBack} from 'ionicons/icons';
import { useHistory } from "react-router";

const CommentCard = (props) => {
  const { Data } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [LikeValue, setLikeValue] = useState(30);
  
const history=useHistory();
  // if (Data.LastSendImage !== undefined)
  //   console.log("Imges", Data.LastSendImage.length);

    const handelClick =()=>{
      // console.log("going to personal chat");
      history.push(`/personal-chat/${Data.id}`)
     
  }

  const handelLike=()=>{
    console.log("like post of",Data.name);
    setIsLiked(!isLiked);
    setLikeValue((prev=>prev+1))
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
            justifyContent: "space-between",
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

          <div style={{ marginLeft: "6px",width:"80%" }}>
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
              <IonText style={{ fontSize: "12px" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum commodi laboriosam excepturi porro dolor! Distinctio velit dignissimos similique deleniti ea, qui perspiciatis a voluptatum consequatur quasi at sint asperiores voluptas!
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
            onClick={handelLike} 
            style={{margin:"5px 7px 0px",fontSize:"26px",color:"crimson"}} 
            icon={isLiked ? heart : heartOutline} 
            color={isLiked ? 'danger' : 'dark'}
            className={isLiked ? 'heart-icon liked' : 'heart-icon'}
            >

            </IonIcon>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <IonText style={{fontSize:"14px"}}>{LikeValue}</IonText>
            </div>
            
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CommentCard;
