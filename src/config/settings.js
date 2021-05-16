const settings = {
  dev: {
    apiUrl: 'https://rocky-mesa-78249.herokuapp.com/api',
  },
  staging: {
    apiUrl: 'https://rocky-mesa-78249.herokuapp.com/api',
  },
  prod: {
    apiUrl: 'https://rocky-mesa-78249.herokuapp.com/api',
  },
};

const getCurrentSettings = () => {
  return settings.dev;
};

export default getCurrentSettings();

export const user = [
  {
    appId: 4568,
    authKey: 'OkrW3CaB-L75QPA',
    authSecret: 'gxbMSRdLZMJZNkH',
  },
  {
    debug: {mode: 1},
  },
];
