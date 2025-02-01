export const logout = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    // Clear any local state/storage if needed
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
