import React, { useState, useEffect } from 'react';
import { IonContent, IonIcon, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders';
import { bagOutline } from 'ionicons/icons';

import { isMobile } from '../../../IsMobile/IsMobile';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import AgentAvailableCard from '../../../components/Cards/AgentCard/AgentAvailableCard';

export const AgentAvailable = () => {
  const [agents, setAgents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [displayedCandidates, setDisplayedCandidates] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${Base_url}auth/agent_get`, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });

        if (response.data && response.data.Job) {
          const agentData = response.data.Job; // Accessing the Job array
          console.log("Fetched agents:", agentData); // Log the fetched agent data
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

        // Filter out null responses
        const validResponses = postResponses.filter(response => response && response.data && response.data.Post);
        const postsData = validResponses.flatMap(response => response.data.Post); // Accessing the Post array
        console.log("Fetched posts:", postsData); // Log the fetched posts data
        setPosts(postsData);
        setDisplayedCandidates(postsData); // Initially display all posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          <ProfileHeaders icon={<IonIcon icon={bagOutline} style={{ fontSize: "24px", color: "#395CFF" }} />} title={"Agent Available"} />

          <IonGrid style={{ marginTop: "30px" }}>
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
