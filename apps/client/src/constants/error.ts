export interface ErrorConfig {
  title: string;
  message: string;
}

export const ERROR_CONFIG: Record<string, ErrorConfig> = {
  server_status: {
    title: 'Server Error',
    message: 'API Serverに異常があります。',
  },
  unknown: {
    title: 'Error',
    message: 'エラーが発生しました。',
  },
} as const;
