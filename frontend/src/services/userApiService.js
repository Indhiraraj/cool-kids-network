export const getUsersData = async ({ id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/users/all/info/${id}`
    );
    if (!response.ok) {
      const errorData = await response.json(); // Get the error response body
      console.log(errorData);

      throw new Error(errorData.error || 'Something went wrong');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching users data: ${error}`);
    throw error;
  }
};

export const getAllUsers = async () => {
  const maintainer = JSON.parse(localStorage.getItem('maintainer'));
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/users/all/${maintainer.email}`
    );
    if (!response.ok) {
      const errorData = await response.json(); // Get the error response body
      console.log(errorData);

      throw new Error(errorData.error || 'Something went wrong');
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error(`Error fetching users data: ${error}`);
    throw error;
  }
};

export const updateUser = async ({
  maintainerEmail,
  email,
  firstName,
  lastName,
  role
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/users/set-role`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maintainerEmail,
          email,
          firstName,
          lastName,
          role
        })
      }
    );
    if (!response.ok) {
      const errorData = await response.json(); // Get the error response body
      console.log(errorData);

      throw new Error(errorData.error || 'Something went wrong');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating user data: ${error}`);
    throw error;
  }
};
