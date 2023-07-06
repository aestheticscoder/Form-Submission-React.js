import React, { useState } from "react";
import "./App.css";

const StudentForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Complete set of Validations
    const validationErrors = {};

    if (!firstName) {
      validationErrors.firstName = "First name is required";
    }

    if (!lastName) {
      validationErrors.lastName = "Last name is required";
    }

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!phone) {
      validationErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      validationErrors.phone = "Invalid phone number (10 digits required)";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear form fields and errors
    onSubmit({ firstName, lastName, email, phone });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const StudentTable = ({ students }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.email}</td>
            <td>{student.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [students, setStudents] = useState([]);

  const handleFormSubmit = (student) => {
    setStudents([...students, student]);
  };

  return (
    <div>
      <h1>Student Form</h1>
      <StudentForm onSubmit={handleFormSubmit} />
      <h2>Student List</h2>
      {students.length > 0 ? (
        <StudentTable students={students} />
      ) : (
        <p>No students to display</p>
      )}
    </div>
  );
};

export default App;
