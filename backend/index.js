const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
    "https://api.chatengine.io/users/",
    { username: username, secret: username, first_name: username },
    { headers: { "Private-key": "9d7e4ca1-4631-4ab2-83ae-c86a8ec83899" } }
    );
    return res.status(r.status).json(r.data);
  } catch(e) {
    if (e.response) {
      return res.status(e.response.status).json(e.response.data);
    } else {
      // Handle network error or other unexpected errors
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.listen(3001);