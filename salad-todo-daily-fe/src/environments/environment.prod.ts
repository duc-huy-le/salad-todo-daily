import { defaultEnvironment } from './environment.default';

export const environment = {
  ...defaultEnvironment,
  apiBaseUrl: 'https://salad-task-api.fly.dev',
  production: true
};
