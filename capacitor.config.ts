import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fleche.app',
  appName: 'fleche-app',
  webDir: 'www',
  server: {
    cleartext: true,
    androidScheme: 'http'
  }
};
export default config;
