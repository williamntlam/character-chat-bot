# Character Chat Bot

Welcome to the Character Chat Bot project! This application enables users to interact with fictional characters through a chat interface, powered by AI technologies. The project leverages Angular for the frontend and Nest.js for the backend, with LangChain and OpenAI providing advanced conversational AI capabilities.

---

## Features

- **Dynamic Conversations**: Interact with AI-powered fictional characters.
- **Real-time Communication**: Enjoy a responsive chat experience.
- **Secure Backend**: Powered by Nest.js for robust server-side functionality.
- **Scalable Architecture**: Modular and easy to extend.

---

## Tech Stack

### Frontend:
- **Framework**: Angular
- **Styling**: Tailwind CSS
- **State Management**: NgRx (if applicable)

### Backend:
- **Framework**: Nest.js
- **AI Integration**: LangChain and OpenAI
- **Database**: PostgreSQL (or any database of your choice)
- **Authentication**: Auth0

---

### Prerequisites
- Node.js (version 18 or later)
- Angular CLI
- Nest.js CLI
- OpenAI API key

---

## Directory Structure

### Frontend:
```
frontend/
|-- src/
    |-- app/
    |   |-- components/
    |   |-- services/
    |-- assets/
    |-- environments/
```

### Backend:
```
backend/
|-- src/
    |-- modules/
    |-- controllers/
    |-- services/
|-- config/
```

---

## API Endpoints

### Example Endpoints
- `POST /chat` - Send a message to the character and receive a response.
- `GET /character/:id` - Fetch character details.
- `POST /character` - Create or update a character.

---

## Development Workflow

1. **Frontend Development**:
   - Use Angular CLI for generating components and services.
   - Style components with Tailwind CSS (if applicable).

2. **Backend Development**:
   - Use Nest.js CLI for generating modules, controllers, and services.
   - Integrate LangChain with the OpenAI API to power the chat logic.

---

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- **OpenAI** for their amazing GPT models.
- **LangChain** for providing tools to build advanced conversational AI.
- The open-source community for inspiration and support.

---

## Contact

For any questions or feedback, please contact `williamntlam@gmail.com`.
