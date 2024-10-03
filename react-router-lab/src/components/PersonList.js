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

