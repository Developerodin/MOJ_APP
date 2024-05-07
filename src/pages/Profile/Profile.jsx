
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
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';

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
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [basicData,setBasicData] = useState(null);
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

  const handelProfileHealthClick = ()=>{
    history.push("/profile-health")
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

  const getWebBasic = async () => {
    try {
      const url = `${Base_url}basic/web`;
      
    

      const response = await axios.get(url,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          // console.log("Response check work experience data",data,response)
          
            if(data){
              console.log("Basic data",data.post)
              setBasicData(data.post[0]);
            }

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  };

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

  useEffect(()=>{
    getWebBasic();
  },[])


  useEffect(() => {
    const interval = setInterval(() => {
      if (completionPercentage < 75) {
        setCompletionPercentage(completionPercentage + 1);
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [completionPercentage]);

  const width = 100;
  const height = 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 6;
  const offset = ((100 - completionPercentage) / 100) * circumference;


  useEffect(()=>{
    getProfileImg()
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

<div onClick={handelProfileHealthClick} style={{marginTop:"30px"}}>
<div style={{background:"#ffffff",padding:"10px",border:"1px solid #E2E8F0",borderRadius:"16px",display:"flex",justifyContent:"left",alignItems:"center"}}>
       <div>
       <div className="profile-progress">
      <svg width={width} height={height}>
        <circle
          r={radius}
          cx={width / 2}
          cy={height / 2}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        <circle
          r={radius}
          cx={width / 2}
          cy={height / 2}
          fill="none"
          stroke="#51B248"
          strokeWidth={strokeWidth}
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
          


           <ContactUsModel  showModal={contactUsModel} setShowModal={setContatUsModel} data={basicData}/>
        </div>
    </IonContent>
   </IonPage>
  )
}
