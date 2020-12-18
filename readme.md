## socketIO- nodeJS server and simple react client

# Contact:
Joel Morrison
joelm@jmm.id.au
0412 208 870

# Purpose
Demonstrate socketIO transport POC between nodeJS (server) and simple JS client (reactJS)
Loads feature toggle payload- after initial interval

# Tech used
node 9.2.0 (or higher)
npm 5.5.1 (or higher)
ES6
Babel

# Instructions
Open terminal session
run `npm i && npm run demo:socket`


## What would I do differently next time

Over what was discussed in tech interview->
- Write React using functional component and react hooks, instead of class based component
- Seperate concerns within components more/strucured simple resp
- Add appropriate solid unit tests -  using jest/enzyme 
- Add appropriate solid E2E tests -  using jest/Puppeteer 
- Add entry point for client- /src/index.js, move app.js to be imported from it.
- Server: Add CLI support & simple express endpoint