import { Link } from "react-router-dom";

const categories = [
  "IT and Software",
  "Design",
  "Data and Analytics",
  "Marketing",
  "Management",
  "Internships"
];

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">India's modern hiring space</p>
          <h1>
            Your <span>dream career</span> starts here
          </h1>
          <p className="hero-text">
            Search roles, explore top companies, and post new openings from one
            full-stack platform.
          </p>
          <div className="search-box">
            <input type="text" placeholder="Job title or keyword" readOnly />
            <input type="text" placeholder="Location" readOnly />
            <Link to="/jobs" className="cta-button">
              Search Jobs
            </Link>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-card">
          <h3>10,000+</h3>
          <p>Jobs Posted</p>
        </div>
        <div className="stat-card">
          <h3>2,500+</h3>
          <p>Companies</p>
        </div>
        <div className="stat-card">
          <h3>50,000+</h3>
          <p>Candidates</p>
        </div>
      </section>

      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div key={category} className="category-card">
              {category}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
