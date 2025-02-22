# Task Management Application
==========================

A simple task management application built with React, TypeScript, and Tailwind CSS.

## Features
--------

* Create, read, update, and delete (CRUD) tasks
* Search tasks by keyword
* Drag and drop tasks to reorder them
* Toast notifications for successful actions
* React Query for data fetching and caching

## Getting Started
---------------

1. Clone the repository: `https://github.com/Cre8ive-collins/react1840.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser at `http://localhost:3000`

### Approach

This application was built using a modular approach, with separate components for each feature. The application is divided into the following main components:

* `api`: Mock API for task data
* `components`: Reusable React components
* `providers`: React Query providers for data fetching and caching
* `views`: Application views (e.g. homepage, task board)

The application uses React Query for data fetching and caching, and Tailwind CSS for styling.

## Project Structure
-----------------

* `src`: Source code for the application
  + `api`: Mock API for task data
  + `components`: Reusable React components
  + `providers`: React Query providers for data fetching and caching
  + `views`: Application views (e.g. homepage, task board)
* `public`: Static assets (e.g. index.html, favicon.ico)
* `styles`: Global CSS styles (e.g. tailwind.config.js, index.css)



## Technologies Used
-----------------

* React: Front-end framework
* TypeScript: Static type checking
* Tailwind CSS: Utility-first CSS framework
* React Query: Data fetching and caching library
* Jest: Testing framework

### Additional Notes

* The application uses a mock API for task data, which is stored in the `api` directory.
* The application uses React Query for data fetching and caching, which is configured in the `providers` directory.
* The application uses Tailwind CSS for styling, which is configured in the `styles` directory.
* The application is built using a modular approach, with separate components for each feature.
* The application is tested using Jest, which is configured in the `jest.config.js` file.

