const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', clientRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
