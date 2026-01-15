import axios from "axios";

const API_URL = "http://localhost:3000"; // backend
const AUCTION_ID = "auction_id_here";
const USER_COUNT = 20;
const MIN_BID = 10;
const MAX_BID = 200;

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function placeBid(userId: number) {
  try {
    const bid = random(MIN_BID, MAX_BID);

    await axios.post(`${API_URL}/bids`, {
      auctionId: AUCTION_ID,
      userId: `bot_${userId}`,
      amount: bid
    });

    console.log(`🤖 bot_${userId} placed bid ${bid}`);
  } catch (e: any) {
    console.log(`❌ bot_${userId} failed`);
  }
}

async function run() {
  while (true) {
    const user = random(1, USER_COUNT);
    await placeBid(user);

    await new Promise(r => setTimeout(r, random(300, 1500)));
