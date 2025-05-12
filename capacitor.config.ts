import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fleche.app',
  appName: 'Fleche',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true
  },
  plugins: {
    Camera: {
      enabled: true,
      presentationStyle: 'fullscreen'
    }
  }
};

export default config;
