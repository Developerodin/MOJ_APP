import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { Home } from './pages/Home/Home';
import Continue from './pages/OnBording/Continue';
import VerifyPhoneTwo from './pages/OnBording/VerifyphoneTwo';
import Newphone from './pages/OnBording/Newphone';
import Basicinfo from './pages/OnBording/Basicinfo';
import Personalinfo from './pages/OnBording/Personalinfo';
import Personalinfoedu from './pages/OnBording/Personalinfoedu';
import Workexperience from './pages/OnBording/Workexperience';
import NavBar from './pages/NavBar/NavBar';
import { ProfileWorkExperience } from './pages/Profile/ProfileTabs/WorkExperience';
import "./style.css"
import { ProfileEduction } from './pages/Profile/ProfileTabs/Eduction';
import { ProfilePersonalDetails } from './pages/Profile/ProfileTabs/PersonalDetails';
import { ProfileContactDetails } from './pages/Profile/ProfileTabs/ContactDetails';
import { ProfileJobPreference } from './pages/Profile/ProfileTabs/JobPreference';
import { HelpAndSupport } from './pages/Profile/ProfileTabs/HelpAndSupport';
import { UpdateProfilePhoto } from './pages/Profile/ProfileTabs/UpdateProfilePhoto';
import { Reward } from './pages/Reward/Reward';
import { PersonalDetails } from './pages/OnBording/PersonalDetails';
import { JobPref } from './pages/OnBording/JobPref';
import { JobDetails } from './pages/Jobs/JobDetails';
import { SavedJobs } from './pages/Jobs/SavedJobs';
import { ViewedJobs } from './pages/Jobs/ViewedJobs';
import { Settings } from './pages/Profile/ProfileTabs/Settings';
import PersonalChat from './components/Chats/PersonalChat';
import JobPersonalChat from './components/Chats/JobChat/JobPersonalChat';
import GroupChatting from './components/Chats/GroupChatting';
import SelectLang from './pages/OnBording/SelectLang';
import { AppContext } from './Context/AppContext';
import { useContext, useEffect, useState } from 'react';
import Toast from './pages/Toast/Toast';
import WorkExperienceEdit from './components/Models/WorkExperienceEdit';
import EducationEdit from './components/Models/EducationEdit';
import { ResumeView } from './pages/Resume/ResumeView';
import { PrivacyAndPolicy } from './pages/Profile/ProfileTabs/PrivacyAndPolicy';
import { TermAndServices } from './pages/Profile/ProfileTabs/TermAndServices';
import { AccountsAndNotifications } from './pages/Profile/ProfileTabs/AccountsAndNotifications';
import { ProfileHealth } from './pages/Profile/ProfileTabs/ProfileHealth';
import { Base_url } from './Config/BaseUrl';
import axios from 'axios';
import { HotelierPostJob } from './pages/Hotelier/Jobs/PostAJob';
import { ActiveJobs } from './pages/Hotelier/DashboardPages/ActiveJobs';
import { InActiveJobs } from './pages/Hotelier/DashboardPages/InActiveJobs';
import { CandidateAppliedJobs } from './pages/Hotelier/DashboardPages/CandidateAppliedJobs';
import { InterestedCandidates } from './pages/Hotelier/DashboardPages/InterestedCandidates';
import { CandidateSearch } from './pages/Hotelier/DashboardPages/CandidateSearch';
import { HotelerContactDetails } from './pages/Hotelier/Profile/ProfileTabs/HotelerContactDetails';
import { HotelierPersonalDetails } from './pages/Hotelier/Profile/ProfileTabs/HotelierPersonalDetails';
import { HotelierProfileHealth } from './pages/Hotelier/Profile/ProfileTabs/HotelierProfileHealth';
import { HotelierPackage } from './pages/Hotelier/Profile/ProfileTabs/HotelierPackage.jsx';
import { CandidateView } from './pages/Hotelier/Jobs/CandidateView';
import { JobCandidateView } from './pages/Hotelier/Jobs/JobCandidateView';
import { App as MainApp  } from "@capacitor/app";
import { HotelierPackageSelect } from './pages/OnBording/HotelierPackageSelect';
import SearchCandidateView from './pages/Hotelier/DashboardPages/SearchCandidateView';
import OnBordingCompletePage from './pages/OnBording/OnBordingCompletePage';
import { AgentPersonalDetails } from './pages/Agent/Profile/ProfileTabs/AgentPersonalDetails';
import { AgentContactDetails } from './pages/Agent/Profile/ProfileTabs/AgentContactDetails';
import { AgentEduction } from './pages/Agent/Profile/ProfileTabs/AgentEduction';

import { AgentProfileHealth } from './pages/Agent/Profile/ProfileTabs/AgentProfileHealth';
import EditPost from './components/Cards/AgentCard/EditPost';
import { AgentAvailable } from './pages/Hotelier/DashboardPages/AgentAvailable';
import { AgentView } from './pages/Hotelier/DashboardPages/AgentView';
import AgentPersonalChat from './components/Chats/AgentPeronalChat';


setupIonicReact();

