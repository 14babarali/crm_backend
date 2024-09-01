const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => console.error('MongoDB connection error:', err));

// Routes
const customerRoutes = require('./routes/customer');
const authRoutes = require('./routes/auth');
app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('CRM System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(morgan('dev'));
// app.use(express.json());

// // Basic route to ensure the server is running
// app.get('/', (req, res) => {
//     res.send('CRM System API is running...');
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch((error) => {
//     console.error('MongoDB connection error:', error);
// });
