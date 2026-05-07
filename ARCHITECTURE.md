# Architecture

## Stack

Frontend:
- React + Vite

Backend:
- Node.js + Express

Database:
- MongoDB Atlas

AI:
- Gemini API

## Data Flow

User Input
↓
Audit Engine (hardcoded pricing rules)
↓
Savings Calculation
↓
AI Summary Generation
↓
Result Page

## Notes

The audit engine uses rule-based logic instead of AI for financial recommendations because deterministic pricing logic is more reliable and transparent.