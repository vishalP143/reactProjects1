// src/components/PersonDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from './Notification';

import '../styles/PersonDetail.css'; // Component-specific styles

const API_URL = process.env.REACT_APP_API_URL;

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [showNotification, setShowNotification] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setPerson(response.data);
      } catch (error) {
        console.error('Error fetching person:', error);
        setShowNotification({ type: 'error', text: 'Error loading person details.' });
      }
    };
    fetchPerson();
  }, [id]);

  const deletePerson = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setShowNotification({ type: 'success', text: 'Person deleted successfully!' });
      setTimeout(() => navigate('/'), 3000); // Navigate after showing notification for 3 seconds
    } catch (error) {
      console.error('Error deleting person:', error);
      setShowNotification({ type: 'error', text: 'Error deleting person.' });
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(null);
  };

  if (!person) return <div className="box-container">Loading...</div>;


  return (
    <div className="box-container">
      <h1>{person.name}</h1>
      <div className="person-info">
        <p>Age: {person.age}</p>
      </div>
      <div className="person-actions">
        <Link to={`/person/${person.id}/edit`} className="btn btn-update">Edit</Link>
        <button onClick={deletePerson} className="btn btn-delete">Delete</button>
        <Link to="/" className="btn btn-back">Back to Home</Link>
      </div>
      {showNotification && <Notification message={showNotification} onClose={handleCloseNotification} />}
    </div>
  );
};

export default PersonDetail;

/*Here’s a detailed explanation of the `PersonDetail` component:

### 1. **Component Purpose:**
   - The `PersonDetail` component displays detailed information about a specific person based on their ID. It fetches the person's data from an API, allows for deletion of the person, and provides a way to navigate back to the home page or edit the person’s details.

### 2. **Imports:**
   - **React and Hooks:** The component imports React and hooks like `useEffect` and `useState` for managing lifecycle and state.
   - **React Router Hooks:** `useParams` for accessing route parameters (specifically the person's ID), `Link` for navigation, and `useNavigate` for programmatic navigation.
   - **Axios:** Used for making HTTP requests to interact with the API.
   - **Notification:** The custom `Notification` component for showing success or error messages.
   - **Component-specific Styles:** The component imports its own CSS file for styling.

### 3. **Environment Variable:**
   - `const API_URL = process.env.REACT_APP_API_URL;`: This retrieves the base API URL from environment variables, allowing easy configuration for different environments (development, production, etc.).

### 4. **State Management:**
   - **`person`:** This state variable holds the details of the person fetched from the API. It starts as `null` until data is retrieved.
   - **`showNotification`:** This state variable manages the visibility and content of notifications (success or error messages).
   - **`navigate`:** The `useNavigate` hook provides a function to programmatically change the route.

### 5. **Effect Hook:**
   - **`useEffect`:** This hook runs after the component mounts (and when `id` changes) to fetch the person's details:
     - **`fetchPerson`:** An asynchronous function that fetches data using Axios. If successful, it updates the `person` state with the response data. If an error occurs, it logs the error and sets an error notification.

### 6. **Delete Functionality:**
   - **`deletePerson`:** This asynchronous function handles the deletion of the person:
     - It sends a DELETE request to the API with the person's ID.
     - On successful deletion, it sets a success notification and navigates back to the home page after a delay of 3 seconds.
     - If there’s an error, it logs the error and displays an error notification.

### 7. **Notification Handling:**
   - **`handleCloseNotification`:** This function sets the `showNotification` state to `null`, which hides the notification when the close button is clicked.

### 8. **Render Method:**
   - The component returns a JSX structure that includes:
     - **Loading State:** If the `person` state is still `null` (data is being fetched), it displays a loading message.
     - **Person Details:** Once the data is loaded, it displays the person's name and age.
     - **Action Buttons:**
       - An "Edit" link that navigates to the edit page for the current person.
       - A "Delete" button that triggers the `deletePerson` function.
       - A "Back to Home" link that navigates back to the home page.
     - **Notification Component:** Conditionally renders the `Notification` component if `showNotification` is not `null`, passing the notification message and the close handler.

### Summary:
The `PersonDetail` component effectively handles displaying detailed information about a specific person and provides functionalities to edit or delete that person. It uses React hooks for state management and lifecycle methods, integrates with an API for data fetching and manipulation, and enhances user experience through notifications. The component adheres to React's principles of modularity and reusability, making it a valuable part of the application.*/