import { IonIcon } from '@ionic/react'
import { bagHandleOutline, chevronBackOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router'

export const ProfileHeaders = ({icon,title}) => {
    const history = useHistory();

    const handelBackClick= ()=>{
      history.replace('/profile');
        console.log("Back Presss")
    }
  return (
    <div>
         
         <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
         
         <div style={{marginTop:"30px",display:"flex",justifyContent:"left",alignItems:"center"}}>
               
               <div>
                {icon}
               </div>

               <div style={{marginLeft:"20px"}}>
                <span style={{fontSize:"30px",fontWeight:"bold"}}>{title}</span>
               </div>
         </div>

    </div>
  )
}
