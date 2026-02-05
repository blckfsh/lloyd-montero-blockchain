## Overview
- Full-stack blockchain app with a Next.js frontend and NestJS backend, integrated with a token smart contract and blockchain data services.

## Local Setup & Run
1) Install dependencies
   - Frontend: `cd frontend` then `pnpm install`
   - Backend: `cd backend` then `pnpm install`
2) Configure environment
   - Frontend: create `frontend/.env.local` with required vars
   - Backend: create `backend/.env` with required vars
3) Run locally
   - Frontend: `pnpm dev` (from `frontend`)
   - Backend: `pnpm start:dev` (from `backend`)

## Prerequisites
- Node.js 20+
- pnpm
- Docker Desktop (for containerized runs)

## Docker Compose Usage
1) From repo root:
   - `docker compose -f docker/docker-compose.yml up --build`
2) Stop:
   - `docker compose -f docker/docker-compose.yml down`
3) Services
   - Frontend: `http://localhost:3000` or `http://127.0.0.1:3000`
   - Backend API: `http://localhost:3001/api/v1` or `http://127.0.0.1:3001/api/v1`

## Key Assumptions / Decisions
- Frontend uses `NEXT_PUBLIC_APP_ENV` to select Base Sepolia in development builds.
- Backend uses Redis for caching and Postgres for native currency and token balance storage.
- Frontend proxies API requests through Next.js routes to the backend service.
- Picked Hardhat 3 because Solidity test now runs on Rust-powered runtime. Wow!!!
- I selected Base Sepolia because I have native balance in it because of my previous job :D

## Known Issues / Limitations
- Etherscan/BaseScan requires a valid API key and the correct endpoint URL for the selected network.
- Some wallet providers may require switching to Base Sepolia manually if auto-switch fails.
- Would recommend if you have Base Sepolia Network in your metamask. Check it at Chainlist.

## Notes
- `frontend`, `backend`, and `blockchain` have READMEs that explain how certain app works with examples. Try to check it as well.

## Recording
- [App walkthrough: Video](https://www.loom.com/share/579bbfbecb4444f2a7215fa364e3a5c3)

