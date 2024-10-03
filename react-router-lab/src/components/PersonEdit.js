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

