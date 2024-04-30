import React, { useContext, useEffect, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, useIonRouter } from '@ionic/react';
import { CustomBtn1 } from '../Buttons/CustomBtn1';
import { ProfileHeaders } from '../Headers/ProfileHeaders';
import { bagHandleOutline, bookOutline, chevronBackOutline } from 'ionicons/icons';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { useParams } from 'react-router';

const EducationEdit = () => {
  const { showToast,editUpdate,setEditUpdate } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const token =localStorage.getItem("token");
  const history = useIonRouter()
  const {id} = useParams()
  const [formData, setFormData] = useState({
    degree:"",
    university:"",
    yearGraduated:""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    console.log("Value",name, value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelBackClick=()=>{
    history.goBack()
}

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted with data:', formData);
    // You can add more validation or submission logic here
    // Close the modal after submission
    // onClose();
    UpdateEducation()
  };

  const handelSaveClick= ()=>{
    //   history.push("/home")
    }

    const UpdateEducation = async () => {
      try {
        const url = `${Base_url}user_education/Update_ById/${id}`;
        const formData1 = new FormData();
        formData1.append('user_id', userDetails.user_id);
        formData1.append('degree', formData.degree);
        formData1.append('university', formData.university);
        formData1.append('year', formData.yearGraduated);
      
  
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
                  degree:"",
                  university:"",
                  yearGraduated:""
                })
            setEditUpdate((prev)=>prev+1)
              handelBackClick()
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

    const getUserEducationById = async () => {
        try {
          const url = `${Base_url}user/edu_id/${id}`;
          
        
    
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
                  degree:el.degree,
                  university:el.university,
                  yearGraduated:el.year
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
          getUserEducationById();
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
               <IonIcon icon={bookOutline} style={{fontSize:"24px",color:"#395CFF"}} />
               </div>

               <div style={{marginLeft:"20px"}}>
                <span style={{fontSize:"30px",fontWeight:"bold"}}>Education</span>
               </div>
         </div>

    </div>

    <div style={{marginTop:"30px"}}>
  
  <div>

  <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Degree
            </label>
            {/* <IonItem> */}
            <IonInput
              type="text"
              placeholder="e.g fnb manager"
              name="degree" 
        value={formData.degree} 
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
  

  <div style={{marginTop:"20px"}}>

  <label
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              University
            </label>
            {/* <IonItem> */}
            <IonInput
              type="text"
              placeholder="e.g fnb manager"
              name="university" 
              value={formData.university} 
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
 
      
      
            
  
            {/* </IonItem> */}

           
           


           

        
           
           <div style={{marginTop:"20px"}}>
              
           <IonLabel
              style={{
                color: "#575757",
                fontFamily: "inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              Year graduated
            </IonLabel>
            {/* <IonItem> */}
            <IonInput
              type="date"
              name="yearGraduated" 
              value={formData.yearGraduated} 
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


<div style={{width:"100%",position:"absolute",bottom:10,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center"}}>

<CustomBtn1 fun={handleSubmit} title={"Save"}/>
</div>

</div>
      
      
      </IonContent>
    </IonPage>
  );
};

export default EducationEdit;
