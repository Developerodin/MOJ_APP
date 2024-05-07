import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagHandleOutline, checkmarkCircleOutline, closeCircleOutline, medkitOutline } from 'ionicons/icons'

export const ProfileHealth = () => {

    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          if (completionPercentage < 75) {
            setCompletionPercentage(completionPercentage + 1);
          } else {
            clearInterval(interval);
          }
        }, 20);
    
        return () => clearInterval(interval);
      }, [completionPercentage]);
    
      const width = 300;
      const height = 300;
      const radius = 80;
      const circumference = 2 * Math.PI * radius;
      const strokeWidth = 25;
      const offset = ((100 - completionPercentage) / 100) * circumference;
  return (
   <IonPage>
    <IonContent>
        <div style={{padding:"20px"}}>
        <ProfileHeaders icon={<IonIcon icon={medkitOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Profile Health"} />
         

         <div style={{marginTop:"60px"}}>
               
                <div style={{textAlign:"center"}}>
                     <span style={{fontSize:"18px",color:"grey",fontWeight:"bold"}}>Complete your profile</span>
                </div>
                
              
                <div className="profile-progress" style={{textAlign:"center"}}>
      <svg width={width} height={height}>
        <circle
          r={radius}
          cx={width / 2}
          cy={height / 2}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        <circle
          r={radius}
          cx={width / 2}
          cy={height / 2}
          fill="none"
          stroke="#51B248"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="22"  fontWeight="bold" fill="#000">
          {completionPercentage}%
        </text>
      </svg>
    </div>
    <div style={{textAlign:"center",marginTop:"-30px"}}>
                     <span style={{fontSize:"30px",color:"#51B248",fontWeight:"bold"}}>Good !</span>
                </div>
     

         </div>



         <div style={{marginTop:"60px"}}>
             
             <IonGrid>
                <IonRow >
                    <IonCol size="6">
                        
                    <div style={{position:"relative",border:"1px solid #E4E4E4",height:"120px",borderRadius:"20px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                            <IonIcon icon={checkmarkCircleOutline}  style={{fontSize:"40px",color:"#51B248"}}/>
                            <span style={{marginTop:"10px",fontSize:"13px",fontWeight:"bold"}}>Resume</span>
                            <span style={{fontSize:"13px",fontWeight:"bold"}}>Completed</span>

                            
                      </div>
                    </IonCol>

                    <IonCol size="6">
                        
                        <div style={{position:"relative",border:"1px solid #E4E4E4",height:"120px",borderRadius:"20px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                                <IonIcon icon={closeCircleOutline}  style={{fontSize:"40px",color:"crimson"}}/>
                                <span style={{marginTop:"10px",fontSize:"13px",fontWeight:"bold"}}>Education</span>
                                <span style={{fontSize:"13px",fontWeight:"bold"}}>Pending</span>
    
                                
                          </div>
                        </IonCol>
                </IonRow>
             </IonGrid>
            

         </div>
       
       
        </div>
       
    </IonContent>
   </IonPage>
  )
}
