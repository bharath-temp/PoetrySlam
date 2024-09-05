# Poetry Slam 
![](https://github.com/bharathpadmaraju/PoetrySlam/workflows/backend%20ci%20pipeline/badge.svg)
![](https://github.com/bharathpadmaraju/PoetrySlam/workflows/frontend%20ci%20pipeline/badge.svg)

PoetrySlam is a full-stack web application where users can share, explore, and discuss poetry. It provides a modern platform for poets to post their poems, interact with others, and explore a wide variety of poetry categories.

## Features

- **User Authentication**: Users can sign up and log in using secure OAuth2-based authentication.
- **Poem Posting**: Authenticated users can create and post poems in various categories, including free verse, haiku, sonnets, and more.
- **Interactive Feed**: Users can view poems posted by others, upvote poems they like, and explore different types of poetry.
- **User Profiles**: Each user has a personal feed where they can view the poems they have posted.

## Architecture


### Backend (FastAPI)

The backend is built using FastAPI, which provides a robust, asynchronous API. Key functionality includes:

-   Managing user authentication via OAuth2 and JWT tokens.
-   Storing user and poem data using SQLAlchemy and SQLite.
-   Handling CRUD operations for poems and users.

### Frontend (React)

The frontend is built using React and utilizes styled components for a modern, responsive user interface. It communicates with the backend API to handle user interactions. Users can:

-   Sign up and log in via forms that send data to the backend API.
-   Post new poems and view their personal poem feed.
-   Browse, upvote, and explore poems from other users.

The frontend and backend are connected through RESTful API requests, allowing seamless data exchange and user interaction across both platforms.

## Installation

### Prerequisites
- Python 3.x
- Poetry python package management 
- Node.js & yarn
