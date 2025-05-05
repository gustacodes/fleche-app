import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fleche.app',
  appName: 'Fleche',
  webDir: 'www',
  server: {
    cleartext: true,
    androidScheme: 'http'
  }
};
export default config;
