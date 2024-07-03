import React, { useState } from 'react';
import {
  IonContent,
  IonIcon,
  IonPage,
  IonGrid,
  IonRow,
  IonButton,
  IonModal,
} from '@ionic/react';
import { searchOutline, addOutline } from 'ionicons/icons';
import { AgentJobCard } from '../../../components/Cards/AgentCard/AgentJobCard';
import profileImg from './profileImg2.png';
import equilizer from './equalizer.png';
import { isMobile } from '../../../IsMobile/IsMobile';
import CreatePostModal from '../../../components/Cards/AgentCard/CreatePost';

export const AgentHome = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handelProfileClick = () => {
    history.push('/app/profile');
  };

  const jobs = [
    { id: 1, daysAgo: 3, position: 'Housekeeping', location: 'Jaipur (Raj.)', availableStaff: 10 },
    { id: 2, daysAgo: 3, position: 'Housekeeping', location: 'Ajmer (Raj.)', availableStaff: 10 },
    { id: 3, daysAgo: 6, position: 'Manager', location: 'Bhilwara ', availableStaff: 10 }
  ];

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

          <div style={{ display: 'flex', justifyContent: 'space-between',padding:'8px 12px' }}>
            <h2 style={{fontWeight:'bold'}}>Availability</h2>
            <IonButton onClick={() => setIsModalOpen(true)}>
              <IonIcon icon={addOutline} style={{ marginRight: '8px' }} />
              Add New
            </IonButton>
          </div>

          <IonGrid style={{ padding: 0, margin: 0 }}>
            <IonRow>
              {jobs.map((job) => (
                <AgentJobCard key={job.id} data={job} />
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
