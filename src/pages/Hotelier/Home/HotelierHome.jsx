import { IonCard, IonCardContent, IonContent, IonPage, useIonRouter } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import ban1 from "/assets/HAJ.png";
import ban2 from "/assets/HAPJ.png";
import ban3 from "/assets/HCAAPJ.png";
import ban4 from "/assets/HIAJ.webp";
import ban5 from "/assets/HIC.webp";
import equalizer from "./equalizer.png";
import profileImg from "./profileImg2.png"
import { isMobile } from '../../../IsMobile/IsMobile';
import { Base_url } from '../../../Config/BaseUrl';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';
export const HotelierHome = () => {
  const history = useIonRouter();
  const { showToast,jobUpdate,setJobUpdate,editUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [activeJobs,setActiveJobs] = useState(0);
  const [InactiveJobs,setInActiveJobs] = useState(0);
  const [profilePic,setProfilePic] = useState(null);
  const getJobs = async () => {
    try {
      const url = `${Base_url}job/Byuserid/${userDetails.user_id}`;
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('resume', selectedFile);

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;
      console.log("Response check work experience", data, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data.status === "success") {
        //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
        // setUpdate((prev)=>prev+1);
        console.log("Job DAta ==>",data.Job)
        const filterData1 = data.Job.filter((el,index)=>el.status === "1")
        const filterData2 = data.Job.filter((el,index)=>el.status === "0")
        // const Data = data.img;
        setActiveJobs(filterData1);
        setInActiveJobs(filterData2)
        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };
  const handelCardClick = (route)=>{
       history.push(route);
  }

  const getProfileImg = async () => {
    try {
      const url = `${Base_url}profile_img_saved/Byuserid/${userDetails.user_id}`;
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('resume', selectedFile);

    

      const response = await axios.post(url,formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          console.log("Response check work experience",data,response)
          
            // if(data === "otp in valid"){
            //   showToast("error", "wrong otp", "");
            //   return;
            // }

          if(data.status === "success"){
              //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
              // setUpdate((prev)=>prev+1);
             const Data = data.img;
             setProfilePic(Data.image_path)
           
              return
            
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelProfileClick= () =>{
    history.push("/app/profile")
  }


  useEffect(()=>{
    getJobs()
  },[jobUpdate])

  useEffect(()=>{
    getProfileImg()
},[editUpdate])

  return (
   <IonPage>
    <IonContent>
       <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
            
       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
       <div onClick={handelProfileClick} style={{position:"relative"}} >
           <div >
              <img 
              src={profilePic || profileImg}
              style={{width:"62px",height:"62px",border:"2px solid #F0F3FF",borderRadius:"40px"}}
              />
           </div>
           <div style={{position:"absolute",bottom:-5,left:"50%", transform: "translateX(-50%)"}}>
            <span style={{fontSize:"12px",color:"#fff",fontWeight:"bold",padding:"5px 10px",background:"#51B248",borderRadius:"17px"}}>Available</span>
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
                     <span style={{fontSize:"40px",fontWeight:"bold",color:"black"}}>{activeJobs && activeJobs.length}</span>
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
                     <span style={{fontSize:"40px",fontWeight:"bold",color:"black"}}>{InactiveJobs && InactiveJobs.length}</span>
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
