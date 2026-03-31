const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Imports (Routes) - Keep these at the top
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes'); // Top with imports
const billingRoutes = require('./routes/billingRoutes');     // Top with imports
const doctorRoutes = require('./routes/doctorRoutes');
const staffRoutes = require('./routes/staffRoutes');
const authRoutes = require('./routes/authRoutes'); // Top with imports


const app = express();

// 2. Middleware
app.use(express.json()); 
const allowedOrigins = [
    'http://localhost:3000', // React frontend
    'http://localhost:5000', // API server (if needed)
    "https://hospital-management-backend-olive.vercel.app/",
    "https://hospital-management-backend-olive.vercel.app",

  "https://69cb4afbba7551aee9966b4e--bright-tartufo-a6f142.netlify.app/",
  "https://bright-tartufo-a6f142.netlify.app"
    

  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow non-browser tools like Postman
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(' CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // if using cookies or Authorization headers
  };
  
  app.use(cors(corsOptions));   

// 3. API Routes - These must come AFTER middleware but BEFORE the server starts
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/inventory', inventoryRoutes);      
app.use('/api/billing', billingRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/staff', staffRoutes);


// 4. Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
console.log('🔗 Connecting to MongoDB with URI:', MONGO_URI);

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.log('❌ MongoDB Connection Error:', err));

    

// 5. Simple Test Route
app.get('/', (req, res) => {
    res.send('Hospital Management API is running...');
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});