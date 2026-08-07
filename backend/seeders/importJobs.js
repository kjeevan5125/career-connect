import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import Job from "../src/models/jobModel.js";
import jobs from "./jobs.js";

dotenv.config();

await connectDB();

try {
  await Job.deleteMany();

  await Job.insertMany(jobs);

  console.log("Jobs Imported Successfully!");
  process.exit();
} catch (error) {
  console.log(error);
  process.exit(1);
}