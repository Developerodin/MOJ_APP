import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React, { useEffect, useState, useContext } from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagOutline } from 'ionicons/icons'
import { CandidateSearchCard } from '../../../components/Cards/CandidateSearchCard'
import axios from 'axios'
import { Base_url } from '../../../Config/BaseUrl'
import { AppContext } from '../../../Context/AppContext'
import { isMobile } from '../../../IsMobile/IsMobile'

export const InterestedCandidates = () => {
  const { languageUpdate } = useContext(AppContext);

  const [candidates, setCandidates] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );

  useEffect(() => {
    const languageFromStorage = localStorage.getItem("selectedLanguage");
    if (languageFromStorage) {
      setSelectedLanguage(languageFromStorage);
    }
  }, [languageUpdate]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${Base_url}all_user_data_without_id`, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });

        if (response.data && Array.isArray(response.data.Job)) {
          setCandidates(response.data.Job); // Assuming response.data.Job is an array of candidates
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(candidate => {
    if (candidate.user && candidate.user.role) {
      return candidate.user.role === "Job Seeker";
    } else {
      console.error("Candidate structure issue:", candidate);
      return false;
    }
  });

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          <ProfileHeaders 
            icon={<IonIcon icon={bagOutline} style={{ fontSize: "24px", color: "#395CFF" }} />} 
            title={selectedLanguage === "English" ? "Interested Candidates" : "इच्छुक उम्मीदवार"} 
          />
          <div style={{ marginTop: "30px" }}>
            {filteredCandidates.map((candidate) => (
              <CandidateSearchCard key={candidate.user_id} data={candidate} />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
