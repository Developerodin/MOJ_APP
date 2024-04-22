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
import Continue from './pages/Continue';
import VerifyPhoneTwo from './pages/VerifyphoneTwo';
import Newphone from './pages/Newphone';
import Basicinfo from './pages/Basicinfo';
import Personalinfo from './pages/Personalinfo';
import Personalinfoedu from './pages/Personalinfoedu';
import Workexperience from './pages/Workexperience';
import NavBar from './pages/NavBar/NavBar';


setupIonicReact();

const App = () => (
  <IonApp>
  <IonReactRouter>
    <IonRouterOutlet>
       
    <Route  path="/home" component={NavBar} exact />
    <Route  path="/Coninue" component={Continue} exact />
    <Route  path="/homeTwo" component={VerifyPhoneTwo} exact />
    <Route  path="/phone" component={Newphone} exact />
    <Route  path="/Basicinfo" component={Basicinfo} exact />
    <Route  path="/info" component={Personalinfo} exact />
    <Route  path="/edu" component={Personalinfoedu} exact />
    <Route  path="/work" component={Workexperience} exact />
   
    <Redirect exact path="/" to="/Coninue" />
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);

export default App;
