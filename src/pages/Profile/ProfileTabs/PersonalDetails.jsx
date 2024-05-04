





import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack, bookOutline, bookSharp } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { ProfileHeaders } from "../../../components/Headers/ProfileHeaders";
import { CustomBtn1 } from "../../../components/Buttons/CustomBtn1";
import { IonSelect, IonSelectOption } from "@ionic/react";
import { State, City } from "country-state-city";
import { Base_url } from "../../../Config/BaseUrl";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
export const ProfilePersonalDetails = () => {
  const history = useHistory();
  const Role = localStorage.getItem("role") || "";
  const details = JSON.parse( localStorage.getItem("Mobile"));
  const userDetails = JSON.parse( localStorage.getItem("userDetails"));
  const { showToast } = useContext(AppContext);
  const [Citys, setCitys] = useState([]);
  const [States, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  // const [selectedCity, setSelectedCity] = useState('');
  // const [selectedGender, setSelectedGender] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    state: "",
    city: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [update,setupdate] = useState(0)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  const handelBtnClick = () => {
    console.log("Form Data ==>", formData);
    RegisterUser()
    // handelContinue("ProfilePic")
    // if(formValid === false){
    //   showToast("error", "fill the required fields", "");
    //   return
    // }
   
  };

  const handelSaveClick = ()=>{
    UpdateUser();
  }

  const UpdateUser = async () => {
    try {
      const url = `${Base_url}auth/user_update`;
      const formData1 = new FormData();
      // formData1.append('role', Role);
      formData1.append('user_id', userDetails.user_id);
      // formData1.append('mobile_number', details.phoneNumber);
      formData1.append('name', formData.firstName);
      formData1.append('last_name', formData.lastName);
      formData1.append('gender', formData.gender);
      formData1.append('email', formData.email);
      formData1.append('state', formData.state);
      formData1.append('city', formData.city);
      formData1.append('country', "India");
      formData1.append('created_at', userDetails.created_at);
      const response = await axios.post(url, formData1,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
      const data = response.data
          console.log("Response check mobile",data,response)
          
            // if(data === "otp in valid"){
            //   showToast("error", "wrong otp", "");
            //   return;
            // }

          if(data.status === "success"){
               localStorage.setItem("userDetails", JSON.stringify(data.user));
              //  handelContinue("ProfilePic")
              setupdate((prev)=>prev+1)
                showToast("success", "updated", "");
              return
          }
          // showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      // showToast("error", "Try After Some Time", "");
    }
  };
 
  useEffect(() => {
    const isValid =
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.gender !== "" &&
      formData.state !== "" &&
      formData.city !== "";
    setFormValid(isValid);
  }, [formData]);
  useEffect(() => {
    const statesOfIndia = State.getStatesOfCountry("IN");
    setStates(statesOfIndia);
    // console.log("States:", statesOfIndia)
  }, []);

  useEffect(()=>{
    
// city
// : 
// "Jaipur"
// country
// : 
// "India"
// created_at
// : 
// "05-02-2024 08:16 PM"
// email
// : 
// "akshay96102@gmail.com"
// gender
// : 
// "male"
// id
// : 
// "30"
// last_name
// : 
// "Pareek"
// name
// : 
// "Akshay"
// role
// : 
// "Job Seeker"
// state
// : 
// "Rajasthan"
// updated_at
// : 
// "05-02-2024 08:16 PM"
// user_id
// : 
// "40"
    let profileDetails ={
      firstName: userDetails.name,
      lastName: userDetails.last_name,
      gender: userDetails.gender,
      email: userDetails.email,
      state: userDetails.state,
      city: userDetails.city,
    }

    setFormData(profileDetails);
  },[update])
    return (
      <IonPage>
        <IonContent>

          <div style={{ padding: "20px" }}>

               <ProfileHeaders icon={<IonIcon icon={bookSharp} style={{fontSize:"24px",color:"#395CFF"}} />} title={"Personal Details"}  />

          
               <div style={{ marginTop: "30px" }}>
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
            First name
          </label>
          {/* <IonItem> */}
          <input
          className="round-input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
           
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            Last name
          </label>
          {/* <IonItem> */}
          <input
          className="round-input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
         
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            Gender
          </label>
          <div
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: "50px",
              paddingLeft: "10px",
            }}
          >
            <IonSelect
              name="gender"
              interface="popover"
              value={formData.gender}
              onIonChange={handleInputChange}
              placeholder="Gender"
            >
              <IonSelectOption defaultChecked value={""}>
                Select Gender
              </IonSelectOption>
              <IonSelectOption value="male">Male</IonSelectOption>
              <IonSelectOption value="female">Female</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            Email Address (optional)
          </label>
          {/* <IonItem> */}
          <input
          className="round-input"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
           
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            State
          </label>
          <div
            // style={{
            //   border: "1px solid #E2E8F0",
            //   borderRadius: "50px",
            //   paddingLeft: "10px",
            // }}
          >
            {/* <IonSelect
              name="state"
              interface="action-sheet"
              value={formData.state}
              onIonChange={handleInputChange}
              placeholder="State"
            >
              <IonSelectOption defaultChecked value={""}>
                Select State
              </IonSelectOption>
              {States.map((state) => (
                <IonSelectOption key={state.isoCode} value={state.name}>
                  {state.name}
                </IonSelectOption>
              ))}
            </IonSelect> */}
                <div>
      <input
       className="round-input"
       name="state"
        list="states"
        value={formData.state}
        onChange={handleInputChange}
        placeholder="Type to search"
      />
      <datalist id="states" >
        {States.map((state) => (
          <option  key={state.isoCode} value={state.isoCode}>{state.name}</option>
        ))}
      </datalist>
    </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <label
            style={{
              color: "#575757",
              fontFamily: "inter",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "30px",
            }}
          >
            City
          </label>

          {/* <div  style={{
              
               
              border: "1px solid #E2E8F0",
              borderRadius: "50px",
              paddingLeft:"10px"
            }}>
        <IonSelect   value={selectedCity} onIonChange={handleCityChange}>
       
          <IonSelectOption defaultChecked value={""}>Select City</IonSelectOption>
          {selectedState && Citys.map(city => (
            <IonSelectOption key={city.name} value={city.name}>{city.name}</IonSelectOption>
          ))}
        </IonSelect>
        </div> */}
          <input
          className="round-input"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          
          />
        </div>

        {/* </IonItem> */}
      </div>   
         

          <div style={{marginTop:"30px",display:"flex",justifyContent:"center",alignItems:"center"}}>

              <CustomBtn1 fun={handelSaveClick} title={"Update"}/>
             </div>
           
          </div>
        </IonContent>
      </IonPage>
    );
}



