import { IonContent, IonIcon, IonPage } from '@ionic/react'
import { chevronBackOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Basicinfo from './Basicinfo'
import Personalinfo from './Personalinfo'
import { UplodeProfilePhoto } from './UplodeProfilePhoto'
import logo from "/assets/moj.png";
export const PersonalDetails = () => {
    const history = useHistory()
         
      const [activeTab,setActiveTab] = useState("ProfilePic")

    const handelBtnClick= ()=>{
      history.push("/info")
    }
    const handelBackClick = ()=>{
      history.goBack()
    }

    const handelTabActive = (value) =>{
        setActiveTab(value)
    }


  return (
    <IonPage>
        <IonContent>
            <div style={{padding:"20px"}}>
               
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{width:"21px",height:"7px",border:"1px solid #D9D9D9",borderRadius:"60px",background:`${activeTab === "PersonalDetails" ? "blue" : "#D9D9D9"}`}}></div>
               <div style={{marginLeft:"5px",width:"21px",height:"7px",border:"1px solid #D9D9D9",borderRadius:"60px",background:`${activeTab === "ProfilePic" ? "blue" : "#D9D9D9"}`}}></div>
              
               <div style={{marginLeft:"5px",width:"21px",height:"7px",border:"1px solid #D9D9D9",borderRadius:"60px",background:`${activeTab === "Details" ? "blue" : "#D9D9D9"}`}}></div>
            </div>

            <div >
            
            <img src={logo} style={{height:"68px",width:"92px"}}/>

            </div>
            
           </div>

           {
    activeTab === "PersonalDetails" &&
    <div style={{marginTop:"50px"}}>
    <Basicinfo handelContinue={handelTabActive} />
</div>

}
{
    activeTab === "ProfilePic" &&  <div style={{marginTop:"50px"}}>
     <UplodeProfilePhoto  handelContinue={handelTabActive} />
</div>
}
           

          
          {
            activeTab === "Details" && 
            <div style={{marginTop:"50px"}}>
               <Personalinfo handelContinue={handelTabActive} setActiveTab={setActiveTab} />
           </div>
          }

           
                    
            </div>
            
        </IonContent>
    </IonPage>
  )
}
