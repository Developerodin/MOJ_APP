import React, { useState, useEffect, useContext } from 'react';
import {
  IonContent,
  IonIcon,
  IonPage,
  IonGrid,
  IonRow,
  IonButton,
  IonModal,
  IonCol,
  useIonRouter,
} from '@ionic/react';
import { searchOutline, addOutline } from 'ionicons/icons';
import AgentJobCard from '../../../components/Cards/AgentCard/AgentJobCard';
import profileImg from './profileImg2.png';
import equilizer from './equalizer.png';
import { isMobile } from '../../../IsMobile/IsMobile';
import CreatePostModal from '../../../components/Cards/AgentCard/CreatePost';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import noPost from './noPost.png';
import { AppContext } from "../../../Context/AppContext";

export const AgentHome = () => {
  const history = useIonRouter();
  const { postUpdate ,editUpdate } = useContext(AppContext);
  const [profilePic, setProfilePic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]); 
  const [uniqueCities, setUniqueCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

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
        setJobs(data.Post); // Store the job data

        
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
    getJobs(); // Fetch job data when the component mounts
  }, [postUpdate]);

  useEffect(() => {
    getProfileImg();
  }, [editUpdate]);

  const handleProfileClick = () => {
    history.push(`/app/profile`);
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const filteredJobs = jobs.filter((job) => job.preferred_city === selectedCity);

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
            <div>
              <img src={equilizer} alt="Filter" />
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <div
              style={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                border: '1px solid #E5E5E5',
                background: '#F4F4F4',
                height: '48px',
                borderRadius: '50px',
              }}
            >
              <IonIcon icon={searchOutline} style={{ fontSize: '24px' }} />
              <input
                type="text"
                placeholder="Search.."
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

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px' }}>
            <h2 style={{ fontWeight: 'bold' }}>Availability</h2>
            <IonButton onClick={() => setIsModalOpen(true)}>
              <IonIcon icon={addOutline} style={{ marginRight: '8px' }} />
              Add New
            </IonButton>
          </div>

          <div style={{ display: 'flex',marginTop:'10px' }}>
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
            <div style={{color:'#787878',fontSize:'13px',marginTop:'8px'  }}>* Select a city to get specific posts</div>

          <div style={{marginTop:'10px'}}>
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <img src={noPost} alt="No Posts" />
                </div>
              )}
            </IonGrid>
          </div>

          <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
            <CreatePostModal onClose={() => setIsModalOpen(false)} />
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};
