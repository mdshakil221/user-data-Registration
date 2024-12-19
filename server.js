const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
const userRoutes=require("./routes/userRoutes");

dotenv.config();
const app=express();

app.use(express.json());
app.use(cookieParser());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiesTopology: true})
    .then(()=> console.log("MongoDB Connected"))
    .catch((err)=> console.log("err"));

app.use("/api/users", userRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));