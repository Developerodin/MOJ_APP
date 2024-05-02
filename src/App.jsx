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
import GroupChatting from './components/Chats/GroupChatting';
import SelectLang from './pages/OnBording/SelectLang';
import { AppContext } from './Context/AppContext';
import { useContext } from 'react';
import Toast from './pages/Toast/Toast';
import WorkExperienceEdit from './components/Models/WorkExperienceEdit';
import EducationEdit from './components/Models/EducationEdit';
import { ResumeView } from './pages/Resume/ResumeView';

setupIonicReact();

const App = () => {
  const {toastStatus} = useContext(AppContext);
  const Auth = localStorage.getItem("Auth") || false;
    
 return <IonApp>
  <Toast props={toastStatus}/>
  <IonReactRouter>
    <IonRouterOutlet>
       
    <Route  path="/app" component={NavBar}  />
    <Route  path="/job-details/:id" component={JobDetails}  />
    <Route  path="/Coninue" component={Continue}  />
    <Route  path="/select-lang" component={SelectLang} exact />
    <Route  path="/verify-otp" component={VerifyPhoneTwo} exact />
    <Route  path="/phone" component={Newphone}  />
    <Route  path="/personal-details" component={PersonalDetails} exact />

    <Route  path="/edu" component={Personalinfoedu}  />
    <Route  path="/job-pref" component={JobPref} exact />
    <Route  path="/work" component={Workexperience} exact />
    <Route  path="/personal-chat/:id" component={PersonalChat}  />
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
    <Route  path="/help-and-support" component={HelpAndSupport}  />
    <Route  path="/update-profile-photo" component={UpdateProfilePhoto}  />
    <Route  path="/rewards" component={Reward}  />
    <Route  path="/saved-jobs" component={SavedJobs}  />
    <Route  path="/viewed-jobs" component={ViewedJobs}  />
    <Route  path="/settings" component={Settings}  />
    
    
    <Redirect  path="/" to={Auth ? "/app" : "/Coninue" }  exact/>
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
};

export default App;
