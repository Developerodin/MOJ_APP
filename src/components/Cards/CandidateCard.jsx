import { IonButton, IonCard, IonCardContent, IonIcon, IonToggle, useIonRouter } from '@ionic/react'
import { bookmark, bookmarkOutline, locationOutline } from 'ionicons/icons'
import React, { useContext } from 'react'
import book from "/assets/Ellipse1.png";
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

export const CandidateCard = ({data,setUpdate,fun}) => {
  const history = useIonRouter();
  const { showToast,jobUpdate,setJobUpdate,CandidateJobStatus,setCandidateJobStatus } = useContext(AppContext);


const handleStatusChange = ()=>{
      
} 

const ChangeStatus = async (value) => {
  try {
    console.log("In Cahnge status ==>",data.application_id)
    
    
    const url = `${Base_url}job_apply/status_update/${data.application_id}`;
    console.log("In Cahnge status 2==>")
    const formData1 = new FormData();
    formData1.append('status', value);
    
  

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
            showToast("success", "updated", "");
            setCandidateJobStatus((prev)=>prev+1)
            return
        }
        showToast("error", "Try After Some Time", "");

          
       
        
  } catch (error) {
    console.error('Error:', error);
    showToast("error", "Try After Some Time", "");
  }
};

function timeAgo(dateString) {
  const createdDate = new Date(dateString);
  const now = new Date();
  const timeDifference = now - createdDate;
  
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysAgo === 0) {
    return "Today";
  } else if (daysAgo === 1) {
    return "1 day ago";
  } else {
    return `${daysAgo} days ago`;
  }
}

  return (
    <div style={{width:"100%"}}>
    <IonCard   style={{padding:"0px",border:"1px solid #F3F3F3",borderRadius:"10px",background:"#FAFAFA",margin:0}} >
        <IonCardContent style={{padding:"20px"}}>
          
          <div onClick={()=>fun()}>
            
    
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <div style={{display:"flex", alignItems:"center"}}>
        <img src={data && data.user_img || book} style={{width:"50px",height:"50px",borderRadius:"100px"}} />
        <div style={{marginLeft: '10px'}}>
            <span style={{fontSize:"18px",color:"black",fontWeight:"bold",paddingLeft:'10px'}}>{data && data.name}</span><br/>
            {/* <span style={{color:"grey",fontSize:"12px"}}>{data && data.user && timeAgo(data.user.created_at)}</span> */}
        </div>
    </div>
    <div>
        {
            data.application_status === "Not Selected" ? <span style={{color:"crimson"}}>{data.application_status}</span>
            :
            <span style={{color:"#0054e9"}}>{data.application_status}</span>
        }
    </div>
</div>
             
    
            <div style={{marginTop:"30px"}}>
              <div>
                <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>Department</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
                
              {
  data.job_pref && data.job_pref.map((el, index) => {
    const departments = el.department.split(',');
    return departments.map((dept, deptIndex) => (
      <div key={`${index}-${deptIndex}`} style={{ padding: "3px 10px", borderRadius: "74px", backgroundColor: '#F0F0F0', marginBottom: '5px' }}>
        <span style={{ fontSize: "11px", color: "#5A5A5A" }}>{dept}</span>
      </div>
    ));
  })
}
{/*                 

               


                <div style={{padding:"5px"}}>
                    <span style={{fontSize:"13px",color:"#0054e9"}}>+4</span>
                </div> */}
              </div>
             
            </div>

            {
              data && data.city &&  <div style={{marginTop:"15px"}}>
              <div>
                <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>City</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
               

                <div style={{padding:"3px 10px",borderRadius:"74px",backgroundColor:'#F0F0F0'}}>
                    <span style={{fontSize:"11px",color:"#5A5A5A"}}>{data && data.city}</span>
                </div>

              </div>
             
            </div>
            }
    
           

            <div style={{marginTop:"15px"}}>
              <div>
                <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>Experience</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
              
                <div style={{padding:"3px 10px",borderRadius:"74px",backgroundColor:'#F0F0F0'}}>
                    <span style={{fontSize:"11px",color:"#5A5A5A"}}>{data && data.experience }</span>
                </div>

                
              </div>
             
            </div>


            
          </div>
          <div style={{marginTop:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
               {
                data.application_status === "In Review" && <IonButton  onClick={()=>ChangeStatus("Selected")} size="default" shape="round" style={{width:"144px",height:'36px'}}>Selected</IonButton>
               }

               {
                data.application_status === "In Touch" && <IonButton  onClick={()=>ChangeStatus("In Review")} size="default" shape="round" style={{width:"144px",height:'36px'}} >Accept</IonButton>
               }
               
               {
                data.application_status !== "Not Selected" &&   <IonButton onClick={()=>ChangeStatus("Not Selected")} size="default" shape="round" color={"danger"} style={{width:"144px",height:'36px'}} fill="outline">Decline</IonButton>
               }
             

            </div>
            
    
    
         
         
        </IonCardContent>
      </IonCard>
        </div>
  )
}
