// src/components/Notification.js

import React from 'react';

const Notification = ({ message, onClose }) => {
  const notificationClass = `notification ${message.type}`;

  return (
    <div className={notificationClass}>
      {message.text}
      <button onClick={onClose} className="btn btn-cancel">Close</button>
    </div>
  );
};

export default Notification;

/*Here's an explanation of the `Notification` component:

### 1. **Component Structure:**
   - The `Notification` component is a functional component in React that is designed to display notifications to users. These notifications could be success messages, error alerts, or any informational messages that require user attention.

### 2. **Props:**
   - The component accepts two props:
     - **`message`:** An object that contains the notification text and type. 
       - `message.text`: A string that represents the content of the notification (what the notification will display).
       - `message.type`: A string that defines the type of notification (such as "success," "error," "warning," or "info"). This type can be used for styling purposes.
     - **`onClose`:** A function passed as a prop that will be called when the user wants to close the notification. This is typically used to remove the notification from the display.

### 3. **Dynamic Class Assignment:**
   - The variable `notificationClass` dynamically constructs the class name for the notification based on the `message.type`:
     ```javascript
     const notificationClass = `notification ${message.type}`;
     ```
   - This allows the component to apply different styles based on the notification type. For example, you might have different background colors or text colors for different types of notifications.

### 4. **Return Statement:**
   - The component returns a JSX structure that consists of:
     - **`<div className={notificationClass}>`:** A div that serves as the container for the notification. Its class name is set dynamically based on the `notificationClass` variable.
     - **`{message.text}`:** Displays the text content of the notification, allowing the user to read the message.
     - **`<button onClick={onClose} className="btn btn-cancel">Close</button>`:** A button that users can click to close the notification. When the button is clicked, the `onClose` function is called, allowing the parent component to handle the closing logic (like removing the notification from the UI). The button is styled with the classes `"btn"` and `"btn-cancel"`.

### 5. **Usage in the Application:**
   - The `Notification` component can be used anywhere in your application where you need to alert the user to certain events or actions. For example, after successfully adding or deleting a person, you might show a notification confirming the action.
   - It allows for a clean separation of the notification logic and display from the rest of the application logic, making it reusable and easier to manage.

### Summary:
The `Notification` component is a flexible and reusable piece of UI that allows you to display contextual messages to users. By accepting props for the message content and type, it can be styled and functionally customized to suit various needs in your application, enhancing user experience by providing timely feedback on actions.*/