# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a full-stack Portuguese political campaign website for "Campanha De Corpo e Alma" with both frontend and backend components:

### Frontend
- **Framework**: React 18 with TypeScript and Vite
- **Styling**: Tailwind CSS with custom colors (`primary-orange`, `dark-blue`, `light-blue`) and `galano-alt` font family
- **Components**: Single-page application with modular React components for different campaign sections
- **Key Features**: PDF viewer, chatbot integration, candidate profiles, program sections
- **Build Tool**: Vite with optimized production builds and manual chunks for vendor libraries
- **Path Aliases**: `@` resolves to `src/` directory

### Backend
- **Framework**: FastAPI with Python
- **AI/ML**: Uses transformers, torch, and langchain for chatbot functionality
- **Database**: ChromaDB for vector storage and embeddings
- **Deployment**: Configured for both local development and cloud deployment (Render/Netlify)
- **Key Files**: 
  - `campaign_chatbot.py` - Main FastAPI application
  - `chatbot.py` - Core chatbot logic
  - `ingest.py` - Document processing and ingestion
  - `run.py` - Server entry point

## Development Commands

### Frontend Development
```bash
# Development server (runs on port 5173)
npm run dev

# Production build
npm run build

# Code linting
npm run lint

# Preview production build
npm run preview
```

### Backend Development
```bash
# Quick start (from backend directory)
./start.sh  # Creates venv, installs deps, starts server

# Manual setup
cd backend
python -m venv venv
source venv/bin/activate  # or venv/Scripts/activate on Windows
pip install -r requirements.txt
python run.py  # Starts FastAPI server on port 8000
```

## Project Structure

### Frontend (`src/`)
- `App.tsx` - Main application component with page layout
- `components/` - All React components (Header, Hero, Chatbot, Program, etc.)
- `data/` - Static data files
- `hooks/` - Custom React hooks
- `styles/` - Additional styling files

### Backend (`backend/`)
- `campaign_chatbot.py` - Main FastAPI app with chatbot endpoints
- `chatbot.py` - Core chatbot functionality using AI models
- `ingest.py` - Document processing pipeline
- `requirements.txt` - Python dependencies
- `venv/` - Virtual environment (local development)

### Configuration Files
- `vite.config.ts` - Vite configuration with React plugin and build optimization
- `eslint.config.js` - ESLint with TypeScript and React rules
- `tailwind.config.js` - Tailwind configuration with custom theme
- `netlify.toml` - Netlify deployment configuration
- `tsconfig.json` - TypeScript configuration

## Key Dependencies

### Frontend
- React 18 with TypeScript
- Lucide React & React Icons for icons
- React PDF for document viewing
- Embla Carousel for image carousels
- React Markdown for content rendering

### Backend
- FastAPI for API framework
- Transformers & PyTorch for AI models
- LangChain for document processing
- ChromaDB for vector storage
- BeautifulSoup4 & PyPDF for document parsing

## Development Notes

- The application uses Portuguese language throughout
- Custom Tailwind theme with campaign-specific colors
- Chatbot integrates with the main site via dedicated components
- PDF documents are stored in `public/` and served statically
- Development server has CORS enabled for local development
- ESLint configured for React hooks and TypeScript best practices