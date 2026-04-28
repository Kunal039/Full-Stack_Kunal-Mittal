import { useState } from "react";
import { Link } from "react-router-dom";
import { createJob } from "../api";
import { useAuth } from "../contexts/AuthContext";

const initialForm = {
  title: "",
  company: "",
  location: "",
  type: "",
  description: ""
};

function PostJobPage() {
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [submittedJob, setSubmittedJob] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isAuthenticated) {
      setStatus({
        type: "error",
        message: "Please login before posting a job."
      });
      return;
    }

    try {
      const data = await createJob(formData);
      setSubmittedJob(data.job);
      setStatus({
        type: "success",
        message: "Job posted successfully."
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message
      });
    }
  }

  return (
    <section className="post-job-section">
      <div className="post-job-card">
        <p className="eyebrow">Recruiter workspace</p>
        <h2>Post a New Job</h2>

        {!isAuthenticated ? (
          <div className="auth-gate">
            <h3>Login required</h3>
            <p>
              Create an account or sign in before posting a job.
            </p>
            <Link to="/login" className="cta-button">
              Go to Login
            </Link>
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            disabled={!isAuthenticated}
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            required
            disabled={!isAuthenticated}
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            disabled={!isAuthenticated}
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            disabled={!isAuthenticated}
          >
            <option value="">Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            required
            disabled={!isAuthenticated}
          />

          <button type="submit" disabled={!isAuthenticated}>
            Post Job
          </button>
        </form>

        {status.message ? (
          <p className={`status-message ${status.type}`}>{status.message}</p>
        ) : null}

        {submittedJob ? (
          <div className="user-profile">
            <p className="profile-tag">Posted by {user?.name}</p>
            <h3>Last Submitted Job</h3>
            <p>
              <strong>Title:</strong> {submittedJob.title}
            </p>
            <p>
              <strong>Company:</strong> {submittedJob.company}
            </p>
            <p>
              <strong>Location:</strong> {submittedJob.location}
            </p>
            <p>
              <strong>Type:</strong> {submittedJob.type}
            </p>
            <p>
              <strong>Description:</strong> {submittedJob.description}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default PostJobPage;
