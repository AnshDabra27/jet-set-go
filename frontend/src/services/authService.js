export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData);
  return response.data;
};

export const getProfile = async () => {
  // ... existing code ...
}; 