import { IonContent, IonIcon, IonPage } from '@ionic/react'
import { alertCircleOutline, chevronBackOutline, colorFill } from 'ionicons/icons'
import React from 'react'
import pic from "./Ellipse 1.png"
import { CustomBtn1 } from '../../../components/Buttons/CustomBtn1'
import { useHistory } from 'react-router'
export const UpdateProfilePhoto = () => {
 const history = useHistory()
    const handelSaveClick = ()=>{

    }

    const handelBackClick= ()=>{
      history.replace('/profile');
        console.log("Back Presss")
    }
  return (
          <IonPage>
            <IonContent>
                <div style={{padding:"20px"}}>
                <div>
            <IonIcon onClick={handelBackClick}  icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>

           <div style={{marginTop:"20px"}}>

            <span style={{fontSize:"30px",fontWeight:"bold"}}>Update your profile photo</span>
           </div>


           <div style={{marginTop:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}>
             <img src={pic} />

           </div>

           <div style={{marginTop:"30px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
           <div  style={{padding:"20px",border:"1px solid black",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"30px"}}>
    <span style={{fontWeight:"bold"}}>Take photo</span>
 </div>

 <div  style={{marginTop:"20px",padding:"20px",border:"1px solid black",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"30px"}}>
    <span style={{fontWeight:"bold"}}>Uplode from photos</span>
 </div>
           </div>

           <div style={{marginTop:"30px",display:"flex",justifyContent:"left",alignItems:"center"}}>
              <IonIcon  icon={alertCircleOutline} style={{fontSize:"30px",color:"grey"}}/>
           <span style={{fontSize:"14px",color:"#575757",marginLeft:"14px"}}>People with a profile photo have higher chances of getting hired.</span>
           
           </div>

           <div style={{width:"100%",position:"absolute",bottom:20,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handelSaveClick} title={"save"}/>
<div style={{marginTop:"20px"}}>
    <span style={{color:"crimson",fontSize:"16px",fontWeight:"bold"}}>Remove photo</span>
</div>
         </div>

                </div>


            </IonContent>
          </IonPage>
  )
}
