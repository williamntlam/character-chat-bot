# Used for .env API key retrieval.
import os
import getpass
import secrets
from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS

# Importing Langchain library for LLM interactions.
from langchain.chat_models import ChatOpenAI

# Used for keeping track of previous messages.
from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema import HumanMessage

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:4200", "http://localhost:4200/character", "http://127.0.0.1:4200"])
app.config["SECRET_KEY"] = secrets.token_hex(16)
socketio = SocketIO(app)
store = {}

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    response.headers['Access-Control-Allow-Credentials'] = 'true'

    return response

class ChatBot:
    """A class representing the chat bot"""

    def __init__(self) -> None:
        self.character_name = ""
        self.character_description = ""
        self.memory = ConversationBufferMemory()  # Handles memory
        self.model = ChatOpenAI(model="gpt-3.5-turbo")
        self.chain = None

    def initialize_bot(self, character_name: str, character_description: str) -> None:
        """Initializes the chat bot."""
        self.character_name = character_name
        self.character_description = character_description

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    f"You are a character named {self.character_name}, described as \
                        {self.character_description}. Always act like this character.",
                ),
                MessagesPlaceholder(variable_name="messages"),
            ]
        )

        # The chain is simply a combination of the prompt and the model, with memory involved
        self.chain = prompt | self.model

    def respond_to_message(self, user_message):
        """Allows the bot to respond to incoming messages."""
        try:
            if user_message.lower() == "exit":
                exit()

            # Add the user's message to memory before generating the response
            self.memory.chat_memory.add_user_message(user_message)

            # Generate the response based on the entire conversation so far
            response = self.model.invoke({
                "messages": self.memory.load_memory_variables({})['history']
            })

            # Add the AI's response to memory
            self.memory.chat_memory.add_ai_message(response.content)
            return response.content

        except Exception as e:
            print(f"Error generating response: {e}")
            return "I'm having trouble understanding. Can you please rephrase that?"

chatbot: ChatBot | None = None


@app.route("/character", methods=['POST'])
def create_character():
    """Initializes Chatbot"""
    data = request.json
    character_name = data.get("character-name")
    character_description = data.get("character-description")

    print("Character created!")

    # Initialize the chatbox here.
    global chatbot
    chatbot = ChatBot()
    chatbot.initialize_bot(character_name, character_description)

    return jsonify({"message": "Character created successfully"}), 200


@socketio.on("message")
def handle_message(data):
    """Handle messages chatbot to user."""
    global chatbot
    user_message = data["message"]
    print("Received Message: " + user_message)

    response: str = chatbot.respond_to_message(user_message)
    emit("response", {"message": response})

if __name__ == '__main__':
    os.environ["OPENAI_API_KEY"] = getpass.getpass()
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
