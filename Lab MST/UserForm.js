import React, { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setSubmitted(true);
  };

  return (
    <div>
      <h2>User Information Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          <h3>Data Saved Successfully..</h3>
          <p><b>Name:</b> {formData.name}</p>
          <p><b>Email:</b> {formData.email}</p>
          <p><b>Age:</b> {formData.age}</p>
        </div>
      )}
    </div>
  );
}

export default UserForm;