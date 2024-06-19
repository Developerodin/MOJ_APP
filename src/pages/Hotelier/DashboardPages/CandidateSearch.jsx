import React, { useState, useEffect } from 'react';
import { IonContent, IonIcon, IonPage, IonSearchbar } from '@ionic/react';
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders';
import { bagOutline } from 'ionicons/icons';
import { CandidateSearchCard } from '../../../components/Cards/CandidateSearchCard';
import { isMobile } from '../../../IsMobile/IsMobile';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';

export const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${Base_url}all_user_data_without_id`, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        setCandidates(response.data.Job); // Assuming response.data.Job is an array of candidates
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          <ProfileHeaders icon={<IonIcon icon={bagOutline} style={{ fontSize: "24px", color: "#395CFF" }} />} title={"Candidate Search"} />
          
          <div style={{ marginTop: "30px" }}>
            <IonSearchbar value={searchText} onIonChange={(e) => setSearchText(e.detail.value)}></IonSearchbar>
          </div>

          <div style={{ marginTop: "30px" }}>
            {candidates.filter(candidate => {
              const name = candidate.user ? `${candidate.user.name} ${candidate.user.last_name}` : "Anonymous";
              return name.toLowerCase().includes(searchText.toLowerCase()) || 
                     candidate.job_title.toLowerCase().includes(searchText.toLowerCase()) ||
                     candidate.city.toLowerCase().includes(searchText.toLowerCase());
            }).map((candidate) => (
              <CandidateSearchCard key={candidate.user_id} data={candidate} />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
