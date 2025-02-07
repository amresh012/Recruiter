const Job = require('../model/job.model'); // Assuming you have a Job model

// get all job
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }

 }


exports.createJobPost = async (req, res) => {
    try {
        const {
          title,
          description,
          company,
          location,
          salary,
          experiance,
          role,
        } = req.body;

        // Create a new job post
        const newJob = new Job({
          title,
          description,
          company,
          location,
          salary,
          experiance,
          role
        });

        // Save the job post to the database
        const savedJob = await newJob.save();

        // Send a response
        res.status(201).json({
            message: 'Job post created successfully',
            job: savedJob
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating job post',
            error: error.message
        });
    }
};

// update job post
exports.updateJobPost = async (req, res) => {
    try {
        const jobId = req.params.id;
        const {
            title,
            description,
            company,
            location,
            salary,
            experiance,
            role
        } = req.body;
        // Find the job post by id
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: 'Job post not found'
            });
        }
        // Update the job post
        job.title = title;
            job.description = description;
            job.company = company;
            job.location = location;
            job.salary = salary;
            job.experiance = experiance;
            job.role = role;
    
            // Save the updated job post to the database
            const updatedJob = await job.save();
    
            // Send a response
            res.status(200).json({
                message: 'Job post updated successfully',
                job: updatedJob
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error updating job post',
                error: error.message
            });
        }
};
    
// delete job post
exports.deleteJobPost = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job post by id and delete it
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({
                message: 'Job post not found'
            });
        }

        // Send a response
        res.status(200).json({
            message: 'Job post deleted successfully',
            job: deletedJob
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting job post',
            error: error.message
        });
    }
};

// marked as filled
exports.markAsFilled = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job post by id
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: 'Job post not found'
            });
        }

        // Mark the job post as filled
        job.filled = true;

        // Save the updated job post to the database
        const updatedJob = await job.save();

        // Send a response
        res.status(200).json({
            message: 'Job post marked as filled successfully',
            job: updatedJob
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error marking job post as filled',
            error: error.message
        });
    }
};