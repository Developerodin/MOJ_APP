import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonPage, IonRow, IonText, useIonRouter } from '@ionic/react'
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
          
     </div>

     <div>
          <img src={equalizer} />
     </div>
  </div>

<div style={{marginTop:"20px"}}>

<IonGrid  style={{margin:0,padding:0}}>
    <IonRow  style={{margin:0,padding:0}}>
    <IonCol size="12"  style={{margin:0,padding:0}}>
       <div>
        <IonText style={{fontWeight:"bold",fontSize:"25px"}}>Dashboard</IonText>
       </div>
      </IonCol>

      <IonCol size="12" size-md="6"  style={{marginTop:20,padding:0}}>
      <div onClick={()=>handelCardClick("/app/post-job")}>
             
             <div style={{
           position:"relative",
           backgroundImage: 'url(./assets/Dcard1.png)',
           backgroundSize: 'cover', // This ensures the image covers the entire Box
           backgroundPosition: 'center',
           borderRadius:"10px"
        
         }}>
           <div style={{padding:"15px"}}>
               <div>
                 <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                   <div>
                     
                     <div style={{marginTop:"6px"}} >
                     <span style={{fontSize:"16px",color:"#fff"}}>Active Jobs</span>
                     </div>
                     <div style={{marginTop:"10px"}}>
                     <span style={{fontSize:"24px",fontWeight:"bold",color:"#fff"}}>{activeJobs && activeJobs.length}</span>
                     </div>

                     <div style={{marginTop:"10px"}}>
                     <span style={{fontSize:"13px",color:"#fff"}}>Click to view your active / inactive jobs</span>
                     </div>
                     
                   </div>
   
                 
             
                 </div>
   
            
               </div>
   
             </div>
   
          
   
           </div>
             </div>
      </IonCol>

      <IonCol size="12" size-md="6" style={{marginTop:20,padding:0}}>
      <div onClick={()=>handelCardClick("/app/applied-jobs")}>
             
             <div style={{
           position:"relative",
           backgroundImage: 'url(./assets/Dcard2.png)',
           backgroundSize: 'cover', // This ensures the image covers the entire Box
           backgroundPosition: 'center',
           borderRadius:"10px"
        
         }}>
           <div style={{padding:"15px"}}>
               <div>
                 <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                   <div>
                     
                     <div style={{marginTop:"6px"}} >
                     <span style={{fontSize:"16px",color:"#fff"}}>Job Applicants</span>
                     </div>
                     <div style={{marginTop:"10px"}}>
                     <span style={{fontSize:"24px",fontWeight:"bold",color:"#fff"}}>193</span>
                     </div>

                     <div style={{marginTop:"10px"}}>
                     <span style={{fontSize:"13px",color:"#fff"}}>Click to view your job applicants</span>
                     </div>
                     
                   </div>
   
                 
             
                 </div>
   
            
               </div>
   
             </div>
   
          
   
           </div>
             </div>
      </IonCol>

      <IonCol size="12" style={{marginTop:20,padding:0}}>
      <div >
      {/* onClick={()=>handelCardClick("/candidate-applied-jobs")} */}
             <div style={{
          
           border:"1px solid #BDBDBD",
          
           borderRadius:"15px"
           ,position:"relative",
            height:"200px",
         }}>
           <div style={{padding:"15px" }}>
               <div>
                <span style={{fontWeight:"bold",fontSize:"18px"}}>Candidates <br/> Applied</span>
               </div>

               <div style={{position:"absolute",left:20,bottom:"20px"}}>
                  <span style={{textDecoration:"underline"}}>Show more</span>
               </div>

               <div style={{position:"absolute",top:20,right:20}}>
                  <div>
                  <img src='./assets/Dimg3.png'   />
                  </div>
               </div>
    
             </div>
   
          
   
           </div>
             </div>
      </IonCol>

      <IonCol size='6.6' size-md="6" style={{marginTop:20,padding:0}}>
      <div >
      {/* onClick={()=>handelCardClick("/interested-candidates")} */}
             <div style={{
           position:"relative",
           background:"#BD7BFF",
           height:"150px",
           borderRadius:"15px",
             border:"1px solid #BD7BFF"
         }}>
           <div >
              <div style={{textAlign:"center",marginTop:"10px"}}>
                <span style={{color:"#fff",fontSize:"18px",fontWeight:"bold"}}>Interested</span>
                <div style={{marginTop:"5px"}}>
                <span style={{color:"#571599",fontSize:"18px",fontWeight:"bold"}}>Candidates</span>
                </div>
                
              </div>
   
             </div>

             <div style={{position:"absolute",bottom:-3,width:"100%",textAlign:"center"}}>
              <div>
              <img src='./assets/Dimg1.png'   />
              </div>
             
             </div>
   
          
   
           </div>
             </div>
      </IonCol>

      <IonCol size="5" size-md="5.9" style={{marginTop:20,padding:0,marginLeft:"10px"}}>
      <div >
      {/* onClick={()=>handelCardClick("/candidate-search")} */}
             <div style={{
           position:"relative",
           background:"#F75C5C",
           height:"150px",
           borderRadius:"15px",
             border:"1px solid #F75C5C"
         }}>
           <div >
              <div style={{textAlign:"left",marginTop:"10px",marginLeft:"10px"}}>
                <span style={{color:"#fff",fontSize:"18px",fontWeight:"bold"}}>Candidate</span>
                <div style={{marginTop:"5px"}}>
                <span style={{color:"#fff",fontSize:"17px",fontWeight:"bold"}}>
                  Search
                </span>
                </div>
                
              </div>
   
             </div>

             <div style={{position:"absolute",bottom:-3,width:"100%",textAlign:"right"}}>
              <div>
              <img src='./assets/Dimg2.png'   />
              </div>
             
             </div>
   
          
   
           </div>
             </div>
      </IonCol>


    </IonRow>
  </IonGrid>

</div>
  

         

      

          {/* <div onClick={()=>handelCardClick("/candidate-applied-jobs")} style={{marginTop:"20px"}}>
             
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
   
                   <div style={{position:"absolute",bottom:0,right:0,width:"100px",height:"100px",background:"#395CFF",borderTopLeftRadius:"100px"}}>

                   </div>

                   <div style={{position:"absolute",bottom:30,right:30,width:"80px",height:"80px",background:"#C8D2FF",borderRadius:"100px"}}>
                  
</div>
                 </div>
   
            
               </div>
   
             </IonCardContent>
   
          
   
           </IonCard>
          </div> */}


       </div>
    </IonContent>
   </IonPage>
  )
}
