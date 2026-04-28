import mongoose from "mongoose";
import Job from "../models/Job.js";
import { sampleJobs } from "../data/sampleJobs.js";

const memoryJobs = [...sampleJobs];

function matchesSearch(job, search) {
  if (!search) {
    return true;
  }

  const text = `${job.title} ${job.company} ${job.description}`.toLowerCase();
  return text.includes(search.toLowerCase());
}

function matchesLocation(job, location) {
  if (!location) {
    return true;
  }

  return job.location.toLowerCase().includes(location.toLowerCase());
}

function matchesType(job, type) {
  if (!type) {
    return true;
  }

  return job.type.toLowerCase() === type.toLowerCase();
}

export async function getAllJobs(filters) {
  const { search, location, type } = filters;

  if (mongoose.connection.readyState === 1) {
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (type) {
      query.type = { $regex: `^${type}$`, $options: "i" };
    }

    return Job.find(query).sort({ createdAt: -1 });
  }

  return memoryJobs.filter(
    (job) =>
      matchesSearch(job, search) &&
      matchesLocation(job, location) &&
      matchesType(job, type)
  );
}

export async function getJobById(id) {
  if (mongoose.connection.readyState === 1) {
    return Job.findById(id);
  }

  return memoryJobs.find((job) => job._id === id) || null;
}

export async function createJob(payload) {
  if (mongoose.connection.readyState === 1) {
    return Job.create(payload);
  }

  const job = {
    _id: `memory-${Date.now()}`,
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  memoryJobs.unshift(job);
  return job;
}
