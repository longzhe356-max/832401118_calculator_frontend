# Calculator Frontend

A front-end client for a front-end/back-end separated calculator system, built with Vue 3 and Vite.

## Tech Stack

- Vue 3
- Vite
- axios

## Requirements

- Node.js 18 or higher

## Install

npm install

## Run

npm run dev

Then open http://localhost:5173 in your browser.

## Configuration

The back-end API base URL is configured in src/api/index.js. By default it points to:

http://localhost:8080/api

If the back-end is deployed elsewhere, update this value accordingly.

## Project Structure

src/
  api/
    index.js          API request wrappers
  components/
    Calculator.vue    Calculator UI and calculation request
    HistoryList.vue   History list and delete actions
  App.vue             Root component
  main.js             Entry point
  style.css           Global styles

## Notes

- All calculations are performed on the back-end. The front-end only sends expressions and displays results.
- Calculation history is persisted on the back-end database and is not stored in the browser.