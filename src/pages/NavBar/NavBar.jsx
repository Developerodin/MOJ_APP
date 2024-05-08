import { IonFooter } from '@ionic/react'
import React, { useContext } from 'react'
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { playCircle, radio, library, search,homeOutline ,searchOutline,addCircleOutline,heartOutline,personOutline, documentAttachOutline, documentTextOutline, chatboxEllipsesOutline, settings} from 'ionicons/icons';
import { Home } from '../Home/Home';
import { Profile } from '../Profile/Profile';
import { AppliedJobs } from '../Jobs/AppliedJobs';
import { Chats } from '../Chat/Chats';
import PersonalChat from '../../components/Chats/PersonalChat';
import GroupChatting from '../../components/Chats/GroupChatting';
import { JobDetails } from '../Jobs/JobDetails';
import { ProfileWorkExperience } from '../Profile/ProfileTabs/WorkExperience';
import { ProfileEduction } from '../Profile/ProfileTabs/Eduction';
import { ProfilePersonalDetails } from '../Profile/ProfileTabs/PersonalDetails';
import { ProfileContactDetails } from '../Profile/ProfileTabs/ContactDetails';
import { ProfileJobPreference } from '../Profile/ProfileTabs/JobPreference';
import { HelpAndSupport } from '../Profile/ProfileTabs/HelpAndSupport';
import { UpdateProfilePhoto } from '../Profile/ProfileTabs/UpdateProfilePhoto';
import { Reward } from '../Reward/Reward';
import { SavedJobs } from '../Jobs/SavedJobs';
import { ViewedJobs } from '../Jobs/ViewedJobs';
import { Settings } from '../Profile/ProfileTabs/Settings';
import { ResumeView } from '../Resume/ResumeView';
import { AccountsAndNotifications } from '../Profile/ProfileTabs/AccountsAndNotifications';
import { TermAndServices } from '../Profile/ProfileTabs/TermAndServices';
import { PrivacyAndPolicy } from '../Profile/ProfileTabs/PrivacyAndPolicy';
import SelectLang from '../OnBording/SelectLang';
import Continue from '../OnBording/Continue';
import { ProfileHealth } from '../Profile/ProfileTabs/ProfileHealth';
import WorkExperienceEdit from '../../components/Models/WorkExperienceEdit';

const NavBar = () => {
  // const{setTabBarVisibility,TabBarVisibility}=useContext(AppContext);


  // let HideTabBarValue;
  // if(TabBarVisibility === "/group-chat" || TabBarVisibility === "/personal-chat/2" ){
  //   HideTabBarValue=TabBarVisibility;
    
  //  }
  //  else{
  //   HideTabBarValue="false"
    
  //  }

  return (
   
       
      <IonTabs>
        <IonRouterOutlet>
          
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          {/* <Route path="/mainhome" render={() => <Feeds/>} exact={true} />
          <Route path="/search" render={() => <SearchPage />} exact={true} />
          <Route path="/chats" render={() => <Chats/>} exact={true} />
          <Route path="/profile" render={() => <Profile/>} exact={true} />
          <Route path="/othersprofile/:id" render={() => <OthersProfilePage/>} exact={true} />
          <Route path="/personal-chat/:id" render={() => <PersonalChat hidetaskbar={setTabBarVisibility} pathvalue={TabBarVisibility}/>} exact={true} />
          <Route path="/group-chat" render={() => <GroupChatting hidetaskbar={setTabBarVisibility} pathvalue={TabBarVisibility}/>} exact={true} />
          <Route path="/activity" render={() => <Activity hidetaskbar={setTabBarVisibility} pathvalue={TabBarVisibility}/>} exact={true} />
          <Route path="/addpost" render={() => <AddPost hidetaskbar={setTabBarVisibility} pathvalue={TabBarVisibility}/>} exact={true} />
          <Route path="/events" render={() => <Events hidetaskbar={setTabBarVisibility} pathvalue={TabBarVisibility}/>} exact={true} /> */}
         
         <Route  path="/app/home" component={Home}  />
         <Route  path="/app/profile" component={Profile}  />
         <Route  path="/app/applied-jobs" component={AppliedJobs}  />
         <Route  path="/app/chat" component={Chats}  />
         <Route  path="/personal-chat/:id" component={PersonalChat}  />
         <Route  path="/group-chat" component={GroupChatting}  />
         {/* <Route exact path="/job-details/:id" component={JobDetails}  /> */}
         {/* =================================================== */}
         <Route  path="/job-details/:id" component={JobDetails}  />
         <Route  path="/profile-work-experience" component={ProfileWorkExperience}  />
         <Route  path="/profile-work-experience-edit/:id" component={WorkExperienceEdit}  />
    <Route  path="/profile-eduction" component={ProfileEduction}  />
    <Route  path="/profile-personal-details" component={ProfilePersonalDetails}  />
    <Route  path="/profile-contact-details" component={ProfileContactDetails}  />
    <Route  path="/profile-job-preference" component={ProfileJobPreference}  />
    <Route  path="/profile-resume" component={ResumeView}  />
    <Route  path="/help-and-support" component={HelpAndSupport}  />
    <Route  path="/update-profile-photo" component={UpdateProfilePhoto}  />
    <Route  path="/rewards" component={Reward}  />
    <Route  path="/saved-jobs" component={SavedJobs}  />
    <Route  path="/viewed-jobs" component={ViewedJobs}  />
    <Route  path="/settings" component={Settings}  />
    <Route  path="/accounts-notification" component={AccountsAndNotifications}  />
    <Route  path="/term-services" component={TermAndServices}  />
    <Route  path="/privacy-policy" component={PrivacyAndPolicy}  />
    <Route  path="/select-lang" component={SelectLang}  />
    <Route  path="/profile-health" component={ProfileHealth}  />
    {/* <Route  path="/Coninue" component={Continue}  /> */}
         
         
          <Redirect exact  to="/app/home" />
        </IonRouterOutlet>


        <IonTabBar slot="bottom" style={{border:"none",marginBottam:"20px",display: "flex"}}>
          <IonTabButton color="dark" tab="home" href="/app/home" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={homeOutline} />
            
          </IonTabButton>

          {/* <IonTabButton tab="search" href="/search" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={searchOutline} />
           
          </IonTabButton> */}

          <IonTabButton tab="addpost" href="/app/applied-jobs" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={documentTextOutline} />
           
          </IonTabButton>

          <IonTabButton tab="activity" href="/app/chat" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={chatboxEllipsesOutline} />
           
          </IonTabButton>

          <IonTabButton tab="user" href="/app/profile" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={personOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
 
   
  )
}

export default NavBar
