import { IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline,searchOutline, closeOutline} from 'ionicons/icons';
import './Home.css';
import { JobCard } from '../../components/Cards/JobCard/JobCard';

import wm from "./wm.png"
import frame from "./Frame1.png"
import equilizer from "./equalizer.png"
import { useHistory } from 'react-router';
import { App as MainApp } from "@capacitor/app";
import { StatusBar } from '@capacitor/status-bar';
export const Home = () => {
  const history = useHistory();

  const [backPressCount, setBackPressCount] = useState(0);
  const handelJobCardClick = (id)=>{
    history.push(`/job-details/${id}`)
  }

  useEffect(() => {
    const backButtonHandler = async () => {
      if (backPressCount < 1) {
        setBackPressCount(1);
        setTimeout(() => {
          setBackPressCount(0);
        }, 2000); // Reset the counter after 2 seconds
      } else {
        await MainApp.exitApp(); // Exit the app using the App plugin
      }
    };

    MainApp.addListener("backButton", backButtonHandler);

    return () => {
      MainApp.removeAllListeners("backButton");
    };
  }, [backPressCount]);

  useEffect(()=>{
    StatusBar.setBackgroundColor({ color: '#FFFFFF' });
    StatusBar.setStyle({ style: 'dark' });
  },[])
  return (
    <IonPage>
        <IonContent >

<div style={{padding:"20px"}}>

  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
     <div style={{position:"relative"}} >
           <div>
              <img src='https://s3-alpha-sig.figma.com/img/9902/5026/ef545fce7a758188585b742e3d5aba25?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ehI78-byz55LVw0BFfbrWn~0hzVwmuo3Rt5Whglc~mK04GqzoZHVrQMFKiiwq1-I7w60clHAc-XVlxc12tbgWSh7p~obspDTtqf8B7oAOEApa52NBeFLGv1wVGhMtlH4Cz6~mQFqJ0ybDr8VT~GutxATnw2rqbqqQ~0Yqj-TD1E2QBesXAwNBT9ZEXxfZMkoaovCxtZ6b4-T1Ohta9ll1pbZow792We4w17eqFh4lpL9oJc~nD0NYqsQuJM8VJKNKlK9cLR4r7OdMllEtTImSiWrJkWYUNJx27ZW1K-gYVXiG~8qrW~0VVxqvXX7cmQEHUqnltUnDvzryL2u89rjsQ__'
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
            <span style={{color:"grey",fontSize:"12px"}}>Showing results based on your added preference</span>
          </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px",flexDirection:"column",gap:"20px"}}>
        
            
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
