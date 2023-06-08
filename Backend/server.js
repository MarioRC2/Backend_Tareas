const express = require('express');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware.js');
const dotevn = require('dotenv').config();
const connectDB = require('./Config/db.js');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/tareas', require('./Routes/tareasRoutes.js'))
app.use('/api/users', require('./Routes/userRoutes.js'))
app.use(errorHandler);

app.listen(port, ()=> console.log(`Server started on port ${port}`));