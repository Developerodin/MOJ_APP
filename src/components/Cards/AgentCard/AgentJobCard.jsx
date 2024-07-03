import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import EditPost from './EditPost';
import { useIonActionSheet } from '@ionic/react';


export const AgentJobCard = ({ data, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [present] = useIonActionSheet();

  const handleEditClick = (data) => {
    setCurrentData(data);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    onDelete(data);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  

  return (
    <div style={{ width: "100%" }} onClick={() => handleEditClick(data)}>
      <IonCard style={{ padding: '0px', border: "1px solid #E4E4E4", borderRadius: "15px", background: "#f2f4fe", margin: '10px' }}>
        <IonCardContent style={{ padding: '15px' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#395CFF' }}>{data.daysAgo} days ago</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', color: 'black', fontWeight: 'bold' }}>{data.position}</span>
              
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '10px' }}>
              <IonIcon icon={locationOutline} style={{ color: 'crimson', fontSize: '18px', fontWeight: 'bold' }} />
              <span style={{ fontSize: '13px', marginLeft: '2px', marginTop: '3px', color: 'black' }}>{data.location}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '8px' }}>
              <span style={{ fontSize: '15px', marginLeft: '3px', color: 'black',fontWeight:'bold' }}>Position: {data.availableStaff}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ fontSize: '15px', marginLeft: '3px', color: 'black',fontWeight:'bold' }}>Available Staff: {data.availableStaff}</span>
            </div>
          </div>
        </IonCardContent>
      </IonCard>

      {isEditModalOpen && (
        <EditPost
          data={currentData}
          onClose={handleCloseModal}
          onSave={onEdit}
        />
      )}
    </div>
  );
};
