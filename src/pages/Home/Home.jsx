import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonRouter, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
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
// import { StatusBar } from '@capacitor/status-bar';
export const Home = () => {
  const history = useIonRouter();

  const [backPressCount, setBackPressCount] = useState(0);
  const [profilePic,setProfilePic] = useState(null);
  const handelJobCardClick = (id)=>{
    history.push(`/job-details/${id}`)
  }

  const handelProfileClick= () =>{
    history.push("/app/profile")
  }

  const outerRout = ()=>{
    history.push('/job-details/1')
  }
  useEffect(()=>{
    let image = localStorage.getItem("dp-img") || null
    if(image){
      setProfilePic(image);
    }
    // else{
    //   setProfilePic(image);
    // }
},[])
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
    <IonPage>
        <IonContent >

<div style={{padding:"20px"}}>
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
          <div>
          <span style={{fontSize:"26px",fontWeight:"bold"}}>Offers</span> 

          <div style={{position:"relative"}}>
          <div style={{textAlign:"center",marginTop:"20px"}}>
               <img
            src={frame}
            alt="Globe Icon"
            style={{
             width:"100%"
            }}
          />
           <div style={{position:"absolute",left:0,top:-10}}>
               <img
            src={wm}
            alt="Globe Icon"
            style={{
             
            }}
          />
               </div>
               </div>
              
          </div>
               
          </div>
           
          </div>

          <div style={{marginTop:"20px"}}>
            <span style={{fontSize:"26px",fontWeight:"bold"}}>Featured jobs</span> 
            <br/>
            {/* <span style={{color:"grey",fontSize:"12px"}}>Showing results based on your added preference</span> */}
          </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px",flexDirection:"column",gap:"20px"}}>
               
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
            
            <JobCard  fun={handelJobCardClick}/>

            <JobCard fun={handelJobCardClick} />

            <JobCard fun={handelJobCardClick} />

            <JobCard  fun={handelJobCardClick}/>

            <JobCard fun={handelJobCardClick} />





          

          </div>

</div>
      
          
       
        </IonContent>
       </IonPage>
  )
}
