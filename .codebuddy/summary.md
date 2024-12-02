# Project Summary

## Overview of Technologies Used

This project is divided into two main components: an API backend and a web frontend. 

### Languages and Frameworks
- **Backend**: 
  - TypeScript
  - Node.js
  - Express (implied by the structure)
  
- **Frontend**: 
  - TypeScript
  - React
  
### Main Libraries
- **Backend**:
  - TypeORM (implied by the presence of `ormconfig.json` and migration files)
  - Nodemon (indicated by `nodemon.json`)
  
- **Frontend**:
  - React
  - Axios (for HTTP requests, indicated by `axios.ts`)

## Purpose of the Project

The purpose of the project appears to be the development of a full-stack application that manages recipes, shopping lists, and ingredients. The backend provides an API for managing these entities, while the frontend offers a user interface for interaction with the data.

## Build and Configuration Files

Here is a list of relevant files for the configuration and building of the project:

### Root Directory
- `/.env.dist`
- `/.gitignore`
- `/docker-compose.yml`
- `/Makefile`
- `/package-lock.json`
- `/README.md`

### API Development Directory
- `/api-dev/.gitIgnore`
- `/api-dev/nodemon.json`
- `/api-dev/ormconfig.json`
- `/api-dev/package-lock.json`
- `/api-dev/package.json`
- `/api-dev/tsconfig.json`

### Web Development Directory
- `/web-dev/package-lock.json`
- `/web-dev/package.json`
- `/web-dev/tsconfig.json`

## Source Files Location

The source files for the backend and frontend can be found in the following directories:

- **Backend Source Files**: 
  - `/api-dev/src`
  
- **Frontend Source Files**: 
  - `/web-dev/src`

## Documentation Files Location

Documentation files are located in the root directory:

- `/README.md` 

This file typically contains information about the project, setup instructions, and usage guidelines.