### CoinFlask API Webserver Commands
```
npm install
npm run dev
```

### Cypress Tests Commands
```
npx cypress open
```
- test file located at cypress/e2e/CoinFlaskAllTest


# CoinFlask Description

CoinFlask is a rudimentary version of CoinGecko.com that provides cryptocurrency market information of the top 100 coins in real-time. The cryptocurrency market information is categorized by rank, name, price, percentage change, volume, and market capitalization. All of the cryptocurrency market data displayed by Coinflask is retrieved using the CoinGecko API.

Users have the ability to favorite, sort, and search through all 100 coins. The application features a responsive design, so that it can be viewed on a mobile device, in addition to a desktop. Users have the ability to change the currency in which the market data is displayed. For example, users from outside of the United States have the ability to display the market information in terms of the Euro (€), USD ($), or JPY (¥).

CoinFlask was built using the Vue JavaScript framework, Vuex, NPM, Javascript, Vue-Tailwind, HTML, CSS, and Figma. The Vue JavaScript framework provides a component based architecture, state management, and virtual DOM. Vue-Tailwind, HTML, and CSS provides a visually appealing user interface for displaying the cryptocurrency market data.

Vue does not preserve state persistently, so Vuex was included to manage the state of the application, as well as the methods that are responsible for changing the state. This ensures that the state of the application remains available and persistent in the event of a page refresh or internet outtage after the page has been loaded. In order to ensure that the website was free of bugs during development, Cypress was used as an end-to-end framework to automate javascript testing.

The other packages used in the development of CoinFlask were Node Package Manager (NPM) and Figma. Node Package Manager was used to manage the packages in the JavaScript runtime environment, Node.js. Figma is a cloud-based graphics prototyping tool and vector editor that was used to design the CoinFlask logo and loading animation. The logo depicts a green RuneScape potion/flask.

- Created by Jukabo.eth