const App = () => {
  
  const {toastStatus} = useContext(AppContext);
  
  let Auth = localStorage.getItem("Auth") || false;
  const Mobile = JSON.parse(localStorage.getItem("Mobile")) || false;
  const selectedLanguage = localStorage.getItem("selectedLanguage") || "English";
  const [backPressCount, setBackPressCount] = useState(0);

  const handleGoBack = () => {
    // Your custom back function logic here
    console.log('Back button pressed once');
    // Example: Navigate back in the app
    window.history.back();
  };

  useEffect(() => {
    const backButtonListener = MainApp.addListener('backButton', () => {
      if (backPressCount === 0) {
        setBackPressCount(1);
        handleGoBack();

        // Reset back press count after a delay
        setTimeout(() => {
          setBackPressCount(0);
        }, 2000); // 2 seconds
      } else if (backPressCount >= 2) {
        MainApp.exitApp(); // Close the app
      }
    });

    return () => {
      backButtonListener.remove();
    };
  }, [backPressCount]);

  const checkUser = async () => {
    try {
      
      const url = `${Base_url}get_user_mobile/${Mobile.phoneNumber}`;
      // const formData1 = new FormData();
      // formData1.append('mobile_number', Mobile.phoneNumber);

      const response = await axios.get(url,{
        headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization" :`Berear ${token}`,
     
        }
      });
          console.log("Response check mobile",response.data)

          if(response.data.status === "success"){
            console.log("In if user  =====================>")
            localStorage.setItem("Auth",true)
            return;
          }
            else{
              // Auth = false;
              // localStorage.clear();
              // window.location.replace("/")
              console.log("In else  =====================>")
            }
          
    } catch (error) {
      console.error('Error:', error);

    }
  };
  useEffect(()=>{
     if(Mobile){
      console.log("Mobile",Mobile)
      checkUser();
   
     }
   
   
  },[])
 return <IonApp>
  <Toast props={toastStatus}/>
  <IonReactRouter>
    <IonRouterOutlet>
       
    <Route  path="/app" component={NavBar}  />
    <Route  path="/job-details/:id" component={JobDetails}  />
    <Route  path="/Coninue" component={Continue}  />
    <Route  path="/select-lang" component={SelectLang}  />
    <Route  path="/verify-otp" component={VerifyPhoneTwo} exact />
    <Route  path="/phone" component={Newphone}  />
    <Route  path="/basic-info" component={Basicinfo} exact />
    <Route  path="/personal-details" component={PersonalDetails} exact />
    <Route  path="/complete" component={OnBordingCompletePage} exact />
    <Route  path="/edu" component={Personalinfoedu}  />
    <Route  path="/job-pref" component={JobPref} exact />
    <Route  path="/work" component={Workexperience} exact />
    <Route  path="/personal-chat/:id" component={PersonalChat}  />
    <Route  path="/job-personal-chat/:id" component={JobPersonalChat}  />
         <Route  path="/group-chat" component={GroupChatting}  />
         {/* <Route exact path="/job-details/:id" component={JobDetails}  /> */}
         {/* =================================================== */}
         <Route  path="/job-details/:id" component={JobDetails}  />
         <Route  path="/profile-work-experience" component={ProfileWorkExperience}  />
         <Route  path="/profile-work-experience-edit/:id" component={WorkExperienceEdit}  />
         <Route  path="/profile-education-edit/:id" component={EducationEdit}  />
    <Route  path="/profile-eduction" component={ProfileEduction}  />
    <Route  path="/profile-resume" component={ResumeView}  />
    <Route  path="/profile-personal-details" component={ProfilePersonalDetails}  />
    <Route  path="/profile-contact-details" component={ProfileContactDetails}  />
    <Route  path="/profile-job-preference" component={ProfileJobPreference}  />


    <Route  path="/employers-contact-details" component={HotelerContactDetails}  />
    <Route  path="/employers-personal-details" component={HotelierPersonalDetails}  />
    <Route  path="/employers-package" component={HotelierPackage}  />
    <Route  path="/hotelier-package" component={HotelierPackageSelect}  />
     


    <Route  path="/help-and-support" component={HelpAndSupport}  />
    <Route  path="/update-profile-photo" component={UpdateProfilePhoto}  />
    <Route  path="/rewards" component={Reward}  />
    <Route  path="/saved-jobs" component={SavedJobs}  />
    <Route  path="/viewed-jobs" component={ViewedJobs}  />
    <Route  path="/settings" component={Settings}  />
    <Route  path="/accounts-notification" component={AccountsAndNotifications}  />
    <Route  path="/term-services" component={TermAndServices}  />
    <Route  path="/privacy-policy" component={PrivacyAndPolicy}  />
    <Route  path="/profile-health" component={ProfileHealth}  />
    <Route  path="/hotelier-profile-health" component={HotelierProfileHealth}  />
    <Route  path="/post-job" component={HotelierPostJob}  />
    <Route  path="/active-jobs" component={ActiveJobs}  />
    <Route  path="/inactive-jobs" component={InActiveJobs}  /> 
    <Route  path="/candidate-applied-jobs" component={CandidateAppliedJobs}  />
    <Route  path="/interested-candidates" component={InterestedCandidates}  />
    <Route  path="/candidate-search" component={CandidateSearch}  />
    <Route  path="/search-candidate-view/:id" component={SearchCandidateView}  />

    <Route  path="/candidate-view/:id/:id2" component={CandidateView}  />
    <Route  path="/job-candidate-view/:id" component={JobCandidateView}  />
    <Route  path="/agent-personal-details" component={AgentPersonalDetails}  />
    <Route  path="/agent-contact-details" component={AgentContactDetails}  />
    <Route  path="/agent-eduction" component={AgentEduction}  />
    
    <Route  path="/agent-profile-health" component={AgentProfileHealth}  />
    <Route  path="/edit-post/:id" component={EditPost}  />
    <Route  path="/agent-available" component={AgentAvailable}  />
    <Route  path="/agent-view/:id" component={AgentView}  />
    <Route  path="/agent-personal-chat/:id" component={AgentPersonalChat}  />
    
    <Redirect  path="/" to={Auth ? "/app" : "/Coninue" }  exact/>
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
};

export default App;
