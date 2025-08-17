declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendCustom: (options: {
          templateId: number;
          templateArgs?: Record<string, any>;
        }) => void;
      };
    };
  }
}

export {};