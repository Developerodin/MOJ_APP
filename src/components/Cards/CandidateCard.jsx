import { IonCard, IonCardContent, IonIcon, IonToggle } from '@ionic/react'
import { bookmark, locationOutline } from 'ionicons/icons'
import React from 'react'
import book from "/assets/reward1.png";

export const CandidateCard = () => {
  return (
    <div style={{width:"100%"}}>
    <IonCard  style={{padding:"0px",borderRadius:"10px",background:"#F3F5FE",margin:0,boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}} >
        <IonCardContent style={{padding:"20px"}}>
          
          <div>
            
    
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
            <div >
            <img src={book} style={{width:"50px",height:"50px",borderRadius:"100px",border:"1px solid grey"}} />
            </div>
            <div style={{marginLeft:"20px"}}>
            <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>Dayal Jat</span><br/>
            <span style={{color:"#395CFF"}}>3 days ago</span>
            </div>
             
            </div>
    
            <div style={{marginTop:"10px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Department</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
                <div style={{padding:"6px",border:"1px solid #395CFF",borderRadius:"18px"}}>
                    <span style={{fontSize:"13px",color:"#395CFF"}}>Front Office Executive</span>
                </div>

                <div style={{padding:"6px",border:"1px solid #395CFF",borderRadius:"18px"}}>
                    <span style={{fontSize:"13px",color:"#395CFF"}}>Receptionist</span>
                </div>

               


                <div style={{padding:"5px"}}>
                    <span style={{fontSize:"13px",color:"#395CFF"}}>+4</span>
                </div>
              </div>
             
            </div>
    
            <div style={{marginTop:"12px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>City</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
               

                <div style={{padding:"6px",border:"1px solid #395CFF",borderRadius:"18px"}}>
                    <span style={{fontSize:"13px",color:"#395CFF"}}>Rajkot</span>
                </div>

                <div style={{padding:"6px",border:"1px solid #395CFF",borderRadius:"18px"}}>
                    <span style={{fontSize:"13px",color:"#395CFF"}}>Jaipur</span>
                </div>

                <div style={{padding:"6px",border:"1px solid #395CFF",borderRadius:"18px"}}>
                    <span style={{fontSize:"13px",color:"#395CFF"}}>Ajmer</span>
                </div>

              </div>
             
            </div>

            <div style={{marginTop:"12px"}}>
              <div>
                <span style={{fontSize:"15px",color:"black",fontWeight:"bold"}}>Experience</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
              
                <div style={{padding:"6px",border:"1px solid #395CFF",borderRadius:"18px"}}>
                    <span style={{fontSize:"13px",color:"#395CFF"}}>Experienced</span>
                </div>

                
              </div>
             
            </div>
          </div>
            
            
    
    
         
         
        </IonCardContent>
      </IonCard>
        </div>
  )
}
