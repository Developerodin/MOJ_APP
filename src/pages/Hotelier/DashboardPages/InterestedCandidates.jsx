import { IonContent, IonIcon, IonPage } from '@ionic/react'
import React, {useEffect,useState,useContext } from 'react'
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders'
import { bagOutline } from 'ionicons/icons'
import { CandidateCard } from '../../../components/Cards/CandidateCard'
import { isMobile } from '../../../IsMobile/IsMobile'
import { CandidateSearchCard } from '../../../components/Cards/CandidateSearchCard'
import axios from 'axios'
import { Base_url } from '../../../Config/BaseUrl'
import { AppContext } from '../../../Context/AppContext'






export const InterestedCandidates = () => {
  const { languageUpdate} = useContext(AppContext);

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
        <div className={isMobile ? "" : 'sw'} style={{padding:"20px"}}>
            <ProfileHeaders icon={<IonIcon icon={bagOutline} style={{fontSize:"24px",color:"#395CFF"}} />} title={selectedLanguage === "English" ? "Interested Candidates" : "इच्छुक उम्मीदवार"}  />
           
            <div style={{marginTop:"30px"}}>
                {candidates.map((candidate) => (
                    <CandidateSearchCard key={candidate.user_id} data={candidate}/>
                ))}
            </div>
        </div>
    </IonContent>
</IonPage>
  )
}
