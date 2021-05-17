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
