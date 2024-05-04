
import { IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonViewDidEnter, useIonViewDidLeave } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { heartOutline,sendOutline,chatbubbleOutline,notificationsOutline,chatbubbleEllipsesOutline,searchOutline, closeOutline, starOutline, colorFill, star, helpCircleOutline, settingsOutline, createOutline, bookmark, eye, lockClosedOutline, callOutline, bookOutline, gitPullRequestOutline, bagHandleOutline, cloudUploadOutline, shareOutline, chevronForwardOutline, headsetOutline} from 'ionicons/icons';
import cs from "./th.jpg"
import profileImg from "./profileImg2.png"
import ProfileListItem from '../../components/ProfileItem/ProfileItem';
import { useHistory } from 'react-router';
import { ResumeUplodeProfile } from '../../components/Models/ResumeUplodeProfile';

import { Share } from '@capacitor/share';
import { AppContext } from '../../Context/AppContext';
import { ContactUsModel } from '../../components/Models/ContactUsModel';

async function shareApp() {
  const { value } = await Share.canShare();
  if (value) {
    await Share.share({
      title: 'Check out this job platform!',
      text:  'Join me on this awesome job platform!',
      url: 'https://your-app-url.com',
      dialogTitle: 'Share with buddies',
    });
  } else {
    // Fallback if sharing is not supported
    console.log("Sharing not supported on this platform.");
    // You can provide alternative methods for sharing here
  }
}

export const Profile = () => {
  const history = useHistory();
  const {editUpdate,setEditUpdate} = useContext(AppContext)
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [profilePic,setProfilePic] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(75);
  const [contactUsModel,setContatUsModel] = useState(false)
  const ProfileTabs=[
    
    {icon:lockClosedOutline,title:"Personal Details",link:"/profile-personal-details",color:"#395CFF"},
    {icon:callOutline,title:"Contact Details",link:"/profile-contact-details",color:"#395CFF"},
    {icon:bookOutline,title:"Education",link:"/profile-eduction",color:"#395CFF"},
    {icon:gitPullRequestOutline,title:"Job preference",link:"/profile-job-preference",color:"#395CFF"},
    {icon:bagHandleOutline,title:"Work experience",link:"/profile-work-experience",color:"#395CFF"},
    {icon:cloudUploadOutline,title:"Resume",link:"/profile-resume",color:"#395CFF"},
  ]
  useEffect(() => {
    // Fetch completion percentage from your data source
    // For demonstration purposes, setting it statically here
    // Replace this with your actual data fetching logic
    setCompletionPercentage(75);
  }, []);

  const handelRewardClick = ()=>{
    history.push("/rewards")
  }

  const handelProfilePhotoClick = ()=>{
    history.push("/update-profile-photo")
  }

  const handelTabClick = (value)=>{
    history.push(value)
  }

  const handelContactUs = () =>{
    setContatUsModel(true);
   
  }

  const width = 54; // Width of the SVG
  const height = 54; // Height of the SVG
  const radius = 20; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - completionPercentage / 100);


  useEffect(()=>{
      let image = localStorage.getItem("dp-img") || null
      if(image){
        setProfilePic(image);
      }
      // else{
      //   setProfilePic(image);
      // }
  },[editUpdate])
  return (
   <IonPage>
    <IonContent>
        <div style={{padding:"23px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <IonIcon icon={star} style={{fontSize:"22px",color:"#ffdc64"}} />
              <span style={{fontSize:"14px",fontWeight:"bold",marginLeft:"3px",marginTop:"2px"}}>4.5</span>
              </div>

              <div>
               
               <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
               <IonIcon onClick={()=> handelTabClick("/help-and-support")} icon={helpCircleOutline} style={{fontSize:"24px",marginRight:"10px"}} />
               <IonIcon onClick={()=> handelTabClick("/settings")} icon={settingsOutline} style={{fontSize:"21px"}} />
               </div>
               
              </div>
            </div>

          <div>
          <div onClick={handelProfilePhotoClick}>
               <div style={{textAlign:"center"}}>
               
               <div style={{position:"relative"}}>
               <img
            src={profilePic || profileImg}
            alt="Globe Icon"
            style={{boxShadow: "6px 14px 28px rgba(0, 0, 255, 0.2)",border: "1px solid grey",height:"86px",width:"86px",borderRadius:"60px"}}
          />

          <div style={{display:"flex",justifyContent:"center",alignItems:"center",position:"absolute",bottom:3,left: "58%", transform: "translateX(-50%)",background:"#395CFF",width:"28px",height:"28px",borderRadius:"20px"}}>
              <IonIcon icon={createOutline} style={{color:"#fff"}} />
          </div>
               </div>
            
          <div style={{marginTop:"10px"}}>
          <span style={{fontSize:"20px",fontWeight:600}}>{userDetails && userDetails.name} { userDetails && userDetails.last_name}</span>
          </div>
                  
               </div>
            </div>

<div style={{marginTop:"30px"}}>
<div style={{background:"#ffffff",padding:"10px",border:"1px solid #E2E8F0",borderRadius:"16px",display:"flex",justifyContent:"left",alignItems:"center"}}>
       <div>
       <div className="profile-progress">
          <svg width={width} height={height}>
            <circle
              r={radius}
              cx={width / 2}
              cy={height / 2}
              fill="none"
              stroke="#51B248" // Change the color as needed
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fill="#000">
              {completionPercentage}%
            </text>
          </svg>
        </div>

       </div>

       <div style={{marginLeft:"20px"}}>
        <div>
        <span style={{fontSize:"16px",fontWeight:"bold"}}>Profile health</span>
        </div>
        <div style={{marginTop:"10px"}}>
        <span style={{color:"#575757"}}>Complete your profile</span>
        </div>
      
       </div>
</div>


<div 
onClick={handelRewardClick}
  style={{
    marginTop: '20px',
    background: `url('/assets/rewardBG.png')`, // Add your image path here
    backgroundSize: 'cover',
    padding: '15px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center'
  }}
>
      

       <div style={{marginLeft:"90px"}}>
        <div>
        <span style={{fontSize:"14px",fontWeight:"bold"}}>Points earned</span>
        </div>
        <div style={{marginTop:"5px"}}>
        <span style={{color:"#575757",fontSize:"14px"}}>470</span>
        </div>
      
       </div>
</div>
</div>


<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"20px"}}>
  <div onClick={()=>handelTabClick("/saved-jobs")} style={{borderRadius:"15px",padding:"15px",background:"#F3F5FE",display:"flex",justifyContent:"center",alignItems:"center"}}>
     
     <div>
     <IonIcon icon={bookmark} style={{fontSize:"28px",color:"#395CFF"}}/>
      </div>
    
    <div style={{marginLeft:"10px"}}>
    <span style={{fontWeight:"bold"}}>Saved Jobs</span>
    </div>
    
  </div>

  <div onClick={()=>handelTabClick("/viewed-jobs")} style={{borderRadius:"15px",padding:"15px",background:"#F3F5FE",display:"flex",justifyContent:"center",alignItems:"center"}}>
     
     <div>
     <IonIcon icon={eye} style={{fontSize:"28px",color:"#395CFF"}}/>
      </div>
    
    <div style={{marginLeft:"10px"}}>
    <span style={{fontWeight:"bold"}}>Viewed Jobs</span>
    </div>
    
  </div>
  <div>

  </div>
</div>
           

          </div>

          <div style={{marginTop:"20px"}}>

          <IonGrid>
            <IonRow>
            <IonCol size='12'>
        <IonList>
        <div style={{marginTop:"20px"}}>
               <IonItem onClick={handelContactUs}  button  style={{marginTop:"10px"}}>
                  <IonIcon icon={headsetOutline} style={{color:`#395CFF`}} slot="start"></IonIcon>
                  <IonLabel style={{fontWeight:"bold"}}>Contact us</IonLabel>
                  <IonIcon icon={chevronForwardOutline} slot="end"></IonIcon>
                </IonItem>
                </div>

                {
                  ProfileTabs.map((el,index)=>{
                    return <div key={index} style={{marginTop:"20px"}}>
                      <ProfileListItem key={index} Data={el} />
                      </div>
                  })
                }

               <div style={{marginTop:"20px"}}>
               <IonItem onClick={shareApp}  button  style={{marginTop:"10px"}}>
                  <IonIcon icon={shareOutline} style={{color:`#395CFF`}} slot="start"></IonIcon>
                  <IonLabel style={{fontWeight:"bold"}}>Invite your friend</IonLabel>
                  <IonIcon icon={chevronForwardOutline} slot="end"></IonIcon>
                </IonItem>
                </div>

              

               
        
      
        </IonList>
        </IonCol>
            </IonRow>
          </IonGrid>
          </div>
          


           <ContactUsModel  showModal={contactUsModel} setShowModal={setContatUsModel}/>
        </div>
    </IonContent>
   </IonPage>
  )
}
