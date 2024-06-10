import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'

import { bookmark, bookmarkOutline, chevronBackOutline, chevronDownOutline, documentTextOutline, filterOutline } from 'ionicons/icons'

import { AppliedJobCard } from '../../components/Cards/JobCard/AppliedJobCard'
import { useHistory } from 'react-router'
import { ProfileHeaders } from '../../components/Headers/ProfileHeaders'
import NoAppliedJobs from "/assets/appliedJobs.png";
import { isMobile } from '../../IsMobile/IsMobile'
import { JobCard } from '../../components/Cards/JobCard/JobCard'
import { Base_url } from '../../Config/BaseUrl'
import axios from 'axios'
import { AppContext } from '../../Context/AppContext'
export const SavedJobs = () => {
  const history = useHistory();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [jobData,setJobData] = useState([]);
  const [SavedJobsData,setSavedJobsData] = useState([]);
  const {jobUpdate} = useContext(AppContext)
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
        const formatedData = data.post.filter((el)=>el.status === "1")
        setJobData(formatedData);
        getSavedJobs(formatedData);
        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const getSavedJobs = async (jobData) => {
    try {
      const url = `${Base_url}job_saved/Byuserid/${userDetails.user_id}`;
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
      console.log("Response check Job data", data, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data.status === "success") {
        //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
        // setUpdate((prev)=>prev+1);
        console.log("Job DAta  Saved jobs==>",)
         
        // setJobData(formatedData);
        const filtered = jobData.filter(job => 
          data.Job.some(savedJob => savedJob.job_id === job.id)
        );
        console.log("Saved Job Data ====>",filtered)
        setSavedJobsData(filtered);
        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelJobCardClick = (id)=>{
    history.push(`/job-details/${id}`)
  }


  useEffect(()=>{
    getJobs();
    // getSavedJobs();
  },[jobUpdate])
  return (
<IonPage>
    <IonContent>
          <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
          
          <ProfileHeaders icon={<IonIcon icon={bookmark} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Saved jobs"}  />

          <div style={{marginTop:"20px"}}>
          <IonGrid style={{padding:0,margin:0}} >
  <IonRow >
    {
     SavedJobsData && SavedJobsData.map((el,index)=>{
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
