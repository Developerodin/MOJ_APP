import React, { useState } from 'react';
import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import EditPost from './EditPost';


const getDaysAgo = (createdDate) => {
  const today = new Date();
  const createdAt = new Date(createdDate);
  const diffTime = Math.abs(today - createdAt);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'today';
  } else if (diffDays === 1) {
    return '1 day ago';
  } else {
    return `${diffDays} days ago`;
  }
};

const AgentAvailableCard = ({ data, agents }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const history = useHistory();

  const handleViewClick = () => {
    const id = data.id;
    history.push(`/agent-view/${id}`); 
    setCurrentData(data);
    console.log('View clicked', data.id);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const agent = agents.find(agent => agent.user_id === data.user_id);

  if (!agent) {
    return null;
  }

  const staffDetails = JSON.parse(data.staff_details);

  const groupedDetails = staffDetails.reduce((acc, staff) => {
    if (Array.isArray(staff.department)) {
      staff.department.forEach(department => {
        if (!acc[department]) {
          acc[department] = { positions: [], availableStaff: 0 };
        }
        acc[department].positions.push(staff.positionTitle);
        acc[department].availableStaff += parseInt(staff.availableStaff, 10);
      });
    }
    return acc;
  }, {});

  const departmentEntries = Object.entries(groupedDetails);
  const mainDepartment = departmentEntries.reduce((maxDept, dept) => {
    return dept[1].availableStaff > maxDept[1].availableStaff ? dept : maxDept;
  }, departmentEntries[0]);

  const additionalDepartmentsCount = departmentEntries.length - 1;

  const allPositions = staffDetails.map(staff => staff.positionTitle).join(', ');
  const allAvailableStaff = staffDetails.map(staff => staff.availableStaff).join(', ');

  return (
    <div onClick={handleViewClick}>
      <IonCard style={{ width: '100%', padding: '0px', border: "1px solid #E4E4E4", borderRadius: "15px", background: "#f2f4fe", margin: '0px',marginTop:'10px' }}>
        <IonCardContent style={{ padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={agent.user_img} alt="Agent" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <div style={{ marginLeft: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold',color:'#232323' }}>{agent.user.name}</div>
              <div style={{ fontSize: '14px', color: '#232323' }}>{agent.user.gst_name}</div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ fontSize: '12px', color: '#395CFF', fontWeight: 'bold' }}>{getDaysAgo(data.created_at)}</div>
              
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '0px' }}>
              <span style={{ fontSize: '18px', color: 'black', fontWeight: 'bold' }}>
                {mainDepartment[0]}
              </span>
              {additionalDepartmentsCount > 0 && (
                <span style={{ fontSize: '10px', color: '#395CFF', fontWeight: 'lighter', marginLeft: '5px', background: '#D5DDFF', borderRadius: '59px', height: '19px', width: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  +{additionalDepartmentsCount}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '2px' }}>
              <IonIcon icon={locationOutline} style={{ color: 'crimson', fontSize: '18px', fontWeight: 'bold' }} />
              <span style={{ fontSize: '13px', marginLeft: '5px', color: 'black' }}>{data.preferred_city} ({data.preferred_state})</span>
            </div>
            <div style={{ marginTop: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '8px' }}>
                  <span style={{ fontSize: '15px', marginLeft: '3px', color: 'black' }}>Position: {allPositions}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '15px', marginLeft: '3px', color: 'black' }}>Available Staff: {allAvailableStaff}</span>
                </div>
              </div>
            </div>
          </div>
        </IonCardContent>
      </IonCard>

      {isEditModalOpen && (
        <EditPost
          data={currentData}
          onClose={handleCloseModal}
          onSave={() => {}}
        />
      )}
    </div>
  );
};

export default AgentAvailableCard;
