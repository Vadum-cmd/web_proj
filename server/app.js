const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/matrixApp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

const userRoutes = require('./routes/user.routes');
const matrixRoutes = require('./routes/matrix.routes');

app.use('/api/user', userRoutes);
app.use('/api/matrix', matrixRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
