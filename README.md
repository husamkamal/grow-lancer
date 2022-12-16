

![](https://i.imgur.com/7GjOtML.png)

A platform that combine clients with professional freelancers

## [View Demo](https://g-lancer.herokuapp.com/)


## Problem

- Difficulties faced by clients in finding a qualified freelancer.
- Difficulties faced by freelancers to reach clients.
- Freelancers spend a lot of time finding a suitable jobs.
- working with control freak management.
- being clocked in and out of the office.
## Solution

- Find The Freelance Services For Your Business. A Whole World Of Talent At Your Fingertips.
- Hire the talent needed to get your business growing.
- Find Top Services for Every Budget!
- Find Jobs suitable for your abilities in one place.
- Offer a variety of tools and services that make it easier for users to find work and manage their projects.
- Saving the time of freelancers to get a project.

## Database Schema
- [Database](https://drawsql.app/teams/shatha/diagrams/freelance)

![](https://i.imgur.com/26vntx4.jpg)

## Built With

* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/docs/)
* [Sequelize](https://sequelize.org/)
* [Material UI](https://mui.com/)
* [Nodemailer](https://nodemailer.com/about/)
* [Socket.io](https://socket.io/)
* [Formik](https://formik.org/docs/overview)
* [Firebase](https://firebase.google.com/?gclid=CjwKCAiAvK2bBhB8EiwAZUbP1Hc_ZBAlh7bXJ7Xj0ej6-NyCp0bie9tE8zte750bNCh_EADq5ugXghoCmaAQAvD_BwE&gclsrc=aw.ds)


## User journey
- Freelancer: I can see the available jobs, or search for specific jobs that suit my fields and apply for them then wait for the response. 
- Client: I can add a new job advertisement. also, see the applied requests and then accept the one who satisfies me and accepts his request. 
## User Stories

- AS A Freelancer
  -  I can create a new account.
  -  I can log into my account.
  -  I want to see all Jobs available.
  -  I want to search for a specific job.
  -  I want to filter the jobs depending on category and salary.
  -  I want to see the Job details.
  -  I want to apply for jobs by the proposal.
  -  when the proposal is accepted I can receive an email
  -  when the proposal did not accept the job will disappear from the job list.
  -  I want to see my profile.
  -  I want to add my portfolio to my account.
  -  I want to see all the jobs I applied for.
 - As A Client, 
    -  I can create a new account.
    -  I can log into my account.
    -  I want to see my profile.
    -  I want to see the jobs I published.
    -  I want to see the proposals for a specific job.
    -  I want to add a new Job.
    -  I want to see the freelancer profile.
    -  I want to accept the proposal and hire the freelancer.
  
### Figma and UI/UX Design
- [Figma](https://www.figma.com/file/JscUnsrkjrziWvlS5jOGL5/Freelance?node-id=0%3A1)


### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/CA-G12/g-lancer.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. In the project root folder, rename `.env.example` file to `.env` and fill in the environment variables
   ```sh
   SECRET_KEY='<your secret key>'
   DEV_DATABASE_URL=postgres://<username>:<password>@localhost:<port || 5432>/<development database>
   TEST_DATABASE_URL=postgres://<username>:<password>@localhost:<port || 5432>/<test database>
   APP_EMAIL='<your email>'
   APP_EMAIL_PASSWORD='<your password>'
   CLIENT_LINK= 'http://localhost:3000'
   ```
4. In the `client` folder, renmae `.env.example` file to `.env` and fill in the environment variables
    ```sh
    REACT_APP_SERVER_LINK = 'http://localhost:3500'
    ```
5. To run the server, you can run the ``` npm run dev ```  and to run the client server you need to ```npm run client```

6. To build the database ``` npm run db:seed```

## Our Great Team
- [Shatha K. Eqdaih](https://github.com/shathakh) => shathaqudaih17@gmail.com 
- [Moahmmed Alagha](https://github.com/mohammedagha27) => modyagha7@gmail.com 
- [Nagham Abuwarda](https://github.com/naghamabuwarda) => nasomabuwarda@gmail.com  
- [Ali Al-Shanti](https://github.com/alishanti98) => alialshanti90@gmail.com 


## Our Great Team Leader
- [Lina Ebeid](https://github.com/LinaYahya)

