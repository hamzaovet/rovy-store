import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.rovystore.app",
  appName: "روفي ستور",
  webDir: "public",
  server: {
    url: "https://rovy-store.vercel.app",
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
    backgroundColor: "#07060a",
  },
};

export default config;
