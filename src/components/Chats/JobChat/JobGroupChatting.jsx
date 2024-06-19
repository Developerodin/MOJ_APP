import { IonContent, IonIcon, IonInput, IonItem, IonList, IonPage, IonText, useIonRouter, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import { heartOutline ,closeOutline,happyOutline,attachOutline,cameraOutline} from 'ionicons/icons'
import React, { useContext } from 'react'

import ChattingCardSender from '../Cards/ChattingCardSender'
import ChattingCardRecived from '../Cards/ChattingCardRecived'
import { useHistory, useLocation } from 'react-router'
import { AppContext } from '../../Context/AppContext'
import ChattingGroupRecivedCard from '../Cards/ChattingGroupRecivedCard'



const RecivedData=[
    {sender:"Hello, Akshay"},
    {sender:"Oh ok , I am comming"}

]

const SenderData =[
    {sender:"Hii akshay this side"},
    {sender:"Please come more closer, I can’t see you i am standing at Parking Area."}

]


const JobGroupChatting = (props) => {

const history=useIonRouter()

const{MarkerData,setTabBarVisibility,TabBarVisibility}=useContext(AppContext);
  const location = useLocation();
  const{hidetaskbar}=props;
  const path=location.pathname;
  console.log("path",TabBarVisibility);
  // setTabBarVisibility(path);

// const handelClose=()=>{
//     console.log("close trigger");
//     history.push("/chats");
// }

const handleBackButtonClick = () => {
  // Replace 'Tab2' with the appropriate route name for your tab
  history.goBack();
};

const handleHardwareBackButton = (event) => {
  event.detail.register(1, () => {
    handleBackButtonClick();
  });
};

useIonViewDidEnter(() => {
  document.addEventListener('ionBackButton', handleHardwareBackButton);

  return () => {
    document.removeEventListener('ionBackButton', handleHardwareBackButton);
  };
});

useIonViewDidLeave(() => {
  document.removeEventListener('ionBackButton', handleHardwareBackButton);
});


  return (
    <IonPage>
        <IonContent>
        <div style={{padding:"10px",position:"fixed",zIndex:"1",background:"#FFFF",width:"100%"}}>
        <div style={{ display:"flex",justifyContent:"space-between",padding:"10px"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>


        <div style={{width:"50px", height:"50px"}}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnwpS84VBiHqSIiHcVEzVJjgLiUHa1jlEP5Q&usqp=CAU" 
        alt='user Image' style={{ width:"100%",height:"100%",borderRadius:"100px"}}/>
        </div>
        
        <div style={{marginLeft:"10px"}}>
            <div>
            <IonText style={{fontSize:"14px",fontWeight:"bold"}}>Bikers Group</IonText>
            </div>
            <div>
                <IonText style={{fontSize:"11px",color:"grey"}}>12 min ago</IonText>
            </div>
        
        </div>
        
        </div>

        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div>
            <IonIcon onClick={handleBackButtonClick}  style={{margin:"5px 3px 0px"}} icon={closeOutline} size="large" color="dark"></IonIcon>
            </div>
           
        
        
        </div>
       
       
      </div>
        </div>
         
         <div style={{marginTop:"100px",marginBottom:"60px"}}>
         <ChattingCardSender Data={"Hii akshay this side"} time={"12 min ago"} />
         <ChattingGroupRecivedCard  Data={{text:"Hello, Akshay",Img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxBuXGq5Za3J_PzC4fj_ILKqPBJEdF4t0rDg&usqp=CAU"}} time={"10 min ago"}/>
         <ChattingGroupRecivedCard  Data={{text:"Hii, Bro",Img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4at46VihSGzpULI3fVMoG0JLcklvyazTUcw&usqp=CAU"}} time={"10 min ago"}/>
         <ChattingGroupRecivedCard  Data={{text:"Hey, Buddy",Img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPl2v_4St5VW8Lvp35CoAdhL23YmSaxbdh3Q&usqp=CAU"}} time={"10 min ago"}/>
         


         <ChattingCardSender Data={"Please come more closer, I can’t see you i am standing at Parking Area."} time={"8 min ago"} />
         <ChattingGroupRecivedCard  Data={{text:"Oh ok , I am comming",Img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxBuXGq5Za3J_PzC4fj_ILKqPBJEdF4t0rDg&usqp=CAU"}} time={"5 min ago"}/>
         <ChattingCardSender Data={"ok"} time={"3 seconds ago"} />
         <ChattingCardSender Data={"I am near a black car"} time={"just now"} />
         <ChattingGroupRecivedCard  Data={{text:"Ok ,Is it You with white shirt",Img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxBuXGq5Za3J_PzC4fj_ILKqPBJEdF4t0rDg&usqp=CAU"}} time={"just now"}/>

         <ChattingCardSender Data={"Hii akshay this side"} time={"12 min ago"} />
         <ChattingGroupRecivedCard Data={{text:"Hello, Akshay",Img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxBuXGq5Za3J_PzC4fj_ILKqPBJEdF4t0rDg&usqp=CAU"}} time={"10 min ago"}/>
         
         <ChattingCardSender Data={"Please come more closer, I can’t see you i am standing at Parking Area."} time={"8 min ago"} />
         <ChattingGroupRecivedCard  Data={{text:"Oh ok , I am comming",Img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxBuXGq5Za3J_PzC4fj_ILKqPBJEdF4t0rDg&usqp=CAU"}} time={"5 min ago"}/>
         <ChattingCardSender Data={"ok"} time={"3 seconds ago"} />
         <ChattingCardSender Data={"I am near a black car"} time={"just now"} />
         <ChattingGroupRecivedCard  Data={{text:"Ok ,Is it You with white shirt",Img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxBuXGq5Za3J_PzC4fj_ILKqPBJEdF4t0rDg&usqp=CAU"}} time={"just now"}/>
         <ChattingCardSender Data={"ok"} time={"3 seconds ago"} />
         </div>


         <div style={{position:"absolute",bottom:"0",width:"100%",backgroundColor:"#F6F6F6",position:"sticky",padding:"15px"}}>
            <IonList style={{borderRadius:"20px",height:"47px",display:"flex",alignItems:"center"}}>
                <IonItem style={{width:"100%"}} >
                <IonInput type='text'  placeholder='type something...'></IonInput>

            
                <IonIcon  icon={happyOutline} size='small' slot="end"></IonIcon>
                <IonIcon  icon={attachOutline} size='small' slot='end'></IonIcon>
                <IonIcon  icon={cameraOutline} size='small'  slot='end'></IonIcon>
              
                
                </IonItem>
            </IonList>
                
         </div>
         
        </IonContent>
    </IonPage>
  )
}

export default JobGroupChatting
