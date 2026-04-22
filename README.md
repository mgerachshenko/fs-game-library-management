# Project: Steam Library Clone

## Team: Team Null

-   \*\*Member 1: Dara 
-   \*\*Member 2: Lance 
-   \*\*Member 3: Mikhail 

## Project Description

This project aims to simulate the core experience of the Steam client but with retro video games. Users
can view the games they own, manage their personal account information and leave reviews on games
they own.

### General User Stories

1. **Dara**, As a gamer, I want to manage personal information, like my user
   name, profile picture etc.
2. **Lance**, As a gamer, I want to be able to manage my downloads, so that I
   can uninstall the games I'm not playing.
3. **Mikhail**, As a gamer, I want to be able to have a wishlist of games and
   be able to buy games with ease while seeing if they have a discount on them.

### Local Setup Instructions

To run this project locally, both the front-end and back-end must have the proper environment variables, and the database must be set up before starting the application.

1. Clone the repo and install dependencies, make sure it's from the root directory.:

   npm install

2. Create a front-end .env file and add:

    VITE_CLERK_PUBLISHABLE_KEY=clerk_publishable_key
    VITE_API_BASE_URL=http://localhost:3001

3. Create a back-end .env file and add:

    FRONTEND_URL=http://localhost:5173
    DATABASE_URL="postgresql://postgres:password@localhost:5432/press_start_dev"
    CLERK_SECRET_KEY=clerk_secret_key
    CLERK_PUBLISHABLE_KEY=clerk_publishable_key

4. Make sure PostgreSQL is running on your machine.

5. From root, do the following commands in order for prisma migrations:

    cd apps/backend
    npx prisma migrate dev

6. Seed the database:

    npx prisma db seed

7. Return to root and start both applications:

    cd ../..
    npm run dev

8. Open front-end in your browser of choice at this link:

    http://localhost:5173