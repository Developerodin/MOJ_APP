import { IonFooter } from '@ionic/react'
import React, { useContext } from 'react'
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { playCircle, radio, library, search,homeOutline ,searchOutline,addCircleOutline,heartOutline,personOutline, documentAttachOutline, documentTextOutline, chatboxEllipsesOutline} from 'ionicons/icons';
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
   
         <IonReactRouter>
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
         
         <Route path="/home" render={() => <Home/>} exact={true} />
         <Route path="/profile" render={() => <Profile/>} exact={true} />
         <Route path="/applied-jobs" render={() => <AppliedJobs/>} exact={true} />
         <Route path="/chat" render={() => <Chats/>} exact={true} />
         <Route path="/personal-chat/:id" render={() => <PersonalChat/>} exact={true} />
         <Route path="/group-chat" render={() => <GroupChatting/>} exact={true} />
         <Route path="/job-details/:id" render={() => <JobDetails/>} exact={true} />
         {/* =================================================== */}

         <Route  path="/profile-work-experience" component={ProfileWorkExperience} exact />
    <Route  path="/profile-eduction" component={ProfileEduction} exact />
    <Route  path="/profile-personal-details" component={ProfilePersonalDetails} exact />
    <Route  path="/profile-contact-details" component={ProfileContactDetails} exact />
    <Route  path="/profile-job-preference" component={ProfileJobPreference} exact />
    <Route  path="/help-and-support" component={HelpAndSupport} exact />
    <Route  path="/update-profile-photo" component={UpdateProfilePhoto} exact />
    <Route  path="/rewards" component={Reward} exact />
        

         
         
         
          <Redirect exact path="/" to="/home" />
        </IonRouterOutlet>


        <IonTabBar slot="bottom" style={{border:"none",marginBottam:"20px",display: "flex"}}>
          <IonTabButton color="dark" tab="home" href="/home" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={homeOutline} />
            
          </IonTabButton>

          {/* <IonTabButton tab="search" href="/search" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={searchOutline} />
           
          </IonTabButton> */}

          <IonTabButton tab="addpost" href="/applied-jobs" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={documentTextOutline} />
           
          </IonTabButton>

          <IonTabButton tab="activity" href="/chat" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={chatboxEllipsesOutline} />
           
          </IonTabButton>

          <IonTabButton tab="user" href="/profile" style={{backgroundColor:"#FFF",color:"grey"}}>
            <IonIcon icon={personOutline} />
            
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
   
  )
}

export default NavBar
