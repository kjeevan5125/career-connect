import Job from "../models/jobModel.js";

const getJobs = async(req,res) => {
    const jobs = await Job.find();
    res.status(200).json(jobs);
};

const createJob = async(req,res)=>{
    const job = await Job.create({
        ...req.body,
        createdBy: req.user._id
    });
    res.status(201).json(job);
}

const getJobById = async(req,res)=>{
    const job = await Job.findById(req.params.id);
    if(!job){
        return res.status(404).json({message: "Job not found"});
    }
    res.status(200).json(job);
}

const updateJob = async(req,res)=>{
    const job = await Job.findById(req.params.id);

    if(job.createdBy.toString()!==req.user._id.toString()){
        return res.status(403).json({
            message: "Access denied. You are not authorized to update this job."
        })
    }

    if(!job){
        return res.status(404).json({message: "Job not found"});
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedJob);
}

const deleteJob = async(req,res)=>{
    const job = await Job.findById(req.params.id);

    if (job.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "Access denied. You are not authorized to delete this job."
        });
    }

    if(!job){
        return res.status(404).json({message: "Job not found"});
    }

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Job deleted successfully"});
}

export {getJobs, createJob, getJobById, updateJob, deleteJob};