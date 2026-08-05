require("dotenv").config()
const cookie = require("cookie-parser")
const express = require("express")
const helmet = require("helmet");
const cors = require("cors")
const connectDb = require("./database/mongoose")
const app = express()
app.set("trust proxy", 1);
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

console.log(__filename);
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://havenlyy.vercel.app"
    ],
    credentials: true
}));

 

app.get("/health" , (req , res)=>{
  res.status(200).json({
    message: "Havenly API is running",
    status: "ok"
  })
})
const webhook = require("./routes/webhook");
app.use(webhook)
app.use(express.json())
app.use(cookie())
app.use("/uploads" , express.static("uploads"))

const users = require("./routes/users")
const wishlist = require("./routes/wishlist")
const auth = require("./routes/auth")
const dashboard = require("./routes/dashboard")
const Payment = require("./routes/Payment")
app.use(users)
app.use(wishlist)
app.use(auth)
app.use(dashboard)
app.use(Payment)
 

const startServer = async () => {
  try {
    await connectDb();

    const PORT = process.env.PORT || 4090;
    app.listen(PORT)
   
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

startServer();



    