import { IonFooter } from '@ionic/react'
import React, { useContext } from 'react'
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { playCircle, radio, library, search,homeOutline ,searchOutline,addCircleOutline,heartOutline,personOutline, documentAttachOutline, documentTextOutline, chatboxEllipsesOutline, settings, laptopOutline, bagOutline} from 'ionicons/icons';
import { Home } from '../Home/Home';
import { Profile } from '../Profile/Profile';
import { AppliedJobs } from '../Jobs/AppliedJobs';

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
import { HotelierHome } from '../Hotelier/Home/HotelierHome';
import { HotelierProfile } from '../Hotelier/Profile/Profile';
import { HotelierAppliedJobs } from '../Hotelier/Jobs/AppliedJobs';
import { HotelierMessages } from '../Hotelier/Chat/Messages';
import { HotelierJobPost } from '../Hotelier/Jobs/JobPost';
import { HotelierPostJob } from '../Hotelier/Jobs/PostAJob';
import { ActiveJobs } from '../Hotelier/DashboardPages/ActiveJobs';
import { InActiveJobs } from '../Hotelier/DashboardPages/InActiveJobs';
import { CandidateAppliedJobs } from '../Hotelier/DashboardPages/CandidateAppliedJobs';
import { InterestedCandidates } from '../Hotelier/DashboardPages/InterestedCandidates';
import { CandidateSearch } from '../Hotelier/DashboardPages/CandidateSearch';
import { isMobile } from '../../IsMobile/IsMobile';
import { HotelerContactDetails } from '../Hotelier/Profile/ProfileTabs/HotelerContactDetails';
import { HotelierPersonalDetails } from '../Hotelier/Profile/ProfileTabs/HotelierPersonalDetails';
import { HotelierProfileHealth } from '../Hotelier/Profile/ProfileTabs/HotelierProfileHealth';
import { CandidateView } from '../Hotelier/Jobs/CandidateView';
import { JobCandidateView } from '../Hotelier/Jobs/JobCandidateView';
import HotelierPackage from '../Hotelier/Profile/ProfileTabs/HotelierPackage';
import JobPersonalChat from '../../components/Chats/JobChat/JobPersonalChat';
import SearchCandidateView from '../Hotelier/DashboardPages/SearchCandidateView';
import { AgentHome } from '../Agent/Home/AgentHome';
import { AgentProfile } from '../Agent/Profile/Profile';
import { AgentPersonalDetails } from '../Agent/Profile/ProfileTabs/AgentPersonalDetails';
import { AgentContactDetails } from '../Agent/Profile/ProfileTabs/AgentContactDetails';
import { AgentEduction } from '../Agent/Profile/ProfileTabs/AgentEduction';
import { Chats } from '../Chat/Chats';
import { AgentChats } from '../Agent/AgentChat/AgentChat';
import { AgentProfileHealth } from '../Agent/Profile/ProfileTabs/AgentProfileHealth';
import EditPostModal from '../../components/Cards/AgentCard/EditPost';


const NavBar = () => {
  // const{setTabBarVisibility,TabBarVisibility}=useContext(AppContext);

  const role = localStorage.getItem("role");
  // let HideTabBarValue;
  // if(TabBarVisibility === "/group-chat" || TabBarVisibility === "/personal-chat/2" ){
  //   HideTabBarValue=TabBarVisibility;
    
  //  }
  //  else{
  //   HideTabBarValue="false"
    
  //  }

  return (
   
       
      <IonTabs>
        
        {
           role === "Job Seeker" && <IonRouterOutlet>
          
         
         
           <Route  path="/app/home" component={Home}  />
           <Route  path="/app/profile" component={Profile}  />
           <Route  path="/app/applied-jobs" component={AppliedJobs}  />
           <Route  path="/app/job-chat" component={Chats}  />
           <Route  path="/job-personal-chat/:id" component={JobPersonalChat}  />
           <Route  path="/group-chat" component={GroupChatting}  />
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
     
           
           
            <Redirect exact  to="/app/home" />
          </IonRouterOutlet>

        }
        
     
        {
           role === "Job Seeker" && <IonTabBar slot={isMobile ? "bottom" : "top"} style={{border:"none",marginBottam:"20px",display:"flex"}}>
           
           {/* <IonTabButton color="dark" tab="home" href="/app/home" style={{backgroundColor:"#FFF",color:"grey"}}>
             
             {
              isMobile ? <IonIcon icon={homeOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Home</span>
             }
           </IonTabButton> */}
           <IonTabButton color="dark" tab="home" href="/app/home" style={{backgroundColor:"#FFF",color:"grey"}}>
             
             {
              isMobile ? <IonIcon icon={homeOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Home</span>
             }
           </IonTabButton>
 
           
 
           <IonTabButton tab="addpost" href="/app/applied-jobs" style={{backgroundColor:"#FFF",color:"grey"}}>
             
             {
              isMobile ? <IonIcon icon={documentTextOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Applied Jobs</span>
             }
           </IonTabButton>
 
           <IonTabButton tab="activity" href="/app/job-chat" style={{backgroundColor:"#FFF",color:"grey"}}>
             
             {
              isMobile ? <IonIcon icon={chatboxEllipsesOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Messages</span>
             }
           </IonTabButton>
 
           <IonTabButton tab="user" href="/app/profile" style={{backgroundColor:"#FFF",color:"grey"}}>
            
             {
              isMobile ?  <IonIcon icon={personOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Profile</span>
             }
           </IonTabButton>
         </IonTabBar>

        }
      
       

        




{
           role === "Employers" && <IonRouterOutlet>
          
         
         
           <Route  path="/app/home" component={HotelierHome}  />
           <Route  path="/app/profile" component={HotelierProfile}  />
           <Route  path="/app/post-job" component={HotelierJobPost}  />
           <Route  path="/app/applied-jobs" component={HotelierAppliedJobs}  />
           <Route  path="/app/chat" component={HotelierMessages}  />
           <Route  path="/post-job" component={HotelierPostJob}  />
           <Route  path="/active-jobs" component={ActiveJobs}  />
           <Route  path="/personal-chat/:id" component={PersonalChat}  />
    <Route  path="/inactive-jobs" component={InActiveJobs}  /> 
    <Route  path="/candidate-applied-jobs" component={CandidateAppliedJobs}  />
    <Route  path="/interested-candidates" component={InterestedCandidates}  />
    <Route  path="/candidate-search" component={CandidateSearch}  />
    <Route  path="/search-candidate-view/:id" component={SearchCandidateView}  />
    <Route  path="/rewards" component={Reward}  />

   
      <Route  path="/employers-contact-details" component={HotelerContactDetails}  />
    <Route  path="/employers-personal-details" component={HotelierPersonalDetails}  />
    <Route  path="/settings" component={Settings}  />
      <Route  path="/accounts-notification" component={AccountsAndNotifications}  />
      <Route  path="/term-services" component={TermAndServices}  />
      <Route  path="/privacy-policy" component={PrivacyAndPolicy}  />
      <Route  path="/select-lang" component={SelectLang}  />
      <Route  path="/help-and-support" component={HelpAndSupport}  />
      <Route  path="/update-profile-photo" component={UpdateProfilePhoto}  />
      <Route  path="/hotelier-profile-health" component={HotelierProfileHealth}  />
      <Route  path="/candidate-view/:id/:id2" component={CandidateView}  />
      <Route  path="/job-candidate-view/:id" component={JobCandidateView}  />
      <Route  path="/employers-package" component={HotelierPackage}  />
            <Redirect exact  to="/app/home" />
          </IonRouterOutlet>

        }
        
        {
           role === "Employers" && <IonTabBar slot="bottom" style={{border:"none",marginBottam:"20px",display: "flex"}}>
           <IonTabButton color="dark" tab="home" href="/app/home" style={{backgroundColor:"#FFF",color:"grey"}}>
             <IonIcon icon={laptopOutline} />
             <span>Dashboard</span>
           </IonTabButton>
 
           
 
           <IonTabButton tab="addjob" href="/app/post-job" style={{backgroundColor:"#FFF",color:"grey"}}>
             <IonIcon icon={bagOutline} />
             <span>Post Job</span>
           </IonTabButton>

           <IonTabButton tab="addpost" href="/app/applied-jobs" style={{backgroundColor:"#FFF",color:"grey"}}>
             <IonIcon icon={documentTextOutline} />
            <span>Applied</span>
           </IonTabButton>
 
           <IonTabButton tab="activity" href="/app/chat" style={{backgroundColor:"#FFF",color:"grey"}}>
             <IonIcon icon={chatboxEllipsesOutline} />
            <span>Messages</span>
           </IonTabButton>
 
           <IonTabButton tab="user" href="/app/profile" style={{backgroundColor:"#FFF",color:"grey"}}>
             <IonIcon icon={personOutline} />
             <span>Profile</span>
           </IonTabButton>
         </IonTabBar>

        }

{
           role === "Agent" && <IonRouterOutlet>
          
         
         
           <Route  path="/app/home" component={AgentHome}  />
          <Route  path="/app/profile" component={AgentProfile}  />
          <Route  path ="/agent-personal-details" component={AgentPersonalDetails} />
          <Route  path ="/agent-contact-details" component={AgentContactDetails} />
          <Route  path ="/agent-eduction" component={AgentEduction} />
          <Route  path="/app/agent-chat" component={AgentChats}  />
          <Route  path="/settings" component={Settings}  />
          <Route  path="/accounts-notification" component={AccountsAndNotifications}  />
          <Route  path="/term-services" component={TermAndServices}  />
          <Route  path="/privacy-policy" component={PrivacyAndPolicy}  />
          <Route  path="/select-lang" component={SelectLang}  />
          <Route  path="/help-and-support" component={HelpAndSupport}  />
          <Route  path="/update-profile-photo" component={UpdateProfilePhoto}  />
          <Route  path="/agent-profile-health" component={AgentProfileHealth}  />
          <Route  path="/rewards" component={Reward}  />
          <Route  path="/edit-post" component={EditPostModal}  />
         
           {/* <Route  path="/app/profile" component={Profile}  />
           <Route  path="/app/applied-jobs" component={AppliedJobs}  /> */}
            <Redirect exact  to="/app/home" />
            </IonRouterOutlet>

}


{
           role === "Agent" && <IonTabBar slot={isMobile ? "bottom" : "top"} style={{border:"none",marginBottam:"20px",display:"flex"}}>
           
           {/* <IonTabButton color="dark" tab="home" href="/app/home" style={{backgroundColor:"#FFF",color:"grey"}}>
             
             {
              isMobile ? <IonIcon icon={homeOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Home</span>
             }
           </IonTabButton> */}
           <IonTabButton color="dark" tab="home" href="/app/home" style={{backgroundColor:"#FFF",color:"grey"}}>
             
             {
              isMobile ? <IonIcon icon={homeOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Home</span>
             }
           </IonTabButton>
 
           
 
           {/* <IonTabButton tab="addpost" href="/app/applied-jobs" style={{backgroundColor:"#FFF",color:"grey"}}>
             
             {
              isMobile ? <IonIcon icon={documentTextOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Applied Jobs</span>
             }
           </IonTabButton> */}
 
           <IonTabButton tab="activity" href="/app/agent-chat" style={{backgroundColor:"#FFF",color:"grey"}}>
             
             {
              isMobile ? <IonIcon icon={chatboxEllipsesOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Messages</span>
             }
           </IonTabButton>
 
           <IonTabButton tab="user" href="/app/profile" style={{backgroundColor:"#FFF",color:"grey"}}>
            
             {
              isMobile ?  <IonIcon icon={personOutline} /> : <span style={{fontSize:"18px",color:"black"}}>Profile</span>
             }
           </IonTabButton>
         </IonTabBar>

        }


      </IonTabs>
 
   
  )
}

export default NavBar
