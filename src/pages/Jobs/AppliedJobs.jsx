import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow, useIonRouter } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'

import { chevronDownOutline, documentTextOutline } from 'ionicons/icons'

import { AppliedJobCard } from '../../components/Cards/JobCard/AppliedJobCard'
import NoAppliedJobs from "/assets/appliedJobs.png";
import { isMobile } from '../../IsMobile/IsMobile';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import { AppContext } from '../../Context/AppContext';
export const AppliedJobs = () => {
  const history = useIonRouter();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [jobData,setJobData] = useState([]);
  const [InTouch,setInTouchData] = useState([]);
  const [InReview,setInReviewData] = useState([]);
  const [NotSelected,setNotSelectedData] = useState([]);
  const [SelectedData,setSelectedData] = useState([]);
  const {languageUpdate} = useContext(AppContext)
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  useEffect(() => {
    // Code to update selectedLanguage from localStorage
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);

  const getAppliedJobs = async () => {
    try {
      const url = `${Base_url}job_apply/userByid/${userDetails.user_id}`;
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
             const Data = data.Job;
             console.log("jobs Data  ==> ",Data )

             const InTouchData = Data.filter((el)=>el.status === "In Touch")

             const InReviewData = Data.filter((el)=>el.status === "In Review")

             const NotSelectedData = Data.filter((el)=>el.status === "Not Selected")

             const SelectedData = Data.filter((el)=>el.status === "Selected")

             setInTouchData(InTouchData);
             setInReviewData(InReviewData);
             setNotSelectedData(NotSelectedData);
             setSelectedData(SelectedData);

             setJobData(Data)
             
            
              return
            
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelJobCardClick = (id)=>{
    history.push(`/job-details/${id}`)
  }

  useEffect(()=>{
    getAppliedJobs()
  },[])

  return (
<IonPage>
    <IonContent>
          <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
          <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
          <IonIcon icon={documentTextOutline} style={{fontSize:"30px"}} />
          <span style={{fontSize:"26px",fontWeight:"bold",marginLeft:"10px",marginTop:"3px"}}>
            
            { selectedLanguage === "English" ? "Applied" : "लागू नौकरियां"}
            </span>
          </div>
          
          {/* <div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img
            src={NoAppliedJobs}
            alt="Globe Icon"
          
          />
          </div> */}
          <div style={{marginTop:"60px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>
            
            { selectedLanguage === "English" ? "Selected" : "चयनित"}
            </span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>
             <div style={{marginTop:"20px"}}>
             <IonGrid>
              <IonRow>
                {
                  SelectedData.map((el,index)=>{
                    return   <IonCol  size="12" size-md="6">
                    <div >
                <AppliedJobCard data={el} fun={()=>handelJobCardClick(el.job_id)}/>
                </div>
                    </IonCol>
                  })
                }
               
              
              </IonRow>
             </IonGrid>
             </div>
             
            
          </div>

          <div style={{marginTop:"20px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>
            
            { selectedLanguage === "English" ? "In touch" : "संपर्क में"}
            </span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>
             <div style={{marginTop:"20px"}}>
             <IonGrid>
              <IonRow>
                {
                  InTouch.map((el,index)=>{
                    return   <IonCol  size="12" size-md="6">
                    <div >
                <AppliedJobCard data={el} fun={()=>handelJobCardClick(el.job_id)}/>
                </div>
                    </IonCol>
                  })
                }
               
              
              </IonRow>
             </IonGrid>
             </div>
             
            
          </div>

          <div style={{marginTop:"30px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>
            
            { selectedLanguage === "English" ? "In review" : "समीक्षा में"}
            </span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>

            <div style={{marginTop:"20px"}}>
             <IonGrid>
             <IonRow>
                {
                  InReview.map((el,index)=>{
                    return   <IonCol  size="12" size-md="6">
                    <div >
                <AppliedJobCard data={el} fun={()=>handelJobCardClick(el.job_id)}/>
                </div>
                    </IonCol>
                  })
                }
               
              
              </IonRow>
             </IonGrid>
             </div>
          </div>

          <div style={{marginTop:"30px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>
            
            { selectedLanguage === "English" ? "Not selected" : "चयनित नहीं"}
            </span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>

            <div style={{marginTop:"20px"}}>
             <IonGrid>
             <IonRow>
                {
                  NotSelected.map((el,index)=>{
                    return   <IonCol  size="12" size-md="6">
                    <div >
                <AppliedJobCard data={el} fun={()=>handelJobCardClick(el.job_id)}/>
                </div>
                    </IonCol>
                  })
                }
               
              
              </IonRow>
             </IonGrid>
             </div>
          </div>
          </div>

          
    </IonContent>
</IonPage>
  )
}
