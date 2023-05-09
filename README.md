# Project Name 📽️

A web application built with Golang, React, TypeScript, and SCSS to display user profiles using styled-components and environment variables.

## Technologies

- Backend: Golang, Gorilla Mux, CORS
- Frontend: React, TypeScript, SCSS, styled-components
- Package manager: Yarn

## Prerequisites

- Golang (version 1.17 or later)
- Node.js (version 14 or later)
- Yarn (version 1.22 or later)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/PunGrumpy/card-profile-go
cd card-profile-go
```

2. Install dependencies:

   - Frontend:

   ```bash
   yarn install
   ```

   - Backend:

   ```bash
   cd backend
   go mod download
   ```

3. Run the application:

   - Frontend:

   ```bash
   yarn start
   ```

   - Backend:

   ```bash
   cd backend
   go run main.go
   ```

The application will be available at `http://localhost:3000`. and the backend will be available at `http://localhost:8000`.

# Configuration ⚙️

## Backend

Create a `.env` file in the `backend` directory with the following content:

```env
PORT=8000
```

Replace `http://localhost:3000` with the actual origin you want to allow. Replace `8000` with the actual port you want to use.

## Frontend

Create a `.env` file in the root directory with the following content:

```env
REACT_APP_API_URL=http://localhost:8000
```

Replace `http://localhost:8000` with the actual URL of the backend API.

# Docker 🐳

## Backend

1. Build the image:

```bash
docker compose up --build
```

2. Run the container:

```bash
docker compose up -d
```

## Frontend

1. Build the image:

```bash
docker build -t card-profile-go .
```

2. Run the container:

```bash
docker run -d -p 3000:3000 card-profile-go
```

# License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# Acknowledgements 🙏

- [Goriila Mux](https://pkg.go.dev/github.com/gorilla/mux)
- [CORS](https://pkg.go.dev/github.com/rs/cors)
- [GoDotEnv](https://pkg.go.dev/github.com/joho/godotenv)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [styled-components](https://styled-components.com/)
