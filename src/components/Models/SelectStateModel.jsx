import React, { useContext, useEffect, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/react';
import { CustomBtn1 } from '../Buttons/CustomBtn1';
import { ProfileHeaders } from '../Headers/ProfileHeaders';
import { bagHandleOutline, bookOutline, chevronBackOutline } from 'ionicons/icons';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';

const SelectStateModel = ({ isOpen, onClose,setSelectedState,selectedState,setPreferredCity }) => {
  const { showToast } = useContext(AppContext);
  const userDetails = JSON.parse(localStorage.getItem("userDetails" )|| localStorage.getItem("userRegisterDetails"));
  const token =localStorage.getItem("token");
  const [StateData,setStateData] = useState([])
  

  const data = [
    'Amsterdam',
    'Buenos Aires',
    'Cairo',
    'Geneva',
    'Hong Kong',
    'Istanbul',
    'London',
    'Madrid',
    'New York',
    'Panama City',
  ];

  let [results, setResults] = useState([]);

  const handleInput = (ev) => {
    let query = '';
    const target = ev.target;
    if (target) query = target.value.toLowerCase();
  
    setResults(StateData.filter((d) => d.toLowerCase().indexOf(query) > -1));
  };

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
    // AddEducationData()
    // You can add more validation or submission logic here
    // Close the modal after submission
    // onClose();
  };

  const handelSaveClick= ()=>{
    //   history.push("/home")
    }

    const AddAddressData = async () => {
      try {
        const url = `${Base_url}basic/all_city`;
        // const formData1 = new FormData();
        // formData1.append('user_id', userDetails.user_id);
        // formData1.append('degree', formData.degree);
        // formData1.append('university', formData.university);
        // formData1.append('year', formData.yearGraduated);

      
  
        const response = await axios.get(url,{
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
            
               console.log("Data ==>",data.post)
               const Data = data.post
               const uniqueStates = [...new Set(Data.map(item => item.state_name))];
               console.log("Data state==>",uniqueStates)
               // Set the unique states in the state variable
               setStateData(uniqueStates);
               setResults(uniqueStates);
             
                return
              
            }
            // showToast("error", "Try After Some Time", "");
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        // showToast("error", "Try After Some Time", "");
      }
    };

    const SelectState = (state) =>{
        
        setSelectedState(state);
        setPreferredCity("");
        
        onClose();
        console.log("Selected",state);
    }

    
    useEffect(()=>{
        AddAddressData()
    },[])

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent>
      <div style={{ padding: "20px" }}>

<div>
         
         <div>
            <IonIcon onClick={onClose} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div>
         
             <div>
                
             <>
      <IonSearchbar debounce={1000} onIonInput={(ev) => handleInput(ev)}></IonSearchbar>

      <IonList>
        {results.map((result) => (
          <IonItem style={{border:`${selectedState === result ? "1px solid blue" :""}`}} onClick={()=>SelectState(result)}>{result}</IonItem>
        ))}
      </IonList>
    </>

             </div>


{/* <div style={{background:"#fff",padding:"10px",width:"100%",position:"fixed",bottom:0,left: "50%", transform: "translateX(-50%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

<CustomBtn1 fun={handleSubmit} title={"Save"}/>
</div> */}

</div>
      </div>
      
      </IonContent>
    </IonModal>
  );
};

export default SelectStateModel;
