import React, { useState, useEffect, useContext } from 'react';
import {
  IonContent,
  IonIcon,
  IonPage,
  IonGrid,
  IonRow,
  IonButton,
  IonCol,
  useIonRouter,
} from '@ionic/react';
import { searchOutline, addOutline } from 'ionicons/icons';
import AgentJobCard from '../../../components/Cards/AgentCard/AgentJobCard';
import profileImg from './profileImg2.png';
import equilizer from './equalizer.png';
import { isMobile } from '../../../IsMobile/IsMobile';

import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import noPost from './noPost.png';
import { AppContext } from "../../../Context/AppContext";
import Agent from './agent.png';

export const AgentHome = () => {
  const history = useIonRouter();
  const { postUpdate, editUpdate ,languageUpdate } = useContext(AppContext);
  const [profilePic, setProfilePic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  useEffect(() => {
    
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  const getProfileImg = async () => {
    try {
      const url = `${Base_url}profile_img_saved/Byuserid/${userDetails.user_id}`;
      const formData1 = new FormData();

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      console.log("Response check work experience", data, response);

      if (data.status === "success") {
        const Data = data.img;
        setProfilePic(Data.image_path);
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getJobs = async () => {
    try {
      const url = `${Base_url}auth/agent_post/show_byuser_id/${userDetails.user_id}`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      console.log("Job Data ==>", data);
      

      if (data.status === "success" && Array.isArray(data.Post)) {
        setJobs(data.Post);

        const cities = data.Post.map((job) => job.preferred_city);
        const uniqueCities = [...new Set(cities)];
        setUniqueCities(uniqueCities);
        setSelectedCity(uniqueCities[0]);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    getJobs();
  }, [postUpdate]);

  useEffect(() => {
    getProfileImg();
  }, [editUpdate]);

  const handleProfileClick = () => {
    history.push(`/app/profile`);
  };
 
  const handlePostClick = () => {
    history.push(`/Post`);
  };
  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const filteredJobs = jobs.filter((job) => {
    const staffDetails = JSON.parse(job.staff_details);
    return job.preferred_city === selectedCity &&
      staffDetails.some(detail => 
        detail.department.some(dep => dep.toLowerCase().includes(searchQuery.toLowerCase())) ||
        detail.positionTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
  });

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div onClick={handleProfileClick} style={{ position: 'relative' }}>
              <img
                src={profilePic || profileImg}
                style={{
                  width: '62px',
                  height: '62px',
                  border: '2px solid #F0F3FF',
                  borderRadius: '40px',
                }}
              />
              
              <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)' }}>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '5px 10px',
                    background: '#51B248',
                    borderRadius: '17px',
                  }}
                >
                  Available
                </span>
              </div>
            </div>
            <div style={{ marginTop: '0px' }}>
            <div
              style={{
                padding: '7px',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                border: '1px solid #E5E5E5',
                background: '#F4F4F4',
                height: '36px',
                borderRadius: '50px',
                margin:'0px 10px',
              }}
            >
              <IonIcon icon={searchOutline} style={{ fontSize: '24px' }} />
              <input
                type="text"
                placeholder={selectedLanguage === "English" ? "Search" : "खोजें"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  height: '100%',
                  fontSize: '16px',
                  marginLeft: '10px'
                }}
              />
            </div>
          </div>
            <div>
              <img src={equilizer} alt="Filter" />
            </div>
          </div>

          

          <div style={{ display: 'flex', justifyContent: 'space-between',  alignItems: 'center',padding: '8px 12px' }}>
            <h2 style={{ fontWeight: 'bold' }}>{ selectedLanguage === "English" ? "Availability" : "उपलब्धता"}</h2>
            <button onClick={handlePostClick} style={{borderRadius:'7px',background:'#395CFF',color:'white',padding:'12px 16px',height:'41px',width:'120px',fontWeight:'600', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
  <IonIcon icon={addOutline} style={{ marginRight: '8px', fontSize: '16px' }} />
  { selectedLanguage === "English" ? "Add New" : "नया जोड़ें"}
</button>
          </div>

          <div style={{ display: 'flex', marginTop: '10px' }}>
            {uniqueCities.map((city) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                style={{
                  padding: '10px 18px 10px 18px',
                  margin: '0 10px 0 0',
                  borderRadius: '7px',
                  border: selectedCity === city ? '1px solid #007bff' : '1px solid #e0e0e0',
                  background: selectedCity === city ? '#007bff' : '#F4F4F4',
                  color: selectedCity === city ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
              >
                {city}
              </button>
            ))}
          </div>
          <div style={{color:'#787878',fontSize:'13px',marginTop:'8px'  }}>
            {selectedLanguage === "English" ? "* Select a city to get specific posts" : "* विशिष्ट पोस्ट प्राप्त करने के लिए एक शहर चुनें"}
          </div>

          <div >
            <IonGrid>
              {filteredJobs.length > 0 ? (
                <IonRow>
                  {filteredJobs.map((job) => (
                    <IonCol size="12" size-md="6" key={job.id}>
                      <AgentJobCard data={job} />
                    </IonCol>
                  ))}
                </IonRow>
              ) : (
                <div onClick={handlePostClick} style={{
                  marginTop:"50px", 
                  border:"1px solid #BDBDBD",
                 
                  borderRadius:"15px"
                  ,position:"relative",
                   height:"200px",
                }}>
                  <div style={{padding:"15px" }}>
                      <div>
                       <span style={{fontWeight:"bold",fontSize:"18px"}}>
                         
                         {selectedLanguage === "English" ? "Welcome Agent " : "एजेंट का स्वागत है"}
                        
                         
                         </span>
                      </div>
                      <div style={{paddingTop:'10px'}}>
                       <span style={{fontWeight:"700",fontSize:"16px"}}>
                         
                       {selectedLanguage === "English" ? "Start by creating a post to share manpower availability" : "मैनपावर उपलब्धता साझा करने के लिए एक पोस्ट बनाकर शुरू करें"}
                        
                         
                         </span>
                      </div>
       
                      <div onClick={handlePostClick} style={{position:"absolute",left:20,bottom:"20px"}}>
                         <span style={{textDecoration:"underline"}}>
                           
                           {selectedLanguage === "English" ? "Click here to create a post" : "पोस्ट बनाने के लिए यहां क्लिक करें"}
                           </span>
                      </div>
       
                      <div style={{position:"absolute",bottom:40,right:10, height:'80px',width:'80px'}}>
                         <div>
                         <img src={Agent}   />
                         </div>
                      </div>
           
                    </div>
                </div>
              )}
            </IonGrid>
          </div>

         
        </div>
      </IonContent>
    </IonPage>
  );
};

