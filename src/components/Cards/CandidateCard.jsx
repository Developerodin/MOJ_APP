import { IonButton, IonCard, IonCardContent, IonIcon, IonToggle, useIonRouter } from '@ionic/react'
import { bookmark, bookmarkOutline, locationOutline } from 'ionicons/icons'
import React, { useContext } from 'react'
import book from "/assets/Ellipse1.png";
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

export const CandidateCard = ({data,setUpdate}) => {
  const history = useIonRouter();
  const { showToast,jobUpdate,setJobUpdate } = useContext(AppContext);
  const handelCardClick = (id,id2)=>{
    if(id){
      history.push(`/candidate-view/${id}`);
    }
  
}

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
            setUpdate((prev)=>prev+1)
            return
        }
        showToast("error", "Try After Some Time", "");

          
       
        
  } catch (error) {
    console.error('Error:', error);
    showToast("error", "Try After Some Time", "");
  }
};

  return (
    <div style={{width:"100%"}}>
    <IonCard   style={{padding:"0px",borderRadius:"10px",background:"#fff",margin:0,boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}} >
        <IonCardContent style={{padding:"20px"}}>
          
          <div onClick={()=>handelCardClick(data.user_id)}>
            
    
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div >
            <img src={data && data.user_img || book} style={{width:"50px",height:"50px",borderRadius:"100px"}} />
            </div>
            <div style={{textAlign:"center"}}>
            <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>{data && data.name}</span><br/>
            <span style={{color:"grey",fontSize:"12px"}}>3 days ago</span>
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
                  data.job_pref && data.job_pref.map((el,index)=>{
                    return  <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>{el.department}</span>
                </div>
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
               

                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>{data && data.city}</span>
                </div>

              </div>
             
            </div>
            }
    
           

            <div style={{marginTop:"15px"}}>
              <div>
                <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>Experience</span>
              </div>
              <div style={{display:"flex",justifyContent:"left",alignItems:"center",flexWrap:"wrap",marginTop:"10px",marginBottom:"10px",gap:"10px"}}>
              
                <div style={{padding:"3px 10px",border:"1px solid #0054e9",borderRadius:"18px"}}>
                    <span style={{fontSize:"11px",color:"#0054e9"}}>{data && data.experience}</span>
                </div>

                
              </div>
             
            </div>


            
          </div>
          <div style={{marginTop:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
               {
                data.application_status === "In Review" && <IonButton onClick={()=>ChangeStatus("Selected")} size="small" shape="round" style={{width:"140px"}}>Selected</IonButton>
               }

               {
                data.application_status === "In Touch" && <IonButton onClick={()=>ChangeStatus("In Review")} size="small" shape="round" style={{width:"140px"}}>Accept</IonButton>
               }
               
               {
                data.application_status !== "Not Selected" &&   <IonButton onClick={()=>ChangeStatus("Not Selected")} size="small" shape="round" color={"danger"} style={{width:"120px"}} fill="outline">Decline</IonButton>
               }
             

            </div>
            
    
    
         
         
        </IonCardContent>
      </IonCard>
        </div>
  )
}
