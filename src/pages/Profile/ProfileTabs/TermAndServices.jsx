import { IonContent, IonIcon, IonPage } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileHeaders } from '../../../components/Headers/ProfileHeaders';
import { bagHandleOutline } from 'ionicons/icons';
import { isMobile } from '../../../IsMobile/IsMobile';
import { AppContext } from '../../../Context/AppContext';

export const TermAndServices = () => {
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
          <ProfileHeaders icon={<IonIcon icon={bagHandleOutline} style={{ fontSize: "24px", color: "#395CFF" }} />} title={selectedLanguage === "English" ? "Terms and Services" : "नियम और सेवाएँ"} />

          <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
            {/* Section 1: Use to be in Conformity with the Purpose */}
            <div className="section" style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
                {selectedLanguage === "English" ? "Use to be in Conformity with the Purpose" : "उद्देश्य के अनुरूप उपयोग"}
              </h2>
              <p style={{ marginBottom: '15px' }}>
                {selectedLanguage === "English"
                  ? "By accessing and using Masterofjobs.in and related services, you agree to abide by these terms and conditions. The platform is intended for individuals and businesses seeking employment opportunities, career enhancement services, and genuine job vacancies. It is strictly prohibited to misuse the platform for any illegal or unauthorized purpose."
                  : "Masterofjobs.in और संबंधित सेवाओं का उपयोग करके, आप इन शर्तों और नियमों का पालन करने के लिए सहमत होते हैं। यह प्लेटफ़ॉर्म व्यक्तियों और व्यवसायों के लिए रोजगार के अवसरों, करियर संवर्धन सेवाओं और वास्तविक नौकरी रिक्तियों की खोज के लिए है। किसी भी अवैध या अनधिकृत उद्देश्य के लिए प्लेटफ़ॉर्म का दुरुपयोग करना सख्त मना है।"}
              </p>
              <p style={{ marginBottom: '15px' }}>
                {selectedLanguage === "English"
                  ? "Users must ensure that their use of the platform aligns with its intended purpose and refrain from any actions that may cause harm, disruption, or unauthorized access."
                  : "उपयोगकर्ताओं को यह सुनिश्चित करना चाहिए कि उनका प्लेटफ़ॉर्म का उपयोग इसके उद्देश्य के अनुरूप हो और किसी भी ऐसी कार्रवाई से बचें जो नुकसान, व्यवधान या अनधिकृत पहुंच का कारण बन सकती है।"}
              </p>
              <p style={{ marginBottom: '15px' }}>
                {selectedLanguage === "English"
                  ? "Master of Jobs reserves the right to take appropriate action against users who violate these terms, including suspension or termination of access and legal recourse."
                  : "Master of Jobs उन उपयोगकर्ताओं के खिलाफ उचित कार्रवाई करने का अधिकार सुरक्षित रखता है जो इन शर्तों का उल्लंघन करते हैं, जिसमें पहुंच को निलंबित या समाप्त करना और कानूनी उपाय शामिल हैं।"}
              </p>
            </div>

            {/* Section 2: Quality and Genuineness of Responses */}
            <div className="section" style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
                {selectedLanguage === "English" ? "Quality and Genuineness of Responses" : "प्रतिक्रियाओं की गुणवत्ता और वास्तविकता"}
              </h2>
              <p style={{ marginBottom: '15px' }}>
                {selectedLanguage === "English"
                  ? "While Master of Jobs strives to provide a platform for genuine job vacancies and career enhancement services, we do not guarantee the accuracy, quality, or genuineness of responses received through the platform."
                  : "जबकि Master of Jobs वास्तविक नौकरी रिक्तियों और करियर संवर्धन सेवाओं के लिए एक प्लेटफ़ॉर्म प्रदान करने का प्रयास करता है, हम प्लेटफ़ॉर्म के माध्यम से प्राप्त प्रतिक्रियाओं की सटीकता, गुणवत्ता या वास्तविकता की गारंटी नहीं देते हैं।"}
              </p>
              <p style={{ marginBottom: '15px' }}>
                {selectedLanguage === "English"
                  ? "Users are advised to conduct their own due diligence and verification processes before engaging with any responses or information provided on Masterofjobs.in. We disclaim any liability for the outcomes of interactions or transactions resulting from the use of our platform."
                  : "उपयोगकर्ताओं को सलाह दी जाती है कि वे Masterofjobs.in पर प्रदान की गई किसी भी प्रतिक्रिया या जानकारी के साथ जुड़ने से पहले अपनी उचित परिश्रम और सत्यापन प्रक्रियाएं करें। हम अपने प्लेटफ़ॉर्म के उपयोग से उत्पन्न होने वाली बातचीत या लेनदेन के परिणामों के लिए किसी भी जिम्मेदारी से इनकार करते हैं।"}
              </p>
            </div>

            {/* Section 3: Permission to Use Information */}
            <div className="section" style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
                {selectedLanguage === "English" ? "Permission to Use Information" : "जानकारी का उपयोग करने की अनुमति"}
              </h2>
              <p style={{ marginBottom: '15px' }}>
                {selectedLanguage === "English"
                  ? "By using Masterofjobs.in, you grant us permission to use the information and actions you take on the platform for the purpose of providing personalized content, advertisements, and offers across our services. This may include analyzing user behavior, preferences, and interactions to improve our services and enhance user experience."
                  : "Masterofjobs.in का उपयोग करके, आप हमें अपनी सेवाओं में व्यक्तिगत सामग्री, विज्ञापन और ऑफ़र प्रदान करने के उद्देश्य से प्लेटफ़ॉर्म पर ली गई जानकारी और क्रियाओं का उपयोग करने की अनुमति देते हैं। इसमें हमारी सेवाओं को बेहतर बनाने और उपयोगकर्ता अनुभव को बढ़ाने के लिए उपयोगकर्ता व्यवहार, प्राथमिकताओं और इंटरैक्शन का विश्लेषण करना शामिल हो सकता है।"}
              </p>
              <p style={{ marginBottom: '15px' }}>
                {selectedLanguage === "English"
                  ? "We may also share aggregated or anonymized data with third-party partners for research, analysis, and marketing purposes. Your personal information will be handled in accordance with our Privacy Policy."
                  : "हम अनुसंधान, विश्लेषण और विपणन उद्देश्यों के लिए तीसरे पक्ष के भागीदारों के साथ एकत्रित या गुमनाम डेटा भी साझा कर सकते हैं। आपकी व्यक्तिगत जानकारी को हमारी गोपनीयता नीति के अनुसार संभाला जाएगा।"}
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};