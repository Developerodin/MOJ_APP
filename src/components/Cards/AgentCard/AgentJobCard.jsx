import React, { useState } from 'react';
import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import EditPost from './EditPost';
// import deleteIcon from './deleteicon.png';


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

const AgentJobCard = ({ data }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const history = useHistory(); // Initialize useHistory

  const handleEditClick = () => {
    const id = data.id;
    history.push(`/edit-post/${id}`); 
    setCurrentData(data);
    console.log('Edit clicked', data.id);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  
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

      
    } else {
      console.error(`Invalid department data for staff with ID ${staff.id}`); 
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
    <div onClick={handleEditClick}>
      <IonCard style={{ width: '100%', padding: '0px', border: "1px solid #E4E4E4", borderRadius: "15px", background: "#f2f4fe", margin: '0px',marginTop:'12px' }}>
        <IonCardContent style={{ padding: '10px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', color: '#395CFF', fontWeight: 'bold' }}>{getDaysAgo(data.created_at)}</div>
              {/* <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px', float: 'right' }} /> */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', color: 'black', fontWeight: 'bold' }}>
                {mainDepartment[0]}
              </span>
              {additionalDepartmentsCount > 0 && (
                <span style={{ fontSize: '10px', color: '#395CFF', fontWeight: 'lighter', marginLeft: '5px', background: '#D5DDFF', borderRadius: '59px', height: '19px', width: '15px', display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                  +{additionalDepartmentsCount}
                </span>

              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '5px' }}>
              <IonIcon icon={locationOutline} style={{ color: 'crimson', fontSize: '18px', fontWeight: 'bold' }} />
              <span style={{ fontSize: '13px', marginLeft: '5px', color: 'black' }}>{data.preferred_city} ({data.preferred_state})</span>
            </div>
            <div style={{ marginTop: '10px' }}>
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

export default AgentJobCard;
