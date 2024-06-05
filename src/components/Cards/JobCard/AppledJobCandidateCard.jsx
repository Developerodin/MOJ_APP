
import { IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { bookmark, locationOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import book from "/assets/book.png";
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import { useParams } from 'react-router';
export const AppledJobCandidateCard = ({data,fun}) => {
  
  const [ActiveApplicants,setActiveApplicants] = useState("0");

  const getApplicantsCount = async () => {
    try {
      const url = `${Base_url}job_apply_count/Byid_jobid/${data.id}`;
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('resume', selectedFile);

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
        },
      });
      const data1 = response.data;
      // console.log("getApplicantsCount CAlled in Card=====================================================>", data1, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data1.status === "success") {
       
        setActiveApplicants(data1.Job)
        return;
      }
      setActiveApplicants(0)
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      setActiveApplicants(0)
      // showToast("error", "Try After Some Time", "");
    }
  };

  useEffect(()=>{
  
      getApplicantsCount()
   
  
  },[])



  return (
    <div style={{width:"100%"}}>
<IonCard onClick={fun} style={{padding:"0px",border:"1px solid #E4E4E4",borderRadius:"15px",background:"#f2f4fe",margin:0}} >
    <IonCardContent style={{padding:"10px"}}>
      
      <div>
        <span style={{fontSize:"12px",color:"#395CFF"}}>3 days ago</span>

        <div>
          <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>{data && data.job_title} {`(${data && data.department})`}</span>
        </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
          <div>
            <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>{data && data.name}</span>
          </div>

        
        </div>
         
        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"10px"}}>
            <IonIcon icon={locationOutline}  style={{color:"crimson",fontSize:"18px",fontWeight:"bold"}} />
           <span style={{fontSize:"13px",marginLeft:"2px",marginTop:"3px",color:"black"}}>{data && data.city},  {`(${data && data.state})`}</span> 
          </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"8px"}}>
            
             <img
            src={book}
            alt="Globe Icon"
            style={{
             
            }}
          />
           

           
              <span style={{fontSize:"15px",marginLeft:"3px",color:"black"}}>
              {data && data.experience}
              </span>
             
           
        </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"8px"}}>
            
            <span style={{fontSize:"16px",color:"#3A9E56",marginLeft:"5px",fontWeight:"bold"}}>₹</span>
           

           
              <span style={{fontSize:"15px",marginLeft:"12px",color:"black"}}>
              {data && data.off_salery}
              </span>
             
           
        </div>
      </div>
        
        <div style={{position:"absolute",bottom:20,right:20}}>
          <span style={{color:"#395CFF",fontWeight:"bold",fontSize:"13px"}}>{ActiveApplicants} Applicants</span>
        </div>


     
     
    </IonCardContent>
  </IonCard>
    </div>
    
  )
}
