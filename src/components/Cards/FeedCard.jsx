import React, { useContext, useEffect, useRef, useState } from 'react'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonText ,IonActionSheet, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent} from '@ionic/react';
import { heartOutline,paperPlaneOutline,chatbubbleOutline,ellipsisVertical,bookmarkOutline,heart,bookmark, arrowBack} from 'ionicons/icons';
import { useHistory } from 'react-router';
import { AppContext } from '../../Context/AppContext';
import "./FeedCard.css";
import CommentCard from './CommentCard';
const FeedCard = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [LikeValue, setLikeValue] = useState(39);

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [CommentData, setCommentData] = useState([{},{}]);
const history=useHistory();
  const {Data}=props;


  const handelOptions=()=>{
    console.log("option on post of",Data.name);
  }

    const handelLike=()=>{
        console.log("like post of",Data.name);
        setIsLiked(!isLiked);
        setLikeValue((prev=>prev+1))
    }

    const handelComment=()=>{
      console.log("comment on post of",Data.name);
      setIsCommentOpen(true);
    }



    const handelSend=()=>{
      console.log("Send post of",Data.name);
    }


    const handelSave=()=>{
      console.log("Save post of",Data.name);
      setIsSave(!isSave);
    }


const handelSelctedUser=(e)=>{
  history.push(`/othersprofile/${Data.id}`)
  
}




  return (
    <>
    <div style={{padding:"0px",margin:"0px 0px 20px",borderRadius:"10px"}}>
     
      <div style={{ display:"flex",justifyContent:"space-between",padding:"10px"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>


        <div style={{width:"50px", height:"50px"}}>
        <img src={Data.userImg} 
        alt='user Image' style={{ width:"100%",height:"100%",borderRadius:"100px"}}/>
        </div>
        
        <div style={{marginLeft:"6px"}}>
            <div>
            <IonText onClick={handelSelctedUser} style={{fontSize:"14px",fontWeight:"bold"}}>{Data.name}</IonText>
            </div>
            <div>
                <IonText style={{fontSize:"11px",color:"grey"}}>Jaipur</IonText>
            </div>
        
        </div>
        
        </div>

        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div>
            <IonIcon onClick={handelOptions} style={{margin:"5px 3px 0px"}} icon={ellipsisVertical} size="small" color="dark"></IonIcon>
            </div>
            {/* <div>
            <IonText style={{fontSize:"12px"}}>1,783 Likes</IonText>
            </div> */}
        
        
        </div>
       
       
      </div>


      

        <div >
        <div style={{aspectRatio:"4/3",width:"100%"}}>
         <img  style={{width:"100%",height:"100%"}} alt={Data.title} src={Data.img} />
        </div>
        
      </div>
     

      <div style={{display:"flex",justifyContent:"space-between",padding:"0px 7px",marginBottom:"5px"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        
            <IonIcon 
            onClick={handelLike} 
            style={{margin:"5px 7px 0px",fontSize:"26px",color:"crimson"}} 
            icon={isLiked ? heart : heartOutline} 
            color={isLiked ? 'danger' : 'dark'}
            className={isLiked ? 'heart-icon liked' : 'heart-icon'}
            >

            </IonIcon>
            {/* <IonText style={{fontSize:"10px",marginTop:"5px"}}>927 comments</IonText> */}
            <IonIcon onClick={handelComment}  style={{margin:"5px 7px 0px",fontSize:"26px",transform: "rotate(280deg)"}} icon={chatbubbleOutline}  color="dark"></IonIcon>
            <IonIcon onClick={handelSend} style={{margin:"5px 7px 0px",fontSize:"26px"}} icon={paperPlaneOutline}  color="dark"></IonIcon>
           
        </div>
        <div >
        <IonIcon onClick={handelSave} style={{margin:"5px 3px 0px",fontSize:"26px"}}  
        icon={isSave ? bookmark : bookmarkOutline} 
         color="dark"
         className={isSave ? 'heart-icon liked' : 'heart-icon'}
         >

         </IonIcon>
        </div>
      </div>
 


      <div style={{margin:"0px 5px",padding:"0px 10px",fontSize:"12px",fontWeight:"600"}}>
        <div style={{marginBottom:"5px"}}>
        <span style={{fontSize:"13px"}}>{LikeValue} likes</span>
        </div>
       
       
       
        <div style={{fontWeight:"400",display:"inherit",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}>
        <span style={{fontWeight:"600"}}>{Data.name} </span>
        <span >
         Here's a small text description for the card content. Nothing more, nothing less.
         Here's a small text description for the card content. Nothing more, nothing less.
         Here's a small text description for the card content. Nothing more, nothing less.
         Here's a small text description for the card content. Nothing more, nothing less.
        </span>
        </div>
         
        
       
        </div>

        <div style={{margin:"3px 5px",padding:"0px 10px",fontSize:"12px",fontWeight:"600",color:"grey"}}>
          <div>
          <span>View all 3 comments</span>
          </div>


          <div style={{display:"flex",justifyContent:"start",alignItems:"center",marginTop:"10px"}}>
          <div style={{width:"30px", height:"30px",marginLeft:"-2px"}}>
        <img src={Data.userImg} 
        alt='user Image' style={{ width:"100%",height:"100%",borderRadius:"100px"}}/>
        </div>
            <div style={{marginLeft:"10px"}}>
              <span>Add a comment..</span>
            </div>
          </div>

          <div style={{marginTop:"5px"}}>
            <span>2 days ago</span>
          </div>
        </div>

       
     
       <IonModal
      isOpen={isCommentOpen}
      onDidDismiss={() => setIsCommentOpen(false)}
      style={{height:"70vh",marginTop:"30vh"}}
      
      
    >
      <IonHeader>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"10px"}}>
              <div style={{display:"flex",width:"50%",justifyContent:"space-around",alignItems:"center"}}>
                <div>
                  <IonIcon icon={arrowBack} onClick={() => setIsCommentOpen(false)} color="dark" style={{marginTop:"5px",fontSize:"26px"}}></IonIcon>
                </div>
                <div style={{fontSize:"22px",fontWeight:"600"}}>Comments</div>
              </div>

              <div>
              <IonIcon  style={{margin:"6px 10px 0px",fontSize:"26px"}} icon={paperPlaneOutline}  color="dark"></IonIcon>
              </div>
            </div>
          </IonHeader>
      {/* Your modal content here */}
<IonContent style={{border:"1px solid red"}}>

  <div style={{borderBottom:"1px dashed grey"}}>
  <div style={{display:"flex",margin:"30px 3px",justifyContent:"space-around"}}>
     
     <div style={{display:"flex",justifyContent:"start"}}>
         <div style={{width:"40px", height:"40px",margin:"5px 8px"}}>
       <img src={Data.userImg} 
       alt='user Image' style={{ width:"100%",height:"100%",borderRadius:"100px"}}/>
       </div>
       </div>

       <div style={{fontWeight:"400",width:"80%"}} >
       <span style={{fontWeight:"600"}}>{Data.name} </span><br/>
       <span style={{fontSize:"15px"}} >
        Here's a small text description for the card content. Nothing more, nothing less.
        Here's a small text description for the card content. Nothing more, nothing less.
        Here's a small text description for the card content. Nothing more, nothing less.
        Here's a small text description for the card content. Nothing more, nothing less.
       </span>
       </div>
  
 
   </div>
  </div>

{CommentData.map((el)=>{
  return (
    <div>
          <CommentCard Data={Data}/>
    </div>

  )
})}
  
</IonContent>

    </IonModal>
    
    
     

    </div>
    </>
  )
}

export default FeedCard
