import { IonCard, IonCardContent, IonIcon, IonToggle } from '@ionic/react'
import { bookmark, locationOutline } from 'ionicons/icons'
import React, { useContext } from 'react'
import book from "/assets/book.png";
import { AppContext } from '../../../Context/AppContext';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
export const PostJobCard = ({fun,data}) => {
  const { showToast,jobUpdate,setJobUpdate } = useContext(AppContext);
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
  const handleToggleChange = (e) => {
    const newValue = e.detail.checked;
    // setToggleStatus(newValue);
    ChangeStatus(newValue);
    console.log('Toggle value:', newValue);
  };

  const ChangeStatus = async (value) => {
    try {
      console.log("In Cahnge status ==>")
      let StatusValue = value ? "1" :"0";
      
      const url = `${Base_url}job/status_update/${data.id}`;
      console.log("In Cahnge status 2==>")
      const formData1 = new FormData();
      formData1.append('status', StatusValue);
      
    

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
              setJobUpdate((prev)=>prev+1)
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
<IonCard  style={{padding:"0px",border:"1px solid #E4E4E4",borderRadius:"15px",background:"#f2f4fe",margin:0}} >
    <IonCardContent style={{padding:"10px"}}>
      
      <div>
        <span style={{fontSize:"12px",color:"#395CFF"}}>{data && timeAgo(data.created_at)}</span>

        <div>
          <span style={{fontSize:"18px",color:"black",fontWeight:"bold"}}>{data && data.job_title} {`(${data && data.department})`}</span>
        </div>

        <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
          <div>
            <span style={{fontSize:"13px",color:"black",fontWeight:"bold"}}>{data && data.Hotel_name}</span>
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
        
        <div style={{position:"absolute",top:20,right:20}}>
        <IonToggle onIonChange={handleToggleChange} checked={data && data.status==="1" ? true : false} />
        </div>


     
     
    </IonCardContent>
  </IonCard>
    </div>
    
  )
}
