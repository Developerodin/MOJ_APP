import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonRouter, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline,searchOutline, closeOutline} from 'ionicons/icons';
import './Home.css';
import { JobCard } from '../../components/Cards/JobCard/JobCard';

import wm from "./wm.png"
import frame from "./Frame1.png"
import noOffer from "/assets/noOffer.png";
import NoJobs from "/assets/home1.png";
import equilizer from "./equalizer.png"
import { useHistory } from 'react-router';
import { App as MainApp } from "@capacitor/app";
import profileImg from "./profileImg2.png"
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { isMobile } from '../../IsMobile/IsMobile';
// import { StatusBar } from '@capacitor/status-bar';
export const Home = () => {
  const history = useIonRouter();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const {editUpdate,jobUpdate,setJobUpdate} = useContext(AppContext)
  const [backPressCount, setBackPressCount] = useState(0);
  const [profilePic,setProfilePic] = useState(null);
  const [jobData,setJobData] = useState([]);
  const handelJobCardClick = (id)=>{
    history.push(`/job-details/${id}`)
  }

  const handelProfileClick= () =>{
    history.push("/app/profile")
  }

  const outerRout = ()=>{
    history.push('/job-details/1')
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

  const getJobs = async () => {
    try {
      const url = `${Base_url}job`;
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('resume', selectedFile);

      const response = await axios.get(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data = response.data;
      console.log("Response check Job data", data, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data.status === "success") {
        //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
        // setUpdate((prev)=>prev+1);
        console.log("Job DAta ==>",data.post)
        // const Data = data.img;
        setJobData(data.post);

        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };


  useEffect(()=>{
    getJobs();
  },[jobUpdate])


  useEffect(()=>{
    getProfileImg()
},[editUpdate])
  useEffect(() => {
    const backButtonHandler = async () => {
      console.log("Back Press ==>")
      if (backPressCount < 1) {
        console.log("Back Press ==> 1")
        setBackPressCount(1);
        setTimeout(() => {
          setBackPressCount(0);
          console.log("Back Press ==> 0")
        }, 2000); // Reset the counter after 2 seconds
      } else {
        console.log("Back Press ==> exit app")
        await MainApp.exitApp(); // Exit the app using the App plugin
      }
    };

    MainApp.addListener("backButton", backButtonHandler);

    return () => {
      MainApp.removeAllListeners("backButton");
    };
  }, [backPressCount]);

  // useEffect(()=>{
  //   StatusBar.setBackgroundColor({ color: '#FFFFFF' });
  //   StatusBar.setStyle({ style: 'dark' });
  // },[])
  return (
    <IonPage >
        <IonContent >

<div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
{/* <IonButton onClick={outerRout}  expand='full'>
  Go job details
</IonButton> */}
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
          <img src={equilizer} />
     </div>
  </div>

  <div style={{marginTop:"30px"}}>
  <div style={{padding:"10px",display:"flex",justifyContent:"left",alignItems:"left",border:"1px solid #E5E5E5",background:"#F4F4F4",height:"48px",borderRadius:"50px"}}>
    <div >
     <IonIcon icon={searchOutline}  style={{fontSize:"24px"}}/> 
    </div>
    <div style={{marginLeft:"10px"}}>
                <input 
                    type="text" 
                    placeholder="eg.cook, f&b..."
                    style={{border: "none", outline: "none", background: "transparent", width: "100%", height: "100%", fontSize: "16px"}} 
                />
            </div>
  </div>


  </div>
        <div  style={{marginTop:"20px"}}>
          <div >
          <span style={{fontSize:"26px",fontWeight:"bold"}}>Offers</span> 
             
             <IonGrid>
              <IonRow>
                <IonCol size="12" size-md="6" >
                <div style={{width:`100%`}}>
          <div style={{position:"relative",textAlign:"center",marginTop:"20px"}}>
               <img
            src={frame}
            alt="Globe Icon"
            style={{
             width:"100%"
            }}
          />
           <div style={{ 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  position: "absolute", 
  top: 0, 
  left: 0, 
  // right: 0, 
  bottom: 0 
}}>
               <img
            src={wm}
            alt="Globe Icon"
            style={{
              height:"100%",
              width:"100%"
            }}
          />
               </div>
               </div>
              
          </div>
                </IonCol>

{
  
  !isMobile &&  <IonCol size="12" size-md="6" >
  <div style={{width:`100%`}}>
<div style={{position:"relative",textAlign:"center",marginTop:"20px"}}>
 <img
src={frame}
alt="Globe Icon"
style={{
width:"100%"
}}
/>
<div style={{ 
display: "flex", 
justifyContent: "center", 
alignItems: "center", 
position: "absolute", 
top: 0, 
left: 0, 
// right: 0, 
bottom: 0 
}}>
 <img
src={wm}
alt="Globe Icon"
style={{
height:"100%",
width:"100%"
}}
/>
 </div>
 </div>

</div>
  </IonCol>
}
               
              </IonRow>
             </IonGrid>
          


        
               
          </div>
           
          </div>

          <div style={{display:`${isMobile ? "block" : "flex"}`,justifyContent:"left",alignItems:"flex-start",flexDirection:"column",marginTop:"20px"}}>
            <span style={{fontSize:"26px",fontWeight:"bold"}}>Featured jobs</span> 
            <br/>
            {/* <span style={{color:"grey",fontSize:"12px"}}>Showing results based on your added preference</span> */}
          </div>
          <div >
               
               {/* <div>
               <img
            src={NoJobs}
            alt="Globe Icon"
            
          />
          <div style={{marginTop:"20px",textAlign:"center"}}>
          <span  style={{fontSize:"14px"}}>Oops!</span>
          </div>
          <div style={{marginTop:"5px",textAlign:"center"}}>
            <span style={{fontSize:"14px"}}>No Jobs available at the moment</span>
          </div>
               </div> */}

<IonGrid style={{padding:0,margin:0}} >
  <IonRow >
    {
      jobData.map((el,index)=>{
        return  <IonCol  size="12" size-md="6">
        <JobCard data={el}  fun={()=>handelJobCardClick(el.id)}/>
        </IonCol>
      })
    }
   

   
  </IonRow>
</IonGrid>

            
         






          

          </div>

</div>
      
          
       
        </IonContent>
       </IonPage>
  )
}
