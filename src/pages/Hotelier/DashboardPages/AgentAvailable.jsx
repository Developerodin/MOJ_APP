import React, { useState, useEffect, useContext } from 'react';
import { IonContent, IonIcon, IonPage, IonGrid, IonRow, IonCol, IonSearchbar, IonSpinner,IonRefresher,
  IonRefresherContent, } from '@ionic/react';
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders';
import { personOutline } from 'ionicons/icons';

import { isMobile } from '../../../IsMobile/IsMobile';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import AgentAvailableCard from '../../../components/Cards/AgentCard/AgentAvailableCard';
import { AppContext } from "../../../Context/AppContext";
import {

  searchOutline,

} from "ionicons/icons";
export const AgentAvailable = () => {
  const { postUpdate ,languageUpdate} = useContext(AppContext);
  const [agents, setAgents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [displayedCandidates, setDisplayedCandidates] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  useEffect(() => {
    
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);

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
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      setLoading(false);
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
    } finally {
      setLoading(false);  // Set loading to false after fetching
    }
  };


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
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
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
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchAgents();
  }, [postUpdate]);

  const handleSearch = (e) => {

    const query = e.target.value.toLowerCase();
    console.log("query ===>",query)
    setSearchText(query);

    if (query === '') {
      setDisplayedCandidates(posts);
    } else {
      const filteredCandidates = posts.filter(post => {
        const staffDetails = JSON.parse(post.staff_details);
        console.log("stafffff",staffDetails);
        return staffDetails.some(detail => 
          detail.department && detail.department.some(dep => dep.toLowerCase().includes(query)) ||
          detail.positionTitle.toLowerCase().includes(query)
        );
      });
      console.log("filter apply ==>",filteredCandidates)
      setDisplayedCandidates(filteredCandidates);
    }
  };
  const handleRefresh = async (event) => {
    await fetchAgents();
    event.detail.complete(); // Signal Ionic that refresh is complete
  };

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          <ProfileHeaders icon={<IonIcon icon={personOutline} style={{ fontSize: "26px", color: "#395CFF" }} />} title={selectedLanguage === "English" ? "Agent Available" : "एजेंट उपलब्ध"} />
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent pullingText="Pull to refresh" refreshingSpinner="bubbles" />
        </IonRefresher>
          <div style={{ marginTop: "30px" }}>
            {/* <IonSearchbar
              value={searchText}
              onIonChange={(e)=>handleSearch(e)} 
              onIonClear={() => setSearchText('')} 
              onIonCancel={() => setSearchText('')} 
              onIonBlur={handleSearch} 
            ></IonSearchbar> */}

             <div
                          style={{
                            padding: "8px",
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "left",
                            border: "1px solid grey",
                            background: "#F4F4F4",
                            height: "36px",
                            borderRadius: "50px",
                            margin:'0px 10px',
                          }}
                        >
                          <div style={{marginTop:'-2px'}}>
                            <IonIcon icon={searchOutline} style={{ fontSize: "24px" }} />
                          </div>
                          <div style={{ marginLeft: "10px" }}>
                            <input
                              type="text"
                              placeholder="eg.cook, f&b..."
                              value={searchText}
                              onChange={handleSearch}
                              style={{
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                width: "100%",
                                height: "100%",
                                fontSize: "16px",
                              }}
                            />
                          </div>
                        </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <IonSpinner color="primary" style={{ fontSize: '3rem' }} />
              <p style={{ color: '#395CFF', marginTop: '10px' }}>Loading...</p>
            </div>
          ) : (
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
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
