import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { bookmark, chevronBackOutline, locationOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import book from "/assets/book.png";
import { CustomBtn1 } from '../../components/Buttons/CustomBtn1';
import { useHistory, useParams } from 'react-router';
import { isMobile } from '../../IsMobile/IsMobile';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
export const JobDetails = () => {
  const history = useHistory()
  const [data,setJobData] = useState([]);
  const [userData,setUserData] = useState(null);
  const [resumeId,setResumeId] = useState(null)
  const [resumeData,setResumeData] = useState(null)
  const {showToast} = useContext(AppContext)

const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const {id} = useParams()
  const getJobs = async () => {
    try {
      const url = `${Base_url}job/Byid/${id}`;
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
        console.log("Job DAta ==>",data.Job[0])
        // const Data = data.img;
        setJobData(data.Job[0]);

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
      getJobs(id);
    }
    
  },[id])


    const handelApplyClick =()=>{
        console.log("Apply click",resumeData,resumeId);
           if(resumeId === null || resumeData === 1){
            showToast("error", "Please add resume in profile section", "");
            return ;
           }

           AddJob()
         
          
    }

    const getUserDataByid = async () => {
      try {
        const url = `${Base_url}get_user/${userDetails.user_id}`;
        const formData1 = new FormData();
        // formData1.append('user_id', userDetails.user_id);
        // formData1.append('resume', selectedFile);
  
      
  
        const response = await axios.get(url,formData1,{
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
               console.log("suer Data  ==> ",Data )
               setUserData(Data)
               setResumeData(Data.resume);
               if(Data.resume === 0){
                setResumeId(Data.resume_id)
               }
              
                return
              
            }
            // showToast("error", "Try After Some Time", "");
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        // showToast("error", "Try After Some Time", "");
      }
    };


    const AddJob = async () => {
      try {
        const url = `${Base_url}job_apply/store`;
        const formData1 = new FormData();
        formData1.append('user_id', userDetails.user_id);
        formData1.append('job_id',data.id);
        formData1.append('resume_id',resumeId);
  
      
  
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
                showToast("success", "Applied successfully", "");
                handelBackClick()
                return
            }
            showToast("error", "Try After Some Time", "");
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        showToast("error", "Try After Some Time", "");
      }
    };

    const handelBackClick = ()=>{
      history.goBack()
    }

    useEffect(()=>{
      getUserDataByid()
    },[])
  return (
    <IonPage>
        <IonContent>
            <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
           <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
{/* ======================================================== */}
           <div style={{marginTop:"30px"}}>
           <div style={{width:"100%"}}>

      
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
                <span style={{fontSize:"28px",fontWeight:"bold"}}>Job Details</span>
            </div>
            <div>
            <IonIcon style={{color:"#395CFF",fontSize:"24px"}} icon={bookmark} />
            </div>
        </div>
       

        <div style={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>{data && data.job_title} {`(${data && data.department})`}</span>
         <span style={{fontSize:"12px",color:"#395CFF"}}>3 days ago</span>
        </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"10px"}}>
          <div>
            <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>{data && data.name}</span>
          </div>

         
        </div>

        <div style={{marginTop:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
           
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
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
           

           
              <span style={{fontSize:"15px",marginLeft:"3px",color:"black"}}>
              {data && data.off_salery}
              </span>
             
           
        </div>

        </div>

    
      </div>
        
       


     
     
    </div>
           </div>

{/* ======================================================== */}
             
             <div style={{marginTop:"30px"}}>
                <div>
                    <span style={{fontSize:"16px",fontWeight:"bold"}}>Job Info</span>
                </div>

                <div>
                    <ul>
                    <li>{data && data.education}</li>
                        {
                          data && data.job_type === "Full Time" ?  <li>{data && data.job_type}</li>
                          :
                          <li>{`${data && data.job_type} (start time : ${data && data.start_time} ,end time : ${data && data.end_time} )`}</li>
                        }
                       
                        <li>{data &&  `${data.department} (${data.sub_department })`}</li>
                       
                        <li>{data && data.job_description}</li>
                        <li>{data && data.number_employees} employees required</li>
                    </ul>
                </div>
             </div>


             <div style={{marginTop:"50px"}}>
                <div>
                    <span style={{fontSize:"16px",fontWeight:"bold"}}>Address</span>
                </div>

                <div>
                    <ul>
                        <li>{data && data.address}</li>
                        <li>{data && data.pin_code}</li>
                        <li>{data && data.city},{data && data.state},{data && data.country}</li>
                      
                    </ul>
                </div>
             </div>



             <div style={{width:"100%",position:"absolute",bottom:10,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

              <CustomBtn1 fun={handelApplyClick} title={"Apply"}/>
             </div>

            </div>
           
        </IonContent>
    </IonPage>
  )
}
