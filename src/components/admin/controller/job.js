// import jobmodel from '../model/job'

// exports.createJob = async (req, res) => {
//     const {position, experience, joblocation, education, category, details} = req.body;
//     try {
//         const job = jobmodel({
//             position,
//             experience,
//             joblocation,
//             education,
//             category,
//             details
//         });
//         await job.save();
//         return res.status(200).json({
//             job:job
//         })
//     } catch (error) {
//         res.status(500).json({
//             message : error.message
//         })
//     }
// }