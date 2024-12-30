import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext';

export const HowItworks = () => {
  const{languageUpdate}=useContext(AppContext);
     const [selectedLanguage, setSelectedLanguage] = useState(
          localStorage.getItem("selectedLanguage") || "English"
        );
  
        useEffect(() => {
          
          const languageFromStorage = localStorage.getItem("selectedLanguage");
          if (languageFromStorage) {
            setSelectedLanguage(languageFromStorage);
          }
        }, [languageUpdate]);
  return (
    <div style={{padding:"20px"}}>

      <div>
        <div>
          <span style={{fontWeight:"bold",fontSize:"18px"}}>
          { 
            selectedLanguage === "English" ? "Step 1" :"चरण 1" }
          </span>
        </div>
        <div style={{marginTop:"15px"}}>
          <span style={{lineHeight:1.5,fontSize:"15px"}}>
            Invite your friends and ask them to enter your refferal code while signing up
           { 
            selectedLanguage === "English" ? "Invite your friends and ask them to enter your refferal code while signing up" : "अपने दोस्तों को आमंत्रित करें और उन्हें साइन अप करते समय अपना रेफरल कोड दर्ज करने के लिए कहें"
           }
            </span>
        </div>
      </div>

      <div style={{marginTop:"30px"}}>
        <div>
          <span style={{fontWeight:"bold",fontSize:"18px"}}>
            
            { 
            selectedLanguage === "English" ? "Step 2" :"चरण 2" }
            </span>
        </div>
        <div style={{marginTop:"15px"}}>
          <span style={{lineHeight:1.5,fontSize:"15px"}}>
            
            { 
            selectedLanguage === "English" ? "After successful registeration, you’ll be notified and the points will be credited within 24 hours." : "सफल पंजीकरण के बाद, आपको सूचित किया जाएगा और अंक 24 घंटे के भीतर जमा कर दिए जाएंगे।"
           }
            </span>
        </div>
      </div>

      <div style={{marginTop:"30px"}}>
        <div>
          <span style={{fontWeight:"bold",fontSize:"18px"}}>
            
            { 
            selectedLanguage === "English" ? "Step 3" :"चरण 3" }
            </span>
        </div>
        <div style={{marginTop:"15px"}}>
          <span style={{lineHeight:1.5,fontSize:"15px"}}>
            
            { 
            selectedLanguage === "English" ? "You can redeem your points for gift cards whenever you like." : "आप जब चाहें अपने अंक उपहार कार्ड के लिए भुना सकते हैं।"
           }
            </span>
        </div>
      </div>
    </div>
  )
}
