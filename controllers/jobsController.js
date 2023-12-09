import jobsModel from "../models/jobsModel.js"
import mongoose from "mongoose";
import moment from "moment";

export const createJobController = async (req, res, next) => {
    try {
        const { company, position } = req.body;
        if (!company || !position) {
            next('Please provide all fields');
        }
        req.body.createdBy = req.user.userId;
        const job = await jobsModel.create(req.body);
        res.status(201).json({ job });
    }
    catch (error) {
        next(error);
    }
}
export const getJobController = async (req, res, next) => {
    try {
        const jobs = await jobsModel.find({ createdBy: req.user.userId })
        res.status(200).json({
            totalJobs: jobs.length,
            jobs
        })
    }
    catch (error) {
        next(error);
    }
}
export const updateJobController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { company, position } = req.body;
        if (!company || !position) {
            next('Please provide all fields');
        }
        const job = await jobsModel.findOne({ _id: id });
        if (!job) {
            next(`no jobs found with this id ${id}`);
        }
        if (!req.user.userId === job.createdBy.toString()) {
            next('You are not authorized to update this job');
            return;
        }
        const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({ updateJob });
    }
    catch (error) {
        next(error);
    }
}
export const deleteJobController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await jobsModel.findOne({ _id: id });
        if (!job) {
            next(`No job Found with this id ${id}`);
        }
        if (!req.user.userId === job.createdBy.toString()) {
            next('You are not authorized to delete this job');
            return;
        }
        await job.deleteOne();
        res.status(200).json({ message: "Success, Job deleted" });
    }
    catch (error) {
        next(error);
    }
}

export const jobsStatsController = async (req, res, next) => {
    try {
        const stats = await jobsModel.aggregate([
            // search by user jobs
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        //default stats
        const defaultStats = {
            pending: stats.pending || 0,
            reject: stats.reject || 0,
            interview: stats.interview || 0,
        };

        //monthly yearly stats
        let monthlyApplication = await jobsModel.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);
        monthlyApplication = monthlyApplication
            .map((item) => {
                const { _id: { year, month },count,} = item;
                const date = moment().month(month - 1).year(year).format("MMM Y");
                return { date, count };
            }).reverse();
        res.status(200).json({ totalJob: stats.length, defaultStats, monthlyApplication });
    }
    catch (error) {
        next(error);
    }
}