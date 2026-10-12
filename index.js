// Import dependencies
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.adviceslip.com/advice";

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Initiate web app by rending index.ejs
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Handle post request after user input is submitted and sends the response
// to the advice route.
app.post("/advice", async (req, res) => {
  try {
    const result = await axios.get(API_URL);
    const data = {
      "mood": req.body.userMood,
      "ourAdvice": result.data.slip.advice
    }
    res.render("index.ejs", { content: data });

  } catch (error) {
    console.log("An error occured:", error);
  }
});

// Redirect user to home route if they want to try again with a different mood.
app.get("/advice", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});