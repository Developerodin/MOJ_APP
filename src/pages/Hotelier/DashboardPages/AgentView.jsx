import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import { IonContent, IonPage, IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { locationOutline, arrowBackOutline ,chatbubbleEllipsesOutline} from 'ionicons/icons';

export const AgentView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [agentData, setAgentData] = useState(null);
  const [postDetails, setPostDetails] = useState(null);



  const navigateToChat = () => {
    const id = agentData.user_id;
    console.log("Navigating to chat with ID:", id); 
    history.push(`/agent-personal-chat/${id}`);
    
  };  

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        // Fetch job post details by post ID
        const postResponse = await axios.post(`${Base_url}auth/agent_post/show_byid/${id}`, {}, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (postResponse.data && postResponse.data.Post) {
          const postData = postResponse.data.Post[0];
          setPostDetails(postData);

          // Fetch agent details using user_id from post data
          const agentResponse = await axios.get(`${Base_url}auth/agent_get`, {
            headers: { "Content-Type": "multipart/form-data" }
          });

          if (agentResponse.data && agentResponse.data.Job) {
            const agent = agentResponse.data.Job.find(agent => agent.user.user_id === postData.user_id);
            setAgentData(agent);
          } else {
            console.error("Unexpected agent response structure:", agentResponse.data);
          }
        } else {
          console.error("Unexpected post response structure:", postResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAgentData();
  }, [id]);

  if (!agentData || !postDetails) {
    return <div>Loading...</div>;
  }

  const staffDetails = JSON.parse(postDetails.staff_details);

  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <IonIcon icon={arrowBackOutline} style={{ fontSize: '24px', cursor: 'pointer' }} onClick={() => history.goBack()} />
          </div>
            <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <img src={agentData.user_img} alt="Agent" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              <div style={{ marginLeft: '10px' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#232323' }}>{agentData.user.name}</div>
                <div style={{ fontSize: '14px', color: '#232323' }}>{agentData.user.gst_name}</div>
              </div>
            </div>
            <div onClick={navigateToChat} style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"30px 50px 0px 50px",backgroundColor:'#F0F0F0',borderRadius:'10px',height:'52px'}}>
                <div>
                    <IonIcon style={{fontSize:"25px",color:"grey"}} icon={chatbubbleEllipsesOutline}></IonIcon>
                </div>
                <div style={{marginLeft:"20px"}} >
                    <span style={{fontSize:"18px",color:"grey"}}>Connect with the Agent</span>
                </div>
            </div>
          {staffDetails.map((staff, index) => (
            <IonCard key={index} style={{ borderRadius: '10px', backgroundColor: '#F6F6F6',padding:'0px 10px',marginTop:'30px' }}>
              <IonCardContent style={{display:'inline'}}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px',color:'black' }}>{staff.department[0]}</div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <IonIcon icon={locationOutline} style={{ color: 'crimson', fontSize: '18px' }} />
                  <span style={{ fontSize: '13px', marginLeft: '5px', color: 'black' }}>{postDetails.preferred_city} ({postDetails.preferred_state})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '15px', color: '#232323',fontWeight:'600' }}>
                      Position
                    </div>
                    <div style={{ fontSize: '15px', color: '#5A5A5A', backgroundColor: '#F0F0F0', padding: '5px 10px', borderRadius: '5px',fontWeight:'500' }}>
                      {staff.positionTitle}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: '15px', color: '#232323',fontWeight:'600' }}>
                      Available Staff
                    </div>
                    <div style={{ fontSize: '15px', color: 'white', backgroundColor: '#395CFF', padding: '6px 10px', borderRadius: '5px', width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center',fontWeight:'500' }}>
                      {staff.availableStaff}
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};
