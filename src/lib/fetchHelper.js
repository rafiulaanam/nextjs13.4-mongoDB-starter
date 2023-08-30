// Define the base URL for API requests
const BASE_URL = "https://nextjs13-4-mongo-db-starter.vercel.app/";
// const BASE_URL = "http://localhost:3000/";

// Function to fetch a list of users
export const getData = async (route) => {
  try {
    const response = await fetch(`${BASE_URL}api/${route}`);
    const data = await response.json();
    return data; // Return the fetched user data
  } catch (error) {
    console.error(error); // Log and handle errors
    // Handle any errors that occur during the fetch or processing of the response data
  }
};

// Function to fetch user by ID
export const getDataById = async ({route, id}) => {
  try {
    const response = await fetch(`${BASE_URL}api/${route}/${id}`);
    const data = await response.json();
    return data; // Return the fetched user data
  } catch (error) {
    console.error(error); // Log and handle errors
    // Handle any errors that occur during the fetch or processing of the response data
  }
};

// Function to create a new user
export const createData = async ({ route, addData }) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addData)
  };

  try {
    const response = await fetch(`${BASE_URL}api/${route}`, options);
    const data = await response.json();
    return data; // Return the response data after creating the user
  } catch (error) {
    console.error(error); // Log and handle errors
    // Handle any errors that occur during the fetch or processing of the response data
  }
};

// Function to update a user's information
export const updateData = async ({ route, id, updateData }) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  };

  try {
    const response = await fetch(`${BASE_URL}api/${route}/${id}`, options);

    if (!response.ok) {
      throw new Error(`Failed to update user with ID ${id}`);
    }

    const data = await response.json();
    return data; // Return the updated user data
  } catch (error) {
    console.error("An error occurred:", error); // Log and handle errors
    throw error; // Propagate the error for further handling if needed
  }
};

// Function to delete a user by ID
export const deleteData = async ({ route, id }) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(`${BASE_URL}api/${route}/${id}`, options);
    const data = await response.json();
    return data; // Return the response data after deleting the user
  } catch (error) {
    console.error(error); // Log and handle errors
    // Handle any errors that occur during the fetch or processing of the response data
  }
};
