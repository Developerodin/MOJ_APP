import React, { useContext, useEffect, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, useIonRouter } from '@ionic/react';
import { CustomBtn1 } from '../Buttons/CustomBtn1';
import { ProfileHeaders } from '../Headers/ProfileHeaders';
import { bagHandleOutline, chevronBackOutline } from 'ionicons/icons';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { useParams } from 'react-router';

const WorkExperienceEdit = () => {
  const { showToast,editUpdate,setEditUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || localStorage.getItem("userRegisterDetails"));
  const token =localStorage.getItem("token");
  const history = useIonRouter()
  const {id} = useParams()
  const [formData, setFormData] = useState({
    designation: '',
    profile: '',
    organisation: '',
    location: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    console.log("Value",name, value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted with data:', formData);
    UpdateWorkExperience();

    // You can add more validation or submission logic here
    // Close the modal after submission
    // onClose();
  };

  const handelSaveClick= ()=>{
    //   history.push("/home")
  
    }

    const handelBackClick=()=>{
        history.goBack()
    }


    const UpdateWorkExperience = async () => {
      try {
        const url = `${Base_url}user_work_ex/Update_ById/${id}`;
        const formData1 = new FormData();
        formData1.append('user_id', userDetails.user_id);
        formData1.append('organisation', formData.organisation);
        formData1.append('designation', formData.designation);
        formData1.append('profile', formData.profile);
        formData1.append('location', formData.location);
        formData1.append('start_date', formData.startDate);
        formData1.append('end_date', formData.endDate);
      
  
        const response = await axios.post(url, formData1,{
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
                setFormData({
                  designation: '',
                  profile: '',
                  organisation: '',
                  location: '',
                  startDate: '',
                  endDate: '',
            })
            setEditUpdate((prev)=>prev+1)
              handelBackClick();
                return
            }
            showToast("error", "Try After Some Time", "");
            handelBackClick()
              
           
            
      } catch (error) {
        console.error('Error:', error);
        showToast("error", "Try After Some Time", "");
        handelBackClick()
      }
    };

    const getUserWorkExperienceByWorkId = async () => {
        try {
          const url = `${Base_url}user/work_ex_id/${id}`;
          
        
    
          const response = await axios.get(url,{
            headers: {
              "Content-Type": "multipart/form-data",
              // "Authorization" :`Berear ${token}`,
         
            }
          });
          const data = response.data
              console.log("Response check work experience data",data)
              
                if(data){
                  console.log("work experience data",data.data)
                //   setExperoenceData(data.data);
                const formatedData = data.data.map(el => ({
                  organisation:el.organisation,
                  designation:el.designation,
                  profile:el.profile,
                  location:el.location,
                  startDate:el.start_date,
                  endDate:el.end_date,
                  description:el.description
                }));
                setFormData(formatedData[0])
                }
    
                
             
              
        } catch (error) {
          console.error('Error:', error);
          showToast("error", "Try After Some Time", "");
        }
      };

    useEffect(()=>{
        if(id){
            getUserWorkExperienceByWorkId();
        }
        
    },[id])

  return (
    <IonPage >
      <IonContent>
      <div style={{ padding: "20px" }}>

<div>
         
         <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
         
         <div style={{marginTop:"30px",display:"flex",justifyContent:"left",alignItems:"center"}}>
               
               <div>
               <IonIcon icon={bagHandleOutline} style={{fontSize:"24px",color:"#395CFF"}} />
               </div>

               <div style={{marginLeft:"20px"}}>
                <span style={{fontSize:"30px",fontWeight:"bold"}}>Edit Work Experience</span>
               </div>
         </div>

    </div>

<div style={{marginTop:"30px"}}>
<label
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
Designation
</label>
{/* <IonItem> */}
<IonInput
type="text"
name="designation" 
value={formData.designation} 
onIonChange={handleChange}
placeholder="e.g fnb manager"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>

<div style={{marginTop:"10px"}}>
<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
Profile
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
name="profile" 
value={formData.profile} 
onIonChange={handleChange}
placeholder="e.g operations"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>
</div>


{/* </IonItem> */}

<div style={{marginTop:"10px"}}>

<IonLabel

style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
Organisation
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
name="organisation" 
value={formData.organisation} 
onIonChange={handleChange}
placeholder="e.g Hotel xyz"
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>
</div>


<div style={{marginTop:"10px"}}>

<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
Location
</IonLabel>
{/* <IonItem> */}
<IonInput
type="text"
name="location" 
value={formData.location} 
onIonChange={handleChange}
style={{
borderRadius: "0px",
padding:"10px",
border: "1px solid #E2E8F0",
height:"52px",
backgroundColor:"#F4F4F4"
}}
/>

</div>


<div style={{marginTop:"10px"}}>
<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
Start Date
</IonLabel>
{/* <IonItem> */}
<IonInput
type="date"
name="startDate" 
value={formData.startDate} 
onIonChange={handleChange}
style={{
borderRadius: "0px",
padding:"10px",
border: "1px solid #E2E8F0",
height:"52px",
backgroundColor:"#F4F4F4"
}}
/>

</div>

<div style={{marginTop:"10px"}}>

<IonLabel
style={{
 color: "#575757",
 fontFamily: "inter",
 fontSize: "14px",
 fontWeight: "400",
 lineHeight: "30px",
}}
>
End Date
</IonLabel>
{/* <IonItem> */}
<IonInput
type="date"
name="endDate" 
value={formData.endDate} 
onIonChange={handleChange}
style={{
 borderRadius: "0px",
 padding:"10px",
 border: "1px solid #E2E8F0",
 height:"52px",
 backgroundColor:"#F4F4F4"
}}
/>

</div>

</div>    


<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"60px"}}>

<CustomBtn1 fun={handleSubmit} title={"Save"}/>
</div>

</div>
      
      
      </IonContent>
    </IonPage>
  );
};

export default WorkExperienceEdit;
