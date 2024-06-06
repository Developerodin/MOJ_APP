import { IonButton, IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { isMobile } from '../../../IsMobile/IsMobile'
import { bookmarkOutline, chatbubbleEllipsesOutline, chatbubbleOutline, chevronBackOutline } from 'ionicons/icons'
import book from "/assets/Ellipse1.png";
import { CandidateCard } from '../../../components/Cards/CandidateCard';
import { useParams } from 'react-router';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
export const JobCandidateView = () => {
    const history = useIonRouter();
    const {id} = useParams();
    const [ActiveApplicants,setActiveApplicants] = useState(0);
     const [update,setUpdate] = useState(0)
    const getApplicants = async (id) => {
      try {
        const url = `${Base_url}job_apply/Byid_user/${id}`;
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
            const Data = data.Job;
            const newData = Data.map(item => ({
                user_id: item.user_id,
                city:item.user.city,
                state:item.user.state,
                email:item.user.email,
                name: item.user.name,
                last_name: item.user.last_name,
                gender: item.user.gender,
                address:item.user.address,
                user_img: item.user_img,
                application_id:item.application_id,
                application_status:item.application_status,
                experience:item.work && item.work.length >0 ? "experienced" : "fresher",
                job_pref: item.job_pref,
                work: item.work,
              }));

              console.log("Data of applcantes ===>",newData)
          setActiveApplicants(newData)
          return;
        }
        // showToast("error", "Try After Some Time", "");
      } catch (error) {
        console.error("Error:", error);
        // showToast("error", "Try After Some Time", "");
      }
    };
  
    useEffect(()=>{
    if(id){
        getApplicants(id)
    }
    },[id,update])
    const handelBackClick= ()=>{
      history.goBack();
        console.log("Back Presss")
    }

  return (
    <IonPage>
        <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}> 
        <div style={{marginTop:"20px"}}>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"28px"}}></IonIcon>
        </div>
               <div style={{marginTop:"20px"}}>
                <span style={{fontSize:"30px",fontWeight:"bold"}}>Candidates Applied</span>
               </div>


               <div style={{marginTop:"30px"}}>
                {
                    ActiveApplicants && ActiveApplicants.map((el,index)=>{
                        return <div key={index} style={{marginTop:"20px"}}>
                                <CandidateCard data={el} setUpdate={setUpdate}/>
                             </div>
                    })
                }
                 
               </div>

               


               
           </div>
        </IonContent>
    </IonPage>
  )
}
