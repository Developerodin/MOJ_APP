import { IonButton, IonCard, IonCardContent, IonIcon, IonToggle } from '@ionic/react'
import { bookmark, bookmarkOutline, locationOutline } from 'ionicons/icons'
import React from 'react'
import book from "/assets/Ellipse1.png";

export const CandidateCard = () => {
  return (
    <div style={{width:"100%"}}>
    <IonCard  style={{padding:"0px",borderRadius:"10px",background:"#fff",margin:0,boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}} >
        <IonCardContent style={{padding:"20px"}}>
          
          <div>
            
    
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div >
            <img src={book} style={{width:"50px",height:"50px",borderRadius:"100px"}} />
            </div>
            <div style={{textAlign:"center"}}>
            <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>Dayal Jat</span><br/>
            <span style={{color:"grey",fontSize:"12px"}}>3 days ago</span>
            </div>

            <div>
            <IonIcon  icon={bookmarkOutline} style={{fontSize:"26px",marginRight:"10px"}} />
            </div>
             
            </div>
    
            <div style={{marginTop:"30px"}}>
              <div>
                <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>Department</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Front Office Executive</span>
                </div>

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Receptionist</span>
                </div>

               


                <div style={{padding:"5px"}}>
                    <span style={{fontSize:"13px",color:"#0054e9"}}>+4</span>
                </div>
              </div>
             
            </div>
    
            <div style={{marginTop:"15px"}}>
              <div>
                <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>City</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
               

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Rajkot</span>
                </div>

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Jaipur</span>
                </div>

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Ajmer</span>
                </div>

              </div>
             
            </div>

            <div style={{marginTop:"15px"}}>
              <div>
                <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>Experience</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
              
                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>Experienced</span>
                </div>

                
              </div>
             
            </div>


            <div style={{marginTop:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
               
               <IonButton size="small" shape="round" style={{width:"140px"}}>Accept</IonButton>
               <IonButton size="small" shape="round" color={"danger"} style={{width:"120px"}} fill="outline">Decline</IonButton>

            </div>
          </div>
            
            
    
    
         
         
        </IonCardContent>
      </IonCard>
        </div>
  )
}
