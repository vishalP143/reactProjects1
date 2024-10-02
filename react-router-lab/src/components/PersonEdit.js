// src/components/PersonEdit.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/PersonEdit.css'; // Component-specific styles

const API_URL = process.env.REACT_APP_API_URL;

const PersonEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({ name: '', age: '' });

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setPerson(response.data);
      } catch (error) {
        console.error('Error fetching person:', error);
      }
    };
    fetchPerson();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, person);
      navigate(`/person/${id}`); // Redirect to person details page after update
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/person/${id}`); // Navigate back to the person details page
  };

  const handleHome = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="box-container">
      <h1>Edit Person</h1>
      <form onSubmit={handleUpdate} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={person.name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={person.age}
          onChange={handleChange}
          required
          className="input-field"
        />
        <div className="person-actions">
          <button type="submit" className="btn btn-update">Update</button>
          <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
          <button type="button" className="btn btn-back" onClick={handleHome}>Back to Home</button>
        </div>
      </form>
    </div>
  );
};

export default PersonEdit;

/*Here’s a detailed explanation of the `PersonEdit` component:

### 1. **Component Purpose:**
   - The `PersonEdit` component allows users to edit the details (name and age) of a specific person. It fetches the person's current details from an API, allows the user to make changes, and then updates the person's details in the backend.

### 2. **Imports:**
   - **React and Hooks:** The component imports React along with `useState` and `useEffect` for managing state and side effects.
   - **React Router Hooks:** `useParams` for accessing route parameters (the person's ID) and `useNavigate` for navigation.
   - **Axios:** Used for making HTTP requests to interact with the API.
   - **Component-specific Styles:** The component imports its own CSS file for styling.

### 3. **Environment Variable:**
   - `const API_URL = process.env.REACT_APP_API_URL;`: This retrieves the base API URL from environment variables, enabling flexibility in different environments.

### 4. **State Management:**
   - **`person`:** This state variable holds the details of the person being edited, initialized with an object containing empty strings for `name` and `age`.
   - **`navigate`:** The `useNavigate` hook provides a function to programmatically change the route.

### 5. **Effect Hook:**
   - **`useEffect`:** This hook runs after the component mounts (and when `id` changes) to fetch the current details of the person:
     - **`fetchPerson`:** An asynchronous function that sends a GET request to the API to retrieve the person's details based on the ID. If successful, it updates the `person` state with the response data. If an error occurs, it logs the error to the console.

### 6. **Input Change Handling:**
   - **`handleChange`:** This function updates the `person` state as the user types in the input fields. It uses destructuring to get the `name` and `value` from the event target, then updates the corresponding property in the `person` state object.

### 7. **Update Handling:**
   - **`handleUpdate`:** This asynchronous function is triggered when the form is submitted:
     - It prevents the default form submission behavior.
     - Sends a PUT request to update the person's details in the backend with the current `person` state.
     - If successful, it navigates back to the person's detail page using the ID.
     - If an error occurs, it logs the error to the console.

### 8. **Cancel and Home Navigation:**
   - **`handleCancel`:** This function navigates back to the person's detail page without making any changes when the cancel button is clicked.
   - **`handleHome`:** This function navigates back to the home page when the "Back to Home" button is clicked.

### 9. **Render Method:**
   - The component returns a JSX structure that includes:
     - A title ("Edit Person").
     - A form for editing the person's details with:
       - An input field for the name, bound to `person.name` and updating on change.
       - An input field for the age, bound to `person.age` and updating on change.
     - **Action Buttons:**
       - A submit button for updating the person's details.
       - A cancel button that triggers the `handleCancel` function.
       - A "Back to Home" button that triggers the `handleHome` function.

### Summary:
The `PersonEdit` component effectively handles the editing of a person's details. It utilizes React hooks for state management and lifecycle methods, interacts with an API for data fetching and updating, and provides a user-friendly interface with navigation options. The component adheres to React's principles of modularity and reusability, making it an integral part of the application for managing person data.*/