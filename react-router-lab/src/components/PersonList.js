// src/components/PersonList.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Notification from './Notification';
import '../styles/PersonList.css'; // Component-specific styles

const API_URL = process.env.REACT_APP_API_URL;

const PersonList = () => {
  const [people, setPeople] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get(API_URL);
        setPeople(response.data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };
    fetchPeople();
  }, []);

  return (
    <div className="person-list">
      <h1>Person List</h1>
      <Link to="/add" className="btn btn-add add-person-button">Add Person</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.id}>
              <td>
                <Link to={`/person/${person.id}`} className="person-name">
                  {person.name}
                </Link>
              </td>
              <td>{person.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {notification && (
        <Notification message={notification} onClose={() => setNotification('')} />
      )}
    </div>
  );
};

export default PersonList;

/*Here’s a detailed explanation of the `PersonList` component:

### 1. **Component Purpose:**
   - The `PersonList` component is responsible for displaying a list of people, including their names and ages. It retrieves this information from an API and allows users to navigate to individual person details or add new people.

### 2. **Imports:**
   - **React and Hooks:** The component imports React along with `useEffect` and `useState` for managing component state and side effects.
   - **React Router:** `Link` is imported to create navigable links within the app.
   - **Axios:** Used for making HTTP requests to the API.
   - **Notification Component:** This component is imported for displaying messages or alerts to the user.
   - **Component-specific Styles:** The component imports its CSS file for styling.

### 3. **Environment Variable:**
   - `const API_URL = process.env.REACT_APP_API_URL;`: This retrieves the base URL of the API from environment variables, providing flexibility in different environments.

### 4. **State Management:**
   - **`people`:** This state variable holds the list of people fetched from the API, initialized as an empty array.
   - **`notification`:** This state variable is used to manage any notifications that need to be displayed (though it appears to be initialized but not used actively in the current implementation).

### 5. **Effect Hook:**
   - **`useEffect`:** This hook runs when the component mounts (i.e., when it is first rendered) to fetch the list of people:
     - **`fetchPeople`:** An asynchronous function that sends a GET request to the API to retrieve the list of people. If the request is successful, the state `people` is updated with the response data. If an error occurs, it logs the error to the console.

### 6. **Render Method:**
   - The component returns a JSX structure that includes:
     - A header ("Person List") for the list of people.
     - A button that links to the "Add Person" page. Clicking this button will navigate the user to a form for adding a new person.
     - A table structure for displaying the list of people:
       - **Table Header:** Contains two columns: "Name" and "Age".
       - **Table Body:** Uses the `map` method to iterate over the `people` array, rendering a row for each person. Each row contains:
         - A `Link` to the person's details page, displaying the person's name.
         - The person's age.
     - **Notification:** This conditional renders the `Notification` component if there is a message to display, allowing the user to see alerts about various actions (though the notification state is not actively set in this code).

### 7. **Links:**
   - The `Link` component is used to create navigable links that allow users to:
     - Click on a person's name to navigate to their details page (using the person's ID in the URL).
     - Click the "Add Person" button to navigate to the form for adding a new person.

### Summary:
The `PersonList` component effectively manages the display of a list of people in the application. It fetches data from an API, displays it in a table format, and provides navigation to details and addition of new persons. The component adheres to React's principles of modularity and maintainability, making it an integral part of the rental management system. The `Notification` component is included to provide user feedback, though the mechanism for updating its state may need further implementation to enhance the user experience.*/