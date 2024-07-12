import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton, IonToolbar, useIonRouter } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { CandidateCard } from '../../../components/Cards/CandidateCard'
import { isMobile } from '../../../IsMobile/IsMobile'
import { Base_url } from '../../../Config/BaseUrl'
import axios from 'axios'
import { AppContext } from '../../../Context/AppContext'
import { AppledJobCandidateCard } from '../../../components/Cards/JobCard/AppledJobCandidateCard'

export const HotelierAppliedJobs = () => {
  const history = useIonRouter();
  const { showToast,jobUpdate,setJobUpdate } = useContext(AppContext);
  const [ActiveJobData,setJobDataActive] = useState([]);
  const [InActiveJobData,setJobDataInactive] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [selectedTab, setSelectedTab] = useState('Active');
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
        // const Data = data.img;
        const filterData = data.Job.filter((el,index)=>el.status === "1")
        const filterData2 = data.Job.filter((el,index)=>el.status === "0")
        setJobDataActive(filterData);
        setJobDataInactive(filterData2)
        return;
      }
      // showToast("error", "Try After Some Time", "");
    } catch (error) {
      console.error("Error:", error);
      // showToast("error", "Try After Some Time", "");
    }
  };

  const handelCardClick =(id)=>{
    history.push(`/job-candidate-view/${id}`)
  }

  const renderComponent = () => {
    switch (selectedTab) {
      case 'Active':
        return  <div style={{marginTop:"20px"}}>
        {
          ActiveJobData && ActiveJobData.length >0 ?  ActiveJobData.map((el,index)=>{
            return <div key={index} style={{marginTop:"10px"}}>
              <AppledJobCandidateCard fun={()=>handelCardClick(el.id)} data={el}/>
              </div> 
          })
          :
          <div style={{textAlign:"center"}}>
            <span style={{fontSize:"16px",color:"grey"}}>No Job Posted Yet</span>
            </div>
          
        }
      
        
      </div>;
      case 'Inactive':
        return  <div style={{marginTop:"40px"}}>
        {
          InActiveJobData && InActiveJobData.length >0 ?  InActiveJobData.map((el,index)=>{
            return <div key={index} style={{marginTop:"10px"}}>
              <AppledJobCandidateCard fun={()=>handelCardClick(el.id)} data={el}/>
              </div> 
          })
          :
          <div style={{textAlign:"center"}}>
            <span style={{fontSize:"16px",color:"grey"}}>No Job Posted Yet</span>
            </div>
          
        }
      
        
      </div> ;
     
      default:
        return null;
    }
  };

  useEffect(()=>{
    getJobs();
  },[jobUpdate])
  useEffect(() => {
    const interval = setInterval(() => {
      getJobs();
    }, 10000); // 10000ms = 10 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [])

  return (
    <IonPage>
        <IonContent>
           <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}> 
               <div>
                <span style={{fontSize:"24px",fontWeight:"bold"}} >Click to View Applicants</span>
               </div>

               <div style={{marginTop:"20px"}}>
            <IonToolbar>
        <IonSegment  value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
          <IonSegmentButton value="Active" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >Active</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Inactive" >
            <IonLabel style={{color:"#2D3F65",fontSize:"15px",fontWeight:"500"}} >Inactive</IonLabel>
          </IonSegmentButton>
         
        </IonSegment>
      </IonToolbar>
            </div>

            <div style={{marginTop:"30px",width:"95%",margin:"auto"}}>

{
    renderComponent()
}

</div>


               
           </div>
        </IonContent>
    </IonPage>
  )
}
