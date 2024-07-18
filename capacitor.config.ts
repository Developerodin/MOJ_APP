import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Moj_App',
  webDir: 'dist',
 
  plugins: {
    StatusBar: {
      style: 'light', // or 'LIGHT' for light content
      backgroundColor: 'ffffff' // Optional: Set the background color of the status bar
    }
  }
};

export default config;
