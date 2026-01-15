const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

let round = 1
let topBid = 100
let roundEndsAt = Date.now() + 30000

// FAKE BOT BIDS + ANTI-SNIPING
setInterval(() => {
  topBid += Math.floor(Math.random() * 25) + 5

  if (roundEndsAt - Date.now() < 5000) {
    roundEndsAt += 5000
  }
}, 3000)

// ROUND CHECK
setInterval(() => {
  if (Date.now() >= roundEndsAt) {
    round++
    topBid = 100
    roundEndsAt = Date.now() + 30000
  }
}, 1000)

// API
app.get("/auction/state", (req, res) => {
  res.json({
    round,
    topBid,
    roundEndsAt
  })
})

app.listen(3000, () =>
  console.log("Backend running on http://localhost:3000")
)
