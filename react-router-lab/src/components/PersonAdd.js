import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';


const API_URL = process.env.REACT_APP_API_URL;

const PersonAdd = ({ onPersonAdded = () => { } }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age) return;

    try {
      const response = await axios.post(API_URL, { name, age });
      const newPersonId = response.data.id;
      
      // Clear form fields
      setName('');
      setAge('');

      // Show success notification
      setShowNotification({ type: 'success', text: `Person "${response.data.name}" added successfully!` });

      // Navigate to the new person's detail page
      setTimeout(() => navigate(`/person/${newPersonId}`), 2000); // Wait for 2 seconds before navigating
    } catch (error) {
      console.error('Error adding person:', error);
      setShowNotification({ type: 'error', text: 'Failed to add person. Please try again.' });
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(null);
  };


  return (
    <div className="box-container">
      <h2>Add Person</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="input-field"
        />
        <div className="button-group">
          <button type="submit" className="btn btn-add">Add Person</button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
      {showNotification && <Notification message={showNotification} onClose={handleCloseNotification} />}
    </div>
  );
};

export default PersonAdd;

/*Here’s a detailed explanation of the `PersonAdd` component:

### 1. **Component Purpose:**
   - The `PersonAdd` component is designed to allow users to add a new person by providing their name and age. It handles form submission, sends the data to an API, and displays notifications based on the success or failure of the operation.

### 2. **Imports:**
   - **React and Hooks:** The component imports React and the `useState` hook to manage local state.
   - **Axios:** Used for making HTTP requests to the API.
   - **useNavigate:** A hook from `react-router-dom` used to programmatically navigate users to different routes within the application.
   - **Notification:** The component imports a custom `Notification` component to display messages to the user.

### 3. **Environment Variables:**
   - `const API_URL = process.env.REACT_APP_API_URL;`: This line retrieves the base API URL from environment variables. It allows you to manage API endpoints without hardcoding them, making it easier to switch between development and production environments.

### 4. **State Management:**
   - **`name` and `age`:** These state variables hold the input values for the person's name and age.
   - **`showNotification`:** This state variable manages the visibility and content of notifications. It can hold either `null` (indicating no notification) or an object with `type` and `text` properties to represent the notification type and message.
   - **`navigate`:** The `useNavigate` hook is called to get the function to programmatically navigate to different routes.

### 5. **Form Submission:**
   - **`handleSubmit`:** This asynchronous function handles the form submission:
     - It prevents the default form submission behavior with `e.preventDefault()`.
     - It checks if both `name` and `age` are provided; if not, it exits early.
     - An Axios POST request is made to the `API_URL` with the `name` and `age` as the request body.
     - If the request is successful:
       - It retrieves the new person's ID from the response.
       - Clears the input fields by setting `name` and `age` back to empty strings.
       - Displays a success notification using `setShowNotification`.
       - Navigates to the new person's detail page after a 2-second delay using `setTimeout`.
     - If there’s an error during the API call:
       - It logs the error to the console and sets an error notification message.

### 6. **Notification Handling:**
   - **`handleCloseNotification`:** This function resets the `showNotification` state to `null`, which effectively hides the notification when the close button is clicked.

### 7. **Render Method:**
   - The component returns a JSX structure that includes:
     - **Container Div:** Wrapped in a div with a class of `box-container`, which styles the layout.
     - **Title:** An `<h2>` header that indicates the purpose of the page (Add Person).
     - **Form:** A form element with:
       - An input field for the person's name, bound to the `name` state variable.
       - An input field for the person's age, bound to the `age` state variable.
       - A submit button for adding the person, styled with the class `btn btn-add`.
       - A cancel button that, when clicked, navigates back to the home page.
     - **Notification Component:** Conditionally renders the `Notification` component if `showNotification` is not `null`, passing the notification message and the close handler.

### Summary:
The `PersonAdd` component provides a user-friendly interface for adding new people to the application. It effectively manages user input, handles API communication, and provides feedback through notifications, enhancing the overall user experience. The component adheres to React's principles of state management and functional programming, making it modular and reusable.*/