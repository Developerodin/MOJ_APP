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

setupIonicReact();

const App = () => (
  <IonApp>
  <IonReactRouter>
    <IonRouterOutlet>
       
    <Route  path="/home" component={NavBar} exact />
    <Route  path="/Coninue" component={Continue} exact />
    <Route  path="/verify-otp" component={VerifyPhoneTwo} exact />
    <Route  path="/phone" component={Newphone} exact />
    <Route  path="/personal-details" component={PersonalDetails} exact />

    <Route  path="/edu" component={Personalinfoedu} exact />
    <Route  path="/job-pref" component={JobPref} exact />
    <Route  path="/work" component={Workexperience} exact />
    <Route  path="/profile-work-experience" component={ProfileWorkExperience} exact />
    <Route  path="/profile-eduction" component={ProfileEduction} exact />
    <Route  path="/profile-personal-details" component={ProfilePersonalDetails} exact />
    <Route  path="/profile-contact-details" component={ProfileContactDetails} exact />
    <Route  path="/profile-job-preference" component={ProfileJobPreference} exact />
    <Route  path="/help-and-support" component={HelpAndSupport} exact />
    <Route  path="/update-profile-photo" component={UpdateProfilePhoto} exact />
    <Route  path="/rewards" component={Reward} exact />
    
    <Redirect exact path="/" to="/Coninue" />
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);

export default App;
