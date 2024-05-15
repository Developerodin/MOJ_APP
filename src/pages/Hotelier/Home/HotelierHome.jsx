import { IonCard, IonCardContent, IonContent, IonPage, useIonRouter } from '@ionic/react'
import React from 'react'
import ban1 from "/assets/HAJ.png";
import ban2 from "/assets/HAPJ.png";
import ban3 from "/assets/HCAAPJ.png";
import ban4 from "/assets/HIAJ.webp";
import ban5 from "/assets/HIC.webp";
import equalizer from "./equalizer.png";
import profileImg from "./profileImg2.png"
export const HotelierHome = () => {
  const history = useIonRouter();

  const handelCardClick = (route)=>{
       history.push(route);
  }
  return (
   <IonPage>
    <IonContent>
       <div style={{padding:"20px"}}>
            
       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
     <div style={{position:"relative"}} >
           <div >
              <img 
              src={profileImg}
              style={{width:"52px",height:"52px",border:"2px solid #F0F3FF",borderRadius:"40px"}}
              />
           </div>
           <div style={{position:"absolute",bottom:-5,left:"50%", transform: "translateX(-50%)"}}>
            <span style={{fontSize:"12px",color:"#fff",fontWeight:"bold",padding:"5px 10px",background:"#51B248",borderRadius:"17px"}}>Aman</span>
           </div>
     </div>

     <div>
          <img src={equalizer} />
     </div>
  </div>

          <div onClick={()=>handelCardClick("/active-jobs")}   style={{marginTop:"30px"}}>
             
             <IonCard style={{
           padding: "10px",
           border: "1px solid #E4E4E4",
           borderRadius: "20px",
           margin: 0,
           background: "linear-gradient(to bottom, #EEF7FF, #A0DEFF)",
           height:"120px",
           boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",

        
         }}>
           <IonCardContent style={{ padding: "10px" }}>
               <div >
                 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                   <div>
                     <span style={{fontSize:"30px",fontWeight:"bold",color:"#03AED2"}}>2</span>
                     <p style={{fontWeight:"bold",fontSize:"18px"}}>Active Jobs</p>
                   </div>
   
                   <div>
                     <img src={ban1} style={{height:"80px",width:"80px"}}/>
                   </div>
                 </div>
   
            
               </div>
   
             </IonCardContent>
   
          
   
           </IonCard>
             </div>

          <div onClick={()=>handelCardClick("/inactive-jobs")} style={{marginTop:"30px"}}>
             
          <IonCard style={{
        padding: "10px",
        border: "1px solid #E4E4E4",
        borderRadius: "20px",
        margin: 0,
        background: "linear-gradient(to bottom, #EEF7FF, #A0DEFF)",
        height:"120px", 
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}>
        <IonCardContent style={{ padding: "10px" }}>
            <div >
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <span style={{fontSize:"30px",fontWeight:"bold",color:"#03AED2"}}>0</span>
                  <p style={{fontWeight:"bold",fontSize:"18px"}}>Inactive Jobs</p>
                </div>

                <div>
                  <img src={ban2} style={{height:"80px",width:"80px"}}/>
                </div>
              </div>

         
            </div>

          </IonCardContent>

       

        </IonCard>
          </div>

          <div onClick={()=>handelCardClick("/candidate-applied-jobs")} style={{marginTop:"20px"}}>
             
          <IonCard style={{
        padding: "10px",
        border: "1px solid #E4E4E4",
        borderRadius: "20px",
        margin: 0,
        background: "linear-gradient(to bottom, #EEF7FF, #A0DEFF)",
        height:"120px",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}>
        <IonCardContent style={{ padding: "10px" }}>
            <div >
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <span style={{fontSize:"30px",fontWeight:"bold",color:"#03AED2"}}>4</span>
                  <p style={{fontWeight:"bold",fontSize:"18px"}}>Candidates Applied Jobs</p>
                </div>

                <div>
                  <img src={ban3} style={{height:"80px",width:"80px"}}/>
                </div>
              </div>

         
            </div>

          </IonCardContent>

       

        </IonCard>
          </div>


          <div onClick={()=>handelCardClick("/interested-candidates")} style={{marginTop:"20px"}}>
             
          <IonCard style={{
        padding: "10px",
        border: "1px solid #E4E4E4",
        borderRadius: "20px",
        margin: 0,
        background: "linear-gradient(to bottom, #EEF7FF, #A0DEFF)",
        height:"120px",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}>
        <IonCardContent style={{ padding: "10px" }}>
            <div >
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  {/* <span style={{fontSize:"30px",fontWeight:"bold",color:"#03AED2"}}>2</span> */}
                  <p style={{fontWeight:"bold",fontSize:"18px"}}>Interested Candidates</p>
                </div>

                <div>
                  <img src={ban4} style={{height:"80px",width:"80px"}}/>
                </div>
              </div>

         
            </div>

          </IonCardContent>

       

        </IonCard>
          </div>

          <div onClick={()=>handelCardClick("/candidate-search")} style={{marginTop:"20px"}}>
             
          <IonCard style={{
        padding: "10px",
        border: "1px solid #E4E4E4",
        borderRadius: "20px",
        margin: 0,
        background: "linear-gradient(to bottom, #EEF7FF, #A0DEFF)",
        height:"120px",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}>
        <IonCardContent style={{ padding: "10px" }}>
            <div >
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  {/* <span style={{fontSize:"30px",fontWeight:"bold",color:"#03AED2"}}>2</span> */}
                  <p style={{fontWeight:"bold",fontSize:"18px"}}>Candidate search</p>
                </div>

                <div>
                  <img src={ban5} style={{height:"80px",width:"80px"}}/>
                </div>
              </div>

         
            </div>

          </IonCardContent>

       

        </IonCard>
          </div>

       </div>
    </IonContent>
   </IonPage>
  )
}
