import React, { useContext, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption } from '@ionic/react';
import { CustomBtn1 } from '../Buttons/CustomBtn1';
import { ProfileHeaders } from '../Headers/ProfileHeaders';
import { bagHandleOutline, bookOutline, chevronBackOutline } from 'ionicons/icons';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';

const EducationModel = ({ isOpen, onClose,setUpdate }) => {
  const { showToast } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails" )|| localStorage.getItem("userRegisterDetails"));
  const token =localStorage.getItem("token");
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

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted with data:', formData);
    AddEducationData()
    // You can add more validation or submission logic here
    // Close the modal after submission
    // onClose();
  };

  const handelSaveClick= ()=>{
    //   history.push("/home")
    }

    const AddEducationData = async () => {
      try {
        const url = `${Base_url}user_education/store`;
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
                setUpdate((prev)=>prev+1);
                setFormData({
                  degree:"",
                  university:"",
                  yearGraduated:""
                })
                onClose();
                return
              
            }
            showToast("error", "Try After Some Time", "");
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        showToast("error", "Try After Some Time", "");
      }
    };

    const Degrees = [
      "Bachelor of Technology (B.Tech)",
      "Bachelor of Engineering (B.E.)",
      "Bachelor of Science (B.Sc)",
      "Bachelor of Arts (B.A.)",
      "Bachelor of Commerce (B.Com)",
      "Bachelor of Business Administration (BBA)",
      "Bachelor of Fine Arts (BFA)",
      "Bachelor of Design (B.Des)",
      "Bachelor of Architecture (B.Arch)",
      "Bachelor of Pharmacy (B.Pharm)",
      "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
      "Bachelor of Dental Surgery (BDS)",
      "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
      "Bachelor of Homeopathic Medicine and Surgery (BHMS)",
      "Bachelor of Veterinary Science & Animal Husbandry (B.VSc & AH)",
      "Bachelor of Laws (LLB)",
      "Bachelor of Education (B.Ed)",
      "Bachelor of Physical Education (B.P.Ed)",
      "Bachelor of Journalism and Mass Communication (BJMC)",
      "Bachelor of Hotel Management (BHM)",
      "Bachelor of Travel and Tourism Management (BTTM)",
      "Bachelor of Computer Applications (BCA)",
      "Bachelor of Science in Nursing (B.Sc Nursing)",
      "Bachelor of Social Work (BSW)",
      "Bachelor of Library and Information Science (BLIS)",
      "Bachelor of Film and Television Production (BFTP)"
    ]

    const Universityes= [
      "Indian Institutes of Technology (IITs)",
      "Indian Institutes of Management (IIMs)",
      "National Institutes of Technology (NITs)",
      "University of Delhi",
      "Jawaharlal Nehru University (JNU)",
      "Banaras Hindu University (BHU)",
      "University of Mumbai",
      "University of Calcutta",
      "Anna University",
      "University of Madras",
      "University of Pune",
      "University of Hyderabad",
      "University of Allahabad",
      "Aligarh Muslim University (AMU)",
      "Osmania University",
      "University of Rajasthan",
      "University of Kerala",
      "University of Lucknow",
      "Punjab University",
      "University of Gujarat",
      "University of Mysore",
      "University of Kolkata",
      "University of Bangalore",
      "University of Chennai",
      "University of Chandigarh",
      "University of Nagpur",
      "University of Ahmedabad",
      "University of Jaipur",
      "University of Bhopal",
      "University of Coimbatore",
      "University of Dehradun",
      "University of Patna",
      "University of Kanpur",
      "University of Varanasi",
      "University of Guwahati",
      "University of Bhubaneswar",
      "University of Jammu",
      "University of Ranchi",
      "University of Shimla",
      "University of Srinagar",
      "University of Trivandrum",
      "University of Vijayawada",
      "University of Visakhapatnam",
      "University of Indore",
      "University of Raipur",
      "University of Kochi"
    ]
    
    

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent>
      <div style={{ padding: "20px" }}>

<div>
         
         <div>
            <IonIcon onClick={onClose} icon={chevronBackOutline} style={{fontSize:"24px"}} />
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
            {/* <IonInput
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
            /> */}
            <IonSelect
            name="degree" 
              value={formData.degree}
              onIonChange={handleChange}
              interface="popover"
              placeholder="Select Degree"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
              {
               Degrees && Degrees.map((el,index)=>{
                  return <IonSelectOption key={index} value={el}>{el}</IonSelectOption>
                })
              }
             
           
              

              {/* Add more job types as needed */}
            </IonSelect>
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
            {/* <IonInput
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
            /> */}
             <IonSelect
            name="university" 
            value={formData.university}
              onIonChange={handleChange}
              interface="popover"
              placeholder="Select University"
              style={{ background: "#F4F4F4", padding: "10px", borderRadius: "7px" }}
            >
              {Universityes && Universityes.map((el,index)=>{
                return  <IonSelectOption key={index} value={el}>{el}</IonSelectOption>
              })}
             
        
              
              
              {/* Add more job types as needed */}
            </IonSelect>
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
    </IonModal>
  );
};

export default EducationModel;
