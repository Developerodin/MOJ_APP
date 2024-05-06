import React, { useContext, useEffect, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/react';
import { CustomBtn1 } from '../Buttons/CustomBtn1';
import { ProfileHeaders } from '../Headers/ProfileHeaders';
import { bagHandleOutline, bookOutline, chevronBackOutline } from 'ionicons/icons';
import { AppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';

const SelectMulipalCityModel = ({ isOpen, onClose, setPreferredCity, preferredCity, selectedState }) => {
    const { showToast } = useContext(AppContext);
    const userDetails = JSON.parse(localStorage.getItem("userDetails") || localStorage.getItem("userRegisterDetails"));
    const token = localStorage.getItem("token");
    const [cityData, setCityData] = useState([]);
    const [results, setResults] = useState([]);
     const [selectedCitiesL,setSelectedCitiesL] = useState([])
    const handleInput = (ev) => {
      let query = '';
      const target = ev.target;
      if (target) query = target.value.toLowerCase();
  
      setResults(cityData.filter((d) => d.toLowerCase().indexOf(query) > -1));
    };
  
    const AddAddressData = async () => {
      try {
        const url = `${Base_url}basic/all_city`;
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Bearer ${token}`,
          }
        });
        const data = response.data;
        if (data.status === "success") {
          const Data = data.post;
          const uniqueStates = [...new Set(Data.filter(item => item.state_name === selectedState))];
          const uniqueCities = [...new Set(uniqueStates.map(item => item.city_name))];
          setCityData(uniqueCities);
          setResults(uniqueCities);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const handleCitySelect = (city) => {
      // Toggle selection of city
      const isSelected = selectedCitiesL.includes(city);
      if (isSelected) {
        setSelectedCitiesL(selectedCitiesL.filter(selectedCity => selectedCity !== city));
      } else {
        setSelectedCitiesL([...selectedCitiesL, city]);
      }
    };
  
    useEffect(() => {
      AddAddressData();
    }, [selectedState]);

    const handleSubmit =()=>{
        const citiesString = selectedCitiesL.join(', ');
        console.log("selectedCitiesL =>",citiesString);
        setPreferredCity(citiesString);
        onClose();
    }

  useEffect(()=>{
    setSelectedCitiesL([])
    if(preferredCity !== ""){
       
        const selectedC = preferredCity.split(',').map(city => city.trim());
        setSelectedCitiesL(selectedC);
        console.log("PRevious data ==>",preferredCity)
    }
   
  },[isOpen])
  
    return (
      <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <IonContent>
          <div style={{ padding: "20px" }}>
            <div>
              <div>
                <IonIcon onClick={onClose} icon={chevronBackOutline} style={{ fontSize: "24px" }} />
              </div>
              <div>
                <IonSearchbar debounce={1000} onIonInput={(ev) => handleInput(ev)}></IonSearchbar>
                <IonList>
                  {results.map((result, index) => (
                    <IonItem key={index} style={{ border: `${selectedCitiesL.includes(result) ? "1px solid blue" : ""}` }} onClick={() => handleCitySelect(result)}>{result}</IonItem>
                  ))}
                </IonList>
              </div>
              <div style={{ background: "#fff", padding: "10px", width: "100%", position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <CustomBtn1 fun={handleSubmit} title={"Save"} />
              </div>
            </div>
          </div>
        </IonContent>
      </IonModal>
    );
  };

export default SelectMulipalCityModel;
