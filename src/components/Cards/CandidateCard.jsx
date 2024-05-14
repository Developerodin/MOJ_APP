import { IonCard, IonCardContent, IonIcon, IonToggle } from '@ionic/react'
import { bookmark, locationOutline } from 'ionicons/icons'
import React from 'react'
import book from "/assets/reward1.png";

export const CandidateCard = () => {
  return (
    <div style={{width:"100%"}}>
    <IonCard  style={{padding:"0px",border:"1px solid #E4E4E4",borderRadius:"15px",background:"#f2f4fe",margin:0}} >
        <IonCardContent style={{padding:"10px"}}>
          
          <div>
            
    
            <div>
              <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>Dayal Jat</span>
            </div>
    
            <div style={{marginTop:"20px"}}>
              <div>
                <span style={{fontSize:"16px",color:"black"}}>Department</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
                <div style={{padding:"5px",border:"1px solid blue",borderRadius:"10px"}}>
                    <span style={{fontSize:"12px"}}>Front Office Executive</span>
                </div>

                <div style={{padding:"5px",border:"1px solid blue",borderRadius:"10px"}}>
                    <span style={{fontSize:"12px"}}>Receptionist</span>
                </div>


                <div style={{padding:"5px",border:"1px solid blue",borderRadius:"10px"}}>
                    <span style={{fontSize:"12px"}}>Purchase Incharge</span>
                </div>
              </div>
             
            </div>
    
            <div style={{marginTop:"20px"}}>
              <div>
                <span style={{fontSize:"16px",color:"black"}}>City</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
                <div style={{padding:"5px",border:"1px solid blue",borderRadius:"10px"}}>
                    <span style={{fontSize:"12px"}}>Rajkot</span>
                </div>

                <div style={{padding:"5px",border:"1px solid blue",borderRadius:"10px"}}>
                    <span style={{fontSize:"12px"}}>Jaipur</span>
                </div>


                <div style={{padding:"5px",border:"1px solid blue",borderRadius:"10px"}}>
                    <span style={{fontSize:"12px"}}>Ajmer</span>
                </div>
              </div>
             
            </div>

            <div style={{marginTop:"20px"}}>
              <div>
                <span style={{fontSize:"16px",color:"black"}}>Experience</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
                <div style={{padding:"5px",border:"1px solid blue",borderRadius:"10px"}}>
                    <span style={{fontSize:"12px"}}>experienced</span>
                </div>

                
              </div>
             
            </div>
          </div>
            
            <div style={{position:"absolute",top:20,right:20}}>
            <img src={book} style={{width:"50px",height:"50px",borderRadius:"100px",border:"1px solid grey"}} />
            </div>
    
    
         
         
        </IonCardContent>
      </IonCard>
        </div>
  )
}
