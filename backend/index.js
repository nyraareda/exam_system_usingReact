require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const userRouter = require("./routes/usersRoutes");
const questionRouter = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const resultRoutes = require("./routes/resultRoutes");
const authRouter = require("./routes/authRoutes");
const isAuth = require("./middlewares/auth/isAuth");
const swaggerOptions = require("./swagger.json");

const app = express();

// Set up environment variables
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const mongoDBURL = process.env.mongoDBURL;

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Adjust as necessary
};

app.use(cors(corsOptions));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Non-auth Routes
app.use("", authRouter);

// Auth Middleware (isAuth)
app.use(isAuth);

// Locked Routes
app.use("/users", userRouter);
app.use("/questions", questionRouter);
app.use("/exams", examRoutes);
app.use("/results", resultRoutes);

// General Error Handler
app.use((error, req, res, next) => {
  res.status(500).json({ message: `Server Error: ${error.message}` });
});

// Start Server and Connect to MongoDB
mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit with failure
  });
