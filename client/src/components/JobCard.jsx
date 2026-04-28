import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <article className="job-card">
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="location">{job.location}</p>
      <p className="type">Type: {job.type}</p>
      <p className="desc">{job.description}</p>
      <div className="card-buttons">
        <Link className="ghost-button" to={`/jobs/${job._id}`}>
          View Details
        </Link>
        <button type="button">Apply Now</button>
      </div>
    </article>
  );
}

export default JobCard;
