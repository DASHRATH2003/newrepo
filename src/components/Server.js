// const express = require('express');
// const mongoose = require('mongoose');

// //router
// const job = require("../email-backend/route/job")


// const app = express();
// app.use(express.json());
// app.use('/job', job)

// // ✅ Connect to your local MongoDB database 'Newdatabase'
// mongoose.connect('mongodb://localhost:27017/Newdatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ Connected to 'Newdatabase'"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// // ✅ Example Schema for services (like job postings or HR services)
// const ServiceSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   location: String,
//   postedAt: { type: Date, default: Date.now }
// });

// const Service = mongoose.model('Service', ServiceSchema);

// // ✅ Add service API
// app.post('/api/services', async (req, res) => {
//   try {
//     const service = new Service(req.body);
//     const saved = await service.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to save service' });
//   }
// });

// // ✅ Get all services API
// app.get('/api/services', async (req, res) => {
//   try {
//     const services = await Service.find().sort({ postedAt: -1 });
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch services' });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
