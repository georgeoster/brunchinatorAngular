# Brunchinator Angular

Brunchinator Angular is the frontend component of the Brunchinator web application. Built with Angular, it delivers a modern, responsive, and interactive user experience, seamlessly integrating with the [Brunchinator BackEnd](https://github.com/brunchinatorMaster/brunchinatorBackEnd)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Contact](#contact)

## Overview

Brunchinator Angular serves as the client-side of the Brunchinator project, offering an intuitive interface and robust functionality using the latest Angular features. It is designed to work in tandem with the Brunchinator backend to deliver a seamless user experience.

## Features

- **Responsive UI:** Designed to work on all devices.
- **Modular Architecture:** Easy-to-maintain codebase with reusable components.
- **API Integration:** Connects with the Brunchinator backend for dynamic data.
- **Modern Tooling:** Leveraging Angular CLI for development and deployment.
- **Testing:** Comprehensive unit tests using Jasmine and Karma.

## Project Structure
```bash
brunchinatorAngular/
├── node_modules/ # Installed dependencies
├── src/
│ ├── app/ # Main Angular application code
│ │ ├── components/ # Reusable UI components
│ │ ├── models/ # TypeScript interfaces & models
│ │ ├── services/ # API integration & business logic
│ │ ├── utils/ # Global Consts and helper functions
│ └── index.html # Application entry point
├── angular.json # Angular CLI configuration
├── package.json # NPM package configuration and scripts
└── tsconfig.json # TypeScript compiler configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [Angular CLI](https://cli.angular.io/) (v12 or later)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/brunchinatorMaster/brunchinatorAngular.git

2. **Navigate to the project directory:**
    ```bash
    cd brunchinatorAngular
    ```
3. **Install the dependencies:**
    ```bash
    npm install
    ```
### Development
To run the application in development mode with live reloading, execute:
  ```bash
  ng serve
  ```
Open your browser and navigate to http://localhost:4200/ to view the app.

### Building for Production
To build the project for production, run:
  ```bash
  ng build --prod
  ```
The compiled output will be located in the dist/ directory.

### Contact
For more information, please visit the [Brunchinator website](https://www.brunchinator.com) or contact the maintainer at georgeostercodes@gmail.com.
