import React, { useState, useEffect,useContext } from 'react';
import { IonContent, IonIcon, IonPage, IonSearchbar } from '@ionic/react';
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders';
import { bagOutline } from 'ionicons/icons';
import { CandidateSearchCard } from '../../../components/Cards/CandidateSearchCard';
import { isMobile } from '../../../IsMobile/IsMobile';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import { AppContext } from '../../../Context/AppContext';

export const CandidateSearch = () => {
  const { languageUpdate } = useContext(AppContext);
  const [candidates, setCandidates] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
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
        setCandidates(response.data.Job); // Assuming response.data.Job is an array of candidates
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const filterCandidates = (candidates, searchText) => {
    const lowerCaseSearchText = searchText.toLowerCase();

    return candidates.filter(candidate => {
      const fullName = candidate.user ? `${candidate.user.name} ${candidate.user.last_name}`.toLowerCase() : "anonymous";
      const city = candidate.user && candidate.user.city ? candidate.user.city.toLowerCase() : "";

      return fullName.includes(lowerCaseSearchText) || city.includes(lowerCaseSearchText);
    });
  };

  const handleSearch = (e) => {
    const newSearchText = e.detail.value;
    setSearchText(newSearchText);

    if (newSearchText === "") {
      setSearchPerformed(false); 
    } else {
      setSearchPerformed(true);
    }
  };

  const displayedCandidates = searchPerformed ? filterCandidates(candidates, searchText) : [];

  return (
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          <ProfileHeaders icon={<IonIcon icon={bagOutline} style={{ fontSize: "24px", color: "#395CFF" }} />} title={selectedLanguage === "English" ? "Candidate Search" : "उम्मीदवार खोज"} />
          
          <div style={{ marginTop: "30px" }}>
            <IonSearchbar value={searchText} onIonChange={handleSearch}></IonSearchbar>
          </div>

          <div style={{ marginTop: "30px" }}>
            {searchPerformed && displayedCandidates.length === 0 && (
              <p>No candidates found</p>
            )}
            {displayedCandidates.map((candidate) => (
              <CandidateSearchCard key={candidate.user_id} data={candidate} />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
