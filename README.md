# Telegram Gift Auction — Backend Auction Challenge

This project is an implementation of a multi-round auction system inspired by Telegram Gift Auctions.
The goal is not to blindly follow a specification, but to analyze an existing product, make reasonable
assumptions, and implement a reliable backend system.

---

## 1. Product Analysis & Assumptions

### What is Telegram Gift Auction
Telegram Gift Auctions are not classic single-deadline auctions.
They work as a **multi-round elimination system**:

- An auction consists of several rounds
- Each round has a fixed duration
- In every round:
  - Top bidders receive the digital gift
  - Remaining participants continue to the next round
- The auction ends when all items are distributed

### Key Observations
- Bids are **cumulative** (users can increase their bid)
- Funds are **reserved**, not immediately spent
- Anti-sniping exists: last-second bids extend the round
- Losing users get their reserved funds back
- Winning users pay exactly their final bid

### Assumptions Made
Because Telegram does not publish a formal specification, the following assumptions were made:

- Ranking is based on highest bid amount
- If bids are equal, earlier bid wins
- Anti-sniping extends the round by 30 seconds if a bid is placed in the last 15 seconds
- Funds are locked on bid placement
- Users cannot bid more than their available balance

All assumptions are explicitly documented to demonstrate product thinking.

---

## 2. Backend Architecture

### Tech Stack
- Node.js
- TypeScript
- MongoDB
- Redis (for locks and round timing)
- Docker / Docker Compose

### Core Components
- Auction Service
- Round Manager
- Bidding Engine
- Balance & Ledger Service
- Anti-sniping Logic

### Key Design Decisions
- MongoDB transactions ensure financial correctness
- Redis locks prevent race conditions
- Idempotent bid processing
- No funds are duplicated or lost

---

## 3. API Overview (Simplified)

- POST /auctions — create auction
- POST /bids — place or increase bid
- GET /auctions/:id — get auction state
- GET /users/:id/balance — view balance

---

## 4. Minimal UI

A simple web UI is provided to:
- Create auctions
- Place bids
- Display live auction state
- Show balances

Design is intentionally minimal.

---

## 5. Load & Concurrency Testing

Bot scripts simulate:
- Hundreds of concurrent bidders
- Last-second bids
- Rapid bid updates

This validates race condition safety and anti-sniping behavior.

---

## 6. Running Locally

```bash
docker-compose up --build
