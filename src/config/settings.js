const settings = {
  dev: {
    apiUrl: 'http://192.168.0.101:5000/api',
  },
  staging: {
    apiUrl: 'http://192.168.0.101:5000/api',
  },
  prod: {
    apiUrl: 'http://192.168.0.101:5000/api',
  },
};

const getCurrentSettings = () => {
  return settings.dev;
};

export default getCurrentSettings();
