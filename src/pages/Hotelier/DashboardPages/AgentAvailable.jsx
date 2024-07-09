import React, { useState, useEffect,useContext } from 'react';
import { IonContent, IonIcon, IonPage, IonGrid, IonRow, IonCol,IonSearchbar } from '@ionic/react';
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders';
import { personOutline } from 'ionicons/icons';

import { isMobile } from '../../../IsMobile/IsMobile';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import AgentAvailableCard from '../../../components/Cards/AgentCard/AgentAvailableCard';
import { AppContext } from "../../../Context/AppContext";


export const AgentAvailable = () => {
  const { postUpdate } = useContext(AppContext);
  const [agents, setAgents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [displayedCandidates, setDisplayedCandidates] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${Base_url}auth/agent_get`, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });

        if (response.data && response.data.Job) {
          const agentData = response.data.Job; 
          console.log("Fetched agents:", agentData); 
          setAgents(agentData);
          fetchPosts(agentData.map(agent => agent.user.user_id));
        } else {
          console.error("Unexpected agent response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    const fetchPosts = async (userIds) => {
      try {
        const postRequests = userIds.map(userId =>
          axios.post(`${Base_url}auth/agent_post/show_byuser_id/${userId}`, {}, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })
        );
        const postResponses = await Promise.all(postRequests);

        
        const validResponses = postResponses.filter(response => response && response.data && response.data.Post);
        const postsData = validResponses.flatMap(response => response.data.Post); 
        console.log("Fetched posts:", postsData); 
        setPosts(postsData);
        setDisplayedCandidates(postsData); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAgents();
    
  }, [ postUpdate]);

  const handleSearch = () => {
    console.log('Searching for:', searchText);
    
  };


  if (!agents || !posts) {
    return <div>Loading...</div>;
  }

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          <ProfileHeaders icon={<IonIcon icon={personOutline} style={{ fontSize: "26px", color: "#395CFF" }} />} title={"Agent Available"} />

          <div style={{ marginTop: "30px" }}>
    
      <IonSearchbar
        value={searchText}
        onIonChange={e => setSearchText(e.detail.value)} 
        onIonClear={() => setSearchText('')} 
        onIonCancel={() => setSearchText('')} 
        onIonBlur={handleSearch} 
        
      ></IonSearchbar>
    </div>

          <IonGrid >
            {displayedCandidates.length === 0 && (
              <p>No agents available</p>
            )}
            <IonRow>
              {displayedCandidates.map((candidate) => (
                <IonCol size="12" size-md="6" key={candidate.id}>
                  <AgentAvailableCard data={candidate} agents={agents} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};
