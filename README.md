# Password Manager 🔐

A full-stack password manager application built with React (Vite) on the frontend and Node.js/Express on the backend.

## 🚀 Features
- Secure password storage with encrypted backend handling
- Password encryption and hashing for data protection
- Random strong password generator
- User authentication and profile management
- Interactive dashboard with password vault overview
- Settings panel with theme (light/dark) support
- RESTful API built with Node.js and Express
- Cloud database integration using MongoDB Atlas
- Full containerized architecture using Docker Compose
- Reverse proxy setup using Nginx
- Caching layer implemented with Redis for performance optimization
- Integrated WordPress CMS (containerized service for demonstration/management)
- phpMyAdmin for database administration and monitoring

## 🧱 Tech Stack
- React (Frontend)
- Node.js + Express (Backend)
- MySQL (Database)
- Redis (Caching)
- WordPress (CMS demo)
- phpMyAdmin (DB management)
- Nginx (Reverse proxy)
- Docker Compose (Container orchestration)

## 📁 Project Structure
- `/src` - Frontend React application (UI layer)
- `/server` - Backend REST API (Node.js + Express)
- `/src/docker` - Docker Compose setup for full infrastructure
  - MySQL database service
  - WordPress CMS (containerized)
  - phpMyAdmin (database GUI)
  - Redis (caching layer)
  - Nginx (reverse proxy / load balancer)

- MongoDB Atlas (Cloud Database)
  - Used for secure password storage and backend data persistence
  - Replaces local MongoDB container

- `/wordpress-docker-lab` - Experimental Docker setup (optional/testing only)

## System Architecture

The system is fully containerized using Docker Compose and follows a microservices-style architecture:

- Frontend communicates with backend via REST API
- Backend connects to MongoDB Atlas (cloud database)
- WordPress runs in a separate container for CMS/dashboard features
- Nginx acts as reverse proxy for routing traffic
- phpMyAdmin provides database management interface
- Redis is used for caching and performance optimization

## ⚙️ Installation

### 1. Clone repo
```bash
git clone https://github.com/Holumaintain/Password-Manager.git
