const convertToFullBackendPath = (path: string) => {
  return process.env.VUE_APP_BACKEND_URL + path;
};

const isRemoteServerUrl = (path: string) => {
  return path.includes('https://www') || path.includes('http://www');
};

export default { convertToFullBackendPath, isRemoteServerUrl };
