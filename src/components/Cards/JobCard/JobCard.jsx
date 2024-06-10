import { IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { bookmark, locationOutline } from 'ionicons/icons'
import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import book from "/assets/book.png";
import { Base_url } from '../../../Config/BaseUrl';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';
export const JobCard = ({data,fun}) => {
  const [jobSaved,setJobSaved] = useState(false);
  const [SavedJobId,setSavedJobId] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { showToast,jobUpdate,setJobUpdate } = useContext(AppContext);
  
  const handelJobSave = async()=>{
    try {
      console.log("In Cahnge status ==>")
    
      
      const url = `${Base_url}job_save/store`;
      console.log("In Cahnge status 2==>")
      const formData1 = new FormData();
      formData1.append('user_id', userDetails.user_id);
      formData1.append('job_id', data.id);
    

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data1 = response.data
          console.log("Response check work experience",data1,response)
          
            // if(data === "otp in valid"){
            //   showToast("error", "wrong otp", "");
            //   return;
            // }

          if(data1.status === "success"){
              //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
              // showToast("success", "updated", "");
              // setJobUpdate((prev)=>prev+1)
              setJobUpdate((prev)=>prev+1)
              return
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  }

  const getSavedJobsStatus = async () => {
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
      const data1 = response.data;
      console.log("Response check Job data", data1, response);

      // if(data === "otp in valid"){
      //   showToast("error", "wrong otp", "");
      //   return;
      // }

      if (data1.status === "success") {
        //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
        // setUpdate((prev)=>prev+1);
        
          const filterData = data1.Job.filter((el)=>el.job_id === data.id);
          console.log("Job DAta  Saved jobsn ==>",filterData,data.id)
         
          if(filterData.length >0){
            setJobSaved(true);
           
          }
          else{
            setJobSaved(false);
          }
          setSavedJobId(filterData[0].id)
        // setJobData(formatedData);
        
        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelDeleteJobSave = async()=>{
    try {
      console.log("In Cahnge status ==>")
    
      
      const url = `${Base_url}job_save/delete/${SavedJobId}`;
      console.log("In Cahnge status 2==>")
      const formData1 = new FormData();
      // formData1.append('user_id', userDetails.user_id);
      // formData1.append('job_id', data.id);
    

      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data1 = response.data
          console.log("Response check work experience",data1,response)
         

          if(data1.status === "success"){
            setJobUpdate((prev)=>prev+1)
              return
          }
         

            
         
          
    } catch (error) {
      console.error('Error:', error);
     
    }
  }

  useEffect(()=>{
    getSavedJobsStatus()
  },[jobUpdate])
  return (
    <div style={{width:"100%"}}>
<IonCard style={{padding:"0px",border:"1px solid #E4E4E4",borderRadius:"15px",background:"#f2f4fe",margin:0}} >
    <IonCardContent style={{padding:"10px"}}>
      
      <div>
        <span style={{fontSize:"12px",color:"#395CFF"}}>3 days ago</span>
          <div onClick={fun} >
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
        
        <div style={{position:"absolute",top:20,right:20}}>
         
          {
            jobSaved ?  <IonIcon onClick={handelDeleteJobSave}  style={{color:"#395CFF",fontSize:"24px"}} icon={bookmark} />
            :
            <IonIcon onClick={handelJobSave} style={{color:"grey",fontSize:"24px"}} icon={bookmark} />
          }
        </div>


     
     
    </IonCardContent>
  </IonCard>
    </div>
    
  )
}
