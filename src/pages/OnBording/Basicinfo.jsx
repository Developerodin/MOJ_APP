import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { arrowBack, chevronBackOutline } from "ionicons/icons";
import icon from "/assets/left.png";
import { useHistory } from "react-router";
import { CustomBtn1 } from "../../components/Buttons/CustomBtn1";
import { IonSelect, IonSelectOption } from "@ionic/react";
import { State, City } from "country-state-city";
import "./BasicInfo.css";
import { AppContext } from "../../Context/AppContext";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";

const Basicinfo = ({ handelContinue }) => {
  const history = useHistory();
  const Role = localStorage.getItem("role") || "";
  const details = JSON.parse( localStorage.getItem("Mobile"));
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

  const RegisterUser = async () => {
    try {
      const url = `${Base_url}auth/register`;
      const formData1 = new FormData();
      formData1.append('role', Role);
      formData1.append('mobile_number', details.phoneNumber);
      formData1.append('name', formData.firstName);
      formData1.append('last_name', formData.lastName);
      formData1.append('gender', formData.gender);
      formData1.append('email', formData.email);
      formData1.append('state', formData.state);
      formData1.append('city', formData.city);
      formData1.append('country', "India");

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
               localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
               handelContinue("ProfilePic")
              return
          }
          showToast("error", "Try After Some Time", "");

            
         
          
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time", "");
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

  // useEffect(()=>{
  //   console.log("In City Data  ===>",selectedState)
  //   if(selectedState !== ""){
  //     const cityData= City.getCitiesOfState('IN', selectedState);
  //     console.log("City Data  ==>",cityData)
  //     setCitys(cityData);
  //   }

  // },[])
  return (
    <div>
      {/* <div>
            <IonIcon onClick={handelBackClick} icon={chevronBackOutline} style={{fontSize:"24px"}} />
           </div> */}
      <h1
        style={{
          color: "#232323",
          fontSize: "30px",
          fontFamily: "inter",
          fontWeight: "700",
        }}
      >
        Add your personal information
      </h1>

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
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: "50px",
              paddingLeft: "10px",
            }}
          >
            <IonSelect
              name="state"
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
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          
          />
        </div>

        {/* </IonItem> */}
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomBtn1 fun={handelBtnClick} title={"Continue"} />
      </div>
    </div>
  );
};

export default Basicinfo;
