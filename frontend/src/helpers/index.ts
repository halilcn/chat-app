const convertToFullBackendPath = (path: string) => {
  return process.env.VUE_APP_BACKEND_URL + path;
};

export default { convertToFullBackendPath };
