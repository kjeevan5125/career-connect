import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

const applyForJob = async(req, res)=>{
    const job = await Job.findById(req.params.jobId);

    if(!job){
        return res.status(404).json({
            message: "Job not found",
        });
    }

    const alreadyApplied = await Application.findOne({
        applicant: req.user._id,
        job: req.params.jobId,
    });

    if(alreadyApplied){
        return res.status(400).json({
            message: "You have already applied for this job",
        });
    }

    const application = await Application.create({
        applicant: req.user._id,
        job: req.params.jobId,
    });

    res.status(201).json(application);
};

const getMyApplications = async(req, res)=>{
    const applications = await Application.find({
        applicant: req.user._id,
    })
    .populate("job")
    .populate("applicant", "name email");

    res.status(200).json(applications);
};

const getJobApplications = async(req, res)=>{
    const job = await Job.findById(req.params.jobId);

    if(!job){
        return res.status(404).json({
            message: "Job not found",
        });
    }

    if( !job.createdBy || job.createdBy.toString()!=req.user._id.toString()){
        return res.status(403).json({
            message: "You are not authorized to view applications for this job",
        });
    }

    const applications = await Application.find({
        job: req.params.jobId,
    })
    .populate("applicant", "name email");

    res.status(200).json(applications);
}

const updateApplicationStatus = async(req, res)=>{
    const application = await Application.findById(req.params.applicationId);

    if(!application){
        return res.status(404).json({
            message: "Application not found",
        });
    }

    const job = await Job.findById(application.job);

    if(!job){
        return res.status(404).json({
            message: "Job not found",
        });
    }

    if( !job.createdBy || job.createdBy.toString()!=req.user._id.toString()){
        return res.status(403).json({
            message: "You are not authorized to update this application",
        });
    }

    const { status } = req.body;

    if(!['pending', 'accepted', 'rejected'].includes(status)){
        return res.status(400).json({
            message: "Invalid status",
        });
    }

    application.status = status;
    await application.save();

    res.status(200).json(application);
}

export { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus };