const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./database/connectDB");
const app = express();

// middlewares
app.use(express.json({extended: false,}));
app.use(cors()) 

//dbConnection
connectDB();

//routers

const userRoute = require('./routers/userRoutes')


///apis

app.use('/api/user' , userRoute)


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
