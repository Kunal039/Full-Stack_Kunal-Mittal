import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobById } from "../api";

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadJob() {
      try {
        setLoading(true);
        setError("");
        const data = await getJobById(id);
        if (!ignore) {
          setJob(data.job);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadJob();
    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <section className="detail-page">
      {loading ? <p className="status-message">Loading job details...</p> : null}
      {error ? <p className="status-message error">{error}</p> : null}

      {job ? (
        <div className="detail-card">
          <p className="eyebrow">Job Overview</p>
          <h2>{job.title}</h2>
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Type:</strong> {job.type}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
          <Link to="/jobs" className="ghost-button back-link">
            Back to Jobs
          </Link>
        </div>
      ) : null}
    </section>
  );
}

export default JobDetailsPage;
