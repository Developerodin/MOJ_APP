import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagOutline, callOutline } from 'ionicons/icons'
import { PostJobCard } from '../../../components/Cards/JobCard/PostJobCard'
import { isMobile } from '../../../IsMobile/IsMobile'
import axios from 'axios'
import { Base_url } from '../../../Config/BaseUrl'
import { AppContext } from '../../../Context/AppContext'

export const ActiveJobs = () => {
  const history = useIonRouter();
  const { showToast,jobUpdate,setJobUpdate } = useContext(AppContext);
  const [jobData,setJobData] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
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
        const filterData = data.Job.filter((el,index)=>el.status === "1")
        // const Data = data.img;
        setJobData(filterData);

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
  return (
    <IonPage>
        <IonContent>
            <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
            <ProfileHeaders icon={<IonIcon icon={bagOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Active Jobs"}  />
            

            <div style={{marginTop:"40px"}}>
              {
                jobData && jobData.length >0 ?  jobData.map((el,index)=>{
                  return <div style={{marginTop:"10px"}}>
                    <PostJobCard fun={()=>console.log("click on post job")} data={el}/>
                    </div> 
                })
                :
                <div style={{textAlign:"center"}}>
                  <span style={{fontSize:"16px",color:"grey"}}>No Active Job Found</span>
                  </div>
                
              }
            
              
            </div>
            
            
            </div>
        </IonContent>
    </IonPage>
  )
}
