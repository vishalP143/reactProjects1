import React from 'react';

const DeletePerson = ({ id, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      onDelete(id);
    }
  };

  return (
    <button className="btn btn-delete" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeletePerson;

/*Here's an explanation of the `DeletePerson` component:

### 1. **Component Structure:**
   - The `DeletePerson` component is a functional component in React that accepts two props:
     - `id`: The ID of the person to be deleted.
     - `onDelete`: A function passed as a prop that will handle the actual deletion of the person when invoked.

### 2. **handleDelete Function:**
   - The `handleDelete` function is called when the delete button is clicked.
   - Inside this function, the following steps occur:
     - It uses `window.confirm` to show a confirmation dialog to the user. The message `"Are you sure you want to delete this person?"` is displayed.
     - If the user clicks "OK" (which means they confirmed the action), the `onDelete` function is called, passing the `id` as an argument. This function is responsible for deleting the person with the given ID.

### 3. **Button Element:**
   - The `button` element renders a clickable button with the label "Delete."
   - The `onClick` event handler is attached to the button, which triggers the `handleDelete` function when clicked.
   - The button is styled with a CSS class `"btn btn-delete"`, which is expected to apply the delete button styles defined in your CSS.

### 4. **Usage of `onDelete`:**
   - The actual logic of deleting the person (like making an API call to delete from a server) is not handled within this component. Instead, the `onDelete` function passed from the parent component is responsible for that.
   - This makes the component reusable, allowing it to handle deletions based on the specific logic defined by the parent.

### Example Scenario:
   - If you have a list of people, each rendered with a `DeletePerson` component, clicking the "Delete" button will prompt the user with a confirmation message.
   - Upon confirmation, the parent component will handle the deletion logic, such as removing the person from the list or making a network request to delete the person from a database. 

This component is simple and focuses on user confirmation and delegating the deletion logic to the parent component.*/