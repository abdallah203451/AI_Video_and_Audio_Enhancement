# AI Video & Audio Enhancement Platform

A comprehensive platform for advanced audio processing using AI, featuring a robust backend, a modern frontend, and powerful AI models. The project is structured into three main components:

- **AI Models**: RVRT, Demucs, and Flask-based endpoints (deployed on Kaggle Notebooks)
- **Frontend**: React application
- **Backend**: Java Spring Boot API

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [AI Models](#ai-models)
- [Frontend](#frontend)
- [Backend](#backend)
- [Setup & Installation](#setup--installation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This platform enables users to process and enhance audio files using state-of-the-art AI models. The system is designed for scalability, modularity, and ease of integration.

---

## Architecture

- **Frontend**: User interface for uploading audio and viewing results.
- **Backend**: Handles API requests, authentication, and business logic.
- **AI Endpoints**: Expose RVRT and Demucs models via Flask REST APIs.

---

## AI Models

- **RVRT**: Advanced video super resolution model.
- **Demucs**: Audio denoising model.
- **Flask API**: The models is wrapped in a Flask app and deployed on Kaggle Notebooks for scalable inference.

---

## Frontend

- **Framework**: React
- **Features**: Video upload, progress tracking, result visualization.
- **Setup**:
  ```bash
  cd frontend
  npm install
  npm start
  ```

---

## Backend

- **Framework**: Java Spring Boot
- **Features**: RESTful API, user management.
- **Setup**:
  ```bash
  cd backend
  ./mvnw spring-boot:run
  ```

---

## Setup & Installation

1. **Clone the repository**
2. **Start the backend** (see above)
3. **Start the frontend** (see above)
4. **Deploy AI endpoints** on Kaggle Notebooks by runing the notebook in the AI folder and update API URLs accordingly .

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

---

## License

This project is licensed under the MIT License.
