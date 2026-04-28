import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getJobs } from "../api";

function JobsPage() {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    type: ""
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadJobs() {
      try {
        setLoading(true);
        setError("");
        const data = await getJobs(filters);
        if (!ignore) {
          setJobs(data.jobs);
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

    loadJobs();
    return () => {
      ignore = true;
    };
  }, [filters]);

  function updateFilter(event) {
    const { name, value } = event.target;
    setFilters((current) => ({
      ...current,
      [name]: value
    }));
  }

  return (
    <section className="jobs-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Live opportunities</p>
          <h2>Available Jobs</h2>
        </div>
      </div>

      <div className="filters-panel">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={updateFilter}
          placeholder="Search jobs, companies, or keywords"
        />
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={updateFilter}
          placeholder="Filter by location"
        />
        <select name="type" value={filters.type} onChange={updateFilter}>
          <option value="">All job types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {loading ? <p className="status-message">Loading jobs...</p> : null}
      {error ? <p className="status-message error">{error}</p> : null}

      {!loading && !error ? (
        <div className="jobs-grid">
          {jobs.length ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <div className="empty-state">
              <h3>No jobs found</h3>
              <p>Try a different keyword, location, or job type.</p>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}

export default JobsPage;
