import axios from "axios";

const API_URL = "http://localhost:3000";
const AUCTION_ID = "auction_id_here";
const USER_COUNT = 20;
const MIN_BID = 10;
const MAX_BID = 200;

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function bid(i: number) {
  const amount = rnd(MIN_BID, MAX_BID);
  try {
    await axios.post(`${API_URL}/bids`, {
      auctionId: AUCTION_ID,
      userId: `bot_${i}`,
      amount
    });
  } catch {}
}

async function run() {
  while (true) {
    await bid(rnd(1, USER_COUNT));
    await new Promise(r => setTimeout(r, rnd(300, 1500)));
  }
}

run();
