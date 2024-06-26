import axios from 'axios';

const API_KEY = 'YOUR_GOOGLE_CLOUD_API_KEY';
const TRANSLATE_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(TRANSLATE_URL, {
      q: text,
      target: targetLanguage,
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return text;
  }
};
