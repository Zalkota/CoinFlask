# Senior Frontend Coding Challenge
Welcome! Below are instructions on how to utilize this repo.
- Started Febuary 06/09/2022
- Created by Jukabo.eth AKA Zalkota
- 1-page high-level description can be found at 'senior-frontend-coding-challenge/CoinFlask High-level Documentation.pdf'

## Basic
1. Part
    - [x] A) Please write a function that sorts 11 small numbers (<100) as fast as possible. Once written, provide an estimate for how long it would take to execute that function 10 Billion (10^10) times on a normal machine.
    - [x] B) Please make improvements to the code below, using Javascript.

## Practical

1. Create an application with following requirements:
    - [x] Create a list of the top 100 coins (use [Coingecko's](https://www.coingecko.com/en/api) API)
    - [x] Implement search, favorite, and sorting functionalities
    - [x] Implement state management
    - [x] if user refreshes the page, application's state needs to be preserved
    - [x] (bonus) needs to work offline

2. (Bonus)
    - [x] Write all needed tests

3. Write a high-level description (1 page) explaining your solution. Explanation should include:
    - [x] A description of what you've built
    - [x] Which technologies you've used and how they tie together
    - [x] Your reasons for high-level decisions


### CoinFlask CoinGeck API Webserver Commands
```
npm install
npm run dev
```

### Cypress Tests Commands

```
npx cypress open
```
- test file located at cypress/e2e/CoinFlaskAllTest
