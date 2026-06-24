require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`\n Server running in ${process.env.NODE_ENV} mode`);
      console.log(`Listening on: http://localhost:${PORT}`);
      console.log(` Health check: http://localhost:${PORT}/health\n`);
    });

   
    process.on("unhandledRejection", (err) => {
      console.error(" Unhandled Rejection:", err.message);
      server.close(() => process.exit(1));
    });

    
    process.on("SIGTERM", () => {
      console.log(" SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        console.log(" Process terminated.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();