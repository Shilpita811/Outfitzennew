const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/datebase");
const cloudinary = require("cloudinary");

// Handling uncaught error
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server due to uncaught error`);
    process.exit(1);
});


// Config
dotenv.config({path:"backend/config/config.env"});

// Connect Database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
})
