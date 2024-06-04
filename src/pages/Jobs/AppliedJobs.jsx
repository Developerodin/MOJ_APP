import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from '@ionic/react'
import React, { useEffect, useState } from 'react'

import { chevronDownOutline, documentTextOutline } from 'ionicons/icons'

import { AppliedJobCard } from '../../components/Cards/JobCard/AppliedJobCard'
import NoAppliedJobs from "/assets/appliedJobs.png";
import { isMobile } from '../../IsMobile/IsMobile';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
export const AppliedJobs = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [jobData,setJobData] = useState([]);



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
             const Data = data.data;
             console.log("jobs Data  ==> ",Data )
             setJobData(Data)
             
            
              return
            
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  useEffect(()=>{
    getAppliedJobs()
  },[])

  return (
<IonPage>
    <IonContent>
          <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
          <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
          <IonIcon icon={documentTextOutline} style={{fontSize:"30px"}} />
          <span style={{fontSize:"26px",fontWeight:"bold",marginLeft:"10px",marginTop:"3px"}}>Applied</span>
          </div>
          
          {/* <div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img
            src={NoAppliedJobs}
            alt="Globe Icon"
          
          />
          </div> */}
          <div style={{marginTop:"20px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>In touch</span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>
             <div style={{marginTop:"20px"}}>
             <IonGrid>
              <IonRow>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
              </IonRow>
             </IonGrid>
             </div>
             
            
          </div>

          <div style={{marginTop:"30px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>In review</span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>

            <div style={{marginTop:"20px"}}>
             <IonGrid>
              <IonRow>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
              </IonRow>
             </IonGrid>
             </div>
          </div>

          <div style={{marginTop:"30px"}}>
            <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
           
          <span style={{fontSize:"22px",fontWeight:"bold",marginTop:"3px"}}>Not selected</span>
          <IonIcon icon={chevronDownOutline} style={{fontSize:"25px",marginLeft:"10px"}} />
            </div>

            <div style={{marginTop:"20px"}}>
             <IonGrid>
              <IonRow>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
                <IonCol  size="12" size-md="6">
                <div >
            <AppliedJobCard/>
            </div>
                </IonCol>
              </IonRow>
             </IonGrid>
             </div>
          </div>
          </div>

          
    </IonContent>
</IonPage>
  )
}
