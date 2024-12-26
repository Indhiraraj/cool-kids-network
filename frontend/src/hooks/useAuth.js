export const useAuth = () => {
  const maintainer = JSON.parse(localStorage.getItem('maintainer'));
  return maintainer;
};
