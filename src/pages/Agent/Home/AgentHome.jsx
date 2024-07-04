import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonIcon,
  IonPage,
  IonGrid,
  IonRow,
  IonButton,
  IonModal,
  IonCol,
} from '@ionic/react';
import { searchOutline, addOutline } from 'ionicons/icons';
import AgentJobCard from '../../../components/Cards/AgentCard/AgentJobCard';
import profileImg from './profileImg2.png';
import equilizer from './equalizer.png';
import { isMobile } from '../../../IsMobile/IsMobile';
import CreatePostModal from '../../../components/Cards/AgentCard/CreatePost';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';

export const AgentHome = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]); // State to store job data

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

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
      console.log("Data get from job ==>", data);

      if (data.status === "success") {
        setJobs(data.Post); // Store the job data
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getJobs(); // Fetch job data when the component mounts
  }, []);

  const handelProfileClick = () => {
    history.push('/app/profile');
  };

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : "sw"} style={{ padding: "20px" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div onClick={handelProfileClick} style={{ position: 'relative' }}>
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

          <IonGrid >
            <IonRow>
              {jobs.map((job) => (
                
                <IonCol size="12" size-md="6" key={job.id}>
                  
                  <AgentJobCard data={job} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>

        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <CreatePostModal onClose={() => setIsModalOpen(false)} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
