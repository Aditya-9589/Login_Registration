const express = require("express");
const path = require('path');
const app = express();
const port = 8000;
const connectDb = require("./db/dbConnection");
const User = require("./db/user");
const cors = require('cors');

// MiddleWare for parsing JSON
app.use(express.json());

// Enabled CORS
app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../front-end/build')));

// Registration Route :-
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    res.status(500).json({ error: "Registration Failed." });
  }
});

// Login Route :-
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({error: "Invalid Username or Password" });
    }

    if(user.password !== password) {
        return res.status(401).json({error: "Invalid Username or Password" });
    }
    res.status(200).json({message:"Login Successful"});

  } 
  catch (error) {
    res.status(500).json({error: "Login failed"})
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build', 'index.html'));
});

// Connect to the database
connectDb();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
