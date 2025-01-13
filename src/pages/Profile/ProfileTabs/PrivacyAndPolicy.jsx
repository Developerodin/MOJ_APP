import { IonContent, IonIcon, IonPage } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders';
import { bagHandleOutline } from 'ionicons/icons';
import { isMobile } from '../../../IsMobile/IsMobile';
import { AppContext } from '../../../Context/AppContext';

export const PrivacyAndPolicy = () => {
  const { languageUpdate } = useContext(AppContext);
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
    <IonPage>
      <IonContent>
        <div className={isMobile ? "" : 'sw'} style={{ padding: "20px" }}>
          <ProfileHeaders icon={<IonIcon icon={bagHandleOutline} style={{ fontSize: "24px", color: "#395CFF" }} />} title={selectedLanguage === "English" ? "Privacy Policy" : "गोपनीयता नीति"} />
          <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
            {/* Introduction */}
            <p style={{ marginBottom: '15px' }}>
              {selectedLanguage === "English" ? "Our privacy policy outlines how we collect, use, and protect your personal information when you use our services." : "हमारी गोपनीयता नीति बताती है कि जब आप हमारी सेवाओं का उपयोग करते हैं तो हम आपकी व्यक्तिगत जानकारी कैसे एकत्रित, उपयोग और सुरक्षित करते हैं।"}
            </p>

            {/* Information Collection */}
            <strong style={{ marginBottom: '10px' }}>
              {selectedLanguage === "English" ? "Information Collection" : "जानकारी संग्रहण"}
            </strong>
            <p style={{ marginBottom: '15px' }}>
              {selectedLanguage === "English" ? "We collect personal information such as name, email address, and contact details when you register or interact with our platform." : "जब आप हमारे प्लेटफ़ॉर्म पर पंजीकरण करते हैं या इंटरैक्ट करते हैं, तो हम नाम, ईमेल पता और संपर्क विवरण जैसी व्यक्तिगत जानकारी एकत्रित करते हैं।"}
            </p>

            {/* Use of Information */}
            <strong style={{ marginBottom: '10px' }}>
              {selectedLanguage === "English" ? "Use of Information" : "जानकारी का उपयोग"}
            </strong>
            <p style={{ marginBottom: '15px' }}>
              {selectedLanguage === "English" ? "We use your personal information to provide and improve our services, communicate with you, and personalize your experience." : "हम आपकी व्यक्तिगत जानकारी का उपयोग अपनी सेवाओं को प्रदान करने और सुधारने, आपके साथ संवाद करने और आपके अनुभव को व्यक्तिगत बनाने के लिए करते हैं।"}
            </p>

            {/* Data Security */}
            <strong style={{ marginBottom: '10px' }}>
              {selectedLanguage === "English" ? "Data Security" : "डेटा सुरक्षा"}
            </strong>
            <p style={{ marginBottom: '15px' }}>
              {selectedLanguage === "English" ? "We implement security measures to protect your personal information from unauthorized access, alteration, or disclosure." : "हम आपकी व्यक्तिगत जानकारी को अनधिकृत पहुंच, परिवर्तन या प्रकटीकरण से बचाने के लिए सुरक्षा उपाय लागू करते हैं।"}
            </p>

            {/* Third-Party Disclosure */}
            <strong style={{ marginBottom: '10px' }}>
              {selectedLanguage === "English" ? "Third-Party Disclosure" : "तीसरे पक्ष का प्रकटीकरण"}
            </strong>
            <p style={{ marginBottom: '15px' }}>
              {selectedLanguage === "English" ? "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent." : "हम आपकी सहमति के बिना आपकी व्यक्तिगत जानकारी को तीसरे पक्ष को नहीं बेचते, व्यापार नहीं करते या अन्यथा स्थानांतरित नहीं करते।"}
            </p>

            {/* Changes to Policy */}
            <strong style={{ marginBottom: '10px' }}>
              {selectedLanguage === "English" ? "Changes to Policy" : "नीति में परिवर्तन"}
            </strong>
            <p style={{ marginBottom: '15px' }}>
              {selectedLanguage === "English" ? "We reserve the right to update or modify our privacy policy at any time. Any changes will be communicated to you through our platform." : "हम किसी भी समय अपनी गोपनीयता नीति को अपडेट या संशोधित करने का अधिकार सुरक्षित रखते हैं। किसी भी परिवर्तन को हमारे प्लेटफ़ॉर्म के माध्यम से आपको सूचित किया जाएगा।"}
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};