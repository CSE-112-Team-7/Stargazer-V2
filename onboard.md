# Developer Onboarding Documentation

For more in depth documentation of all functions/classes in the project, check out the documentation repo available here: [repo](https://github.com/CSE-112-Team-7/CSE-112-Team-7-Docs) or the live docs link [here](https://cse-112-team-7.github.io/CSE-112-Team-7-Docs/).

---

## Front End

The front end components of our website can be found in the `\source` directory.

- `/source/pages` contains files for displaying pages and the top level css file
- `/source/assets` contains all assets for the client side site
- `/source/tests` contains all of the testing suites for the client side site
- `/source/utils` contains files with miscellaneous utility classes/functions

---

## Back End

The backend components of our website can be in the `\backend` directory. For our database, which stores registered users as well as horoscope entries for each user, we are using MongoDB. The site can be hosted locally using nodejs.

To host the website locally, first run `cd backend`, and then run `npm install` to install all dependencies. From there run `node index.mjs`, and the website will be live on localhost port 4000.

Our website is also deployed live using Heroku, which can be found [here](https://stargazer-3360f68b260a.herokuapp.com/).

Note: if you wish to run the test suites, we recommend running the following command `npm install --save-dev jest babel-jest @babel/core @babel/preset-env puppeteer jest-puppeteer` to install all packages needed to run tests locally.
