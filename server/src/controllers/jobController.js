import {
  createJob,
  getAllJobs,
  getJobById
} from "../repositories/jobRepository.js";

export async function listJobs(req, res, next) {
  try {
    const jobs = await getAllJobs(req.query);
    res.json({ jobs });
  } catch (error) {
    next(error);
  }
}

export async function getSingleJob(req, res, next) {
  try {
    const job = await getJobById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ job });
  } catch (error) {
    next(error);
  }
}

export async function addJob(req, res, next) {
  try {
    const { title, company, location, type, description } = req.body;

    if (!title || !company || !location || !type || !description) {
      return res.status(400).json({
        message: "Title, company, location, type, and description are required"
      });
    }

    const job = await createJob({
      title,
      company,
      location,
      type,
      description
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });
  } catch (error) {
    next(error);
  }
}
