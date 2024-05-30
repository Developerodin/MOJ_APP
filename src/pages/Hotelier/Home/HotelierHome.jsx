import { IonCard, IonCardContent, IonContent, IonPage, useIonRouter } from '@ionic/react'
import React from 'react'
import ban1 from "/assets/HAJ.png";
import ban2 from "/assets/HAPJ.png";
import ban3 from "/assets/HCAAPJ.png";
import ban4 from "/assets/HIAJ.webp";
import ban5 from "/assets/HIC.webp";
import equalizer from "./equalizer.png";
import profileImg from "./profileImg2.png"
import { isMobile } from '../../../IsMobile/IsMobile';
export const HotelierHome = () => {
  const history = useIonRouter();

  const handelCardClick = (route)=>{
       history.push(route);
  }
  return (
   <IonPage>
    <IonContent>
       <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
            
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
           position:"relative",
           border: "1px solid #395CFF",
           borderRadius: "20px",
           margin: 0,
           background: "#F3F5FE",
        
           boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"

        
         }}>
           <IonCardContent style={{ padding: "20px"}}>
               <div >
                 <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                   <div>
                     
                     <p style={{fontWeight:"bold",fontSize:"18px",color:"#395CFF"}}>Active Jobs</p>
                     <span style={{fontSize:"40px",fontWeight:"bold",color:"black"}}>2</span>
                   </div>
   
                   {/* <div>
                     <img src={ban1} style={{height:"80px",width:"80px"}}/>
                   </div> */}
                   <div style={{position:"absolute",bottom:0,right:0,width:"100px",height:"100px",background:"#395CFF",borderTopLeftRadius:"100px"}}>

                   </div>

                   <div style={{position:"absolute",bottom:30,right:30,width:"80px",height:"80px",background:"#C8D2FF",borderRadius:"100px"}}>
                   {/* <img src={ban1} style={{height:"80px",width:"80px"}}/> */}
</div>
                 </div>
   
            
               </div>
   
             </IonCardContent>
   
          
   
           </IonCard>
             </div>

          <div onClick={()=>handelCardClick("/inactive-jobs")} style={{marginTop:"30px"}}>
             
          <IonCard style={{
           position:"relative",
           border: "1px solid #395CFF",
           borderRadius: "20px",
           margin: 0,
           background: "#F3F5FE",
        
           boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",

        
         }}>
           <IonCardContent style={{ padding: "20px"}}>
               <div >
                 <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                   <div>
                     
                     <p style={{fontWeight:"bold",fontSize:"18px",color:"#395CFF"}}>Inactive Jobs</p>
                     <span style={{fontSize:"40px",fontWeight:"bold",color:"black"}}>0</span>
                   </div>
   
                   {/* <div>
                     <img src={ban1} style={{height:"80px",width:"80px"}}/>
                   </div> */}
                   <div style={{position:"absolute",bottom:0,right:0,width:"100px",height:"100px",background:"#395CFF",borderTopLeftRadius:"100px"}}>

                   </div>

                   <div style={{position:"absolute",bottom:30,right:30,width:"80px",height:"80px",background:"#C8D2FF",borderRadius:"100px"}}>
                   {/* <img src={ban1} style={{height:"80px",width:"80px"}}/> */}
</div>
                 </div>
   
            
               </div>
   
             </IonCardContent>
   
          
   
           </IonCard>
          </div>

          <div onClick={()=>handelCardClick("/candidate-applied-jobs")} style={{marginTop:"20px"}}>
             
          <IonCard style={{
           position:"relative",
           border: "1px solid #395CFF",
           borderRadius: "20px",
           margin: 0,
           background: "#F3F5FE",
        
           boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"

        
         }}>
           <IonCardContent style={{ padding: "20px"}}>
               <div >
                 <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                   <div>
                     
                     <p style={{fontWeight:"bold",fontSize:"18px",color:"#395CFF"}}>Candidates applied jobs</p>
                     <span style={{fontSize:"40px",fontWeight:"bold",color:"black"}}>1</span>
                   </div>
   
                   {/* <div>
                     <img src={ban1} style={{height:"80px",width:"80px"}}/>
                   </div> */}
                   <div style={{position:"absolute",bottom:0,right:0,width:"100px",height:"100px",background:"#395CFF",borderTopLeftRadius:"100px"}}>

                   </div>

                   <div style={{position:"absolute",bottom:30,right:30,width:"80px",height:"80px",background:"#C8D2FF",borderRadius:"100px"}}>
                   {/* <img src={ban1} style={{height:"80px",width:"80px"}}/> */}
</div>
                 </div>
   
            
               </div>
   
             </IonCardContent>
   
          
   
           </IonCard>
          </div>


          <div onClick={()=>handelCardClick("/interested-candidates")} style={{marginTop:"20px"}}>
             
          <IonCard style={{
           position:"relative",
           border: "1px solid #395CFF",
           borderRadius: "20px",
           margin: 0,
           background: "#F3F5FE",
           height:"130px",
           boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"

        
         }}>
           <IonCardContent style={{ padding: "20px"}}>
               <div >
                 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                   <div>
                     
                     <p style={{fontWeight:"bold",fontSize:"18px",color:"#395CFF"}}> Interested <br/> Candidates</p>
                     {/* <span style={{fontSize:"40px",fontWeight:"bold",color:"black"}}>1</span> */}
                   </div>
   
                   {/* <div>
                     <img src={ban1} style={{height:"80px",width:"80px"}}/>
                   </div> */}
                   {/* <div style={{position:"absolute",bottom:0,right:0,width:"100px",height:"100px",background:"#395CFF",borderTopLeftRadius:"100px"}}>

                   </div> */}

                   <div style={{width:"80px",height:"80px",background:"#395CFF",borderRadius:"100px"}}>
                   {/* <img src={ban1} style={{height:"80px",width:"80px"}}/> */}
</div>
                 </div>
   
            
               </div>
   
             </IonCardContent>
   
          
   
           </IonCard>
          </div>

          <div onClick={()=>handelCardClick("/candidate-search")} style={{marginTop:"20px"}}>
             
          <IonCard style={{
           position:"relative",
           border: "1px solid #395CFF",
           borderRadius: "20px",
           margin: 0,
           background: "#F3F5FE",
           height:"130px",
           boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"

        
         }}>
           <IonCardContent style={{ padding: "20px"}}>
               <div >
                 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                   <div>
                     
                     <p style={{fontWeight:"bold",fontSize:"18px",color:"#395CFF"}}> Candidate <br/> Search</p>
                     {/* <span style={{fontSize:"40px",fontWeight:"bold",color:"black"}}>1</span> */}
                   </div>
   
                   {/* <div>
                     <img src={ban1} style={{height:"80px",width:"80px"}}/>
                   </div> */}
                   {/* <div style={{position:"absolute",bottom:0,right:0,width:"100px",height:"100px",background:"#395CFF",borderTopLeftRadius:"100px"}}>

                   </div> */}

                   <div style={{width:"80px",height:"80px",background:"#395CFF",borderRadius:"100px"}}>
                   {/* <img src={ban1} style={{height:"80px",width:"80px"}}/> */}
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
