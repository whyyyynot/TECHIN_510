from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

# WARNING: Hardcoding API keys directly in code is a security risk.
# This is done against recommendation for demonstration purposes.
# It is strongly advised to use environment variables in production.
API_KEY = 'AIzaSyBer-iH3PlMbKCaovR16VATiHNQwp0qqIE' # <-- Your API Key here

app = Flask(__name__)
# Allow requests from your frontend origin (e.g., http://127.0.0.1:5500 or your deployed site)
# In production, restrict this to your actual frontend URL
CORS(app) # This allows your frontend (running on a different port or domain) to talk to your backend

# Configure Gemini API
# Check if the hardcoded API_KEY is present
if not API_KEY:
    print("Error: API_KEY is not set in the script.")
    # In a production app, you might exit or raise a more severe error
    # For development, we'll allow the app to run but API calls will fail

try:
    # Use the hardcoded API_KEY directly for configuration
    genai.configure(api_key=API_KEY)
    # Choose the model you want to use. Change 'gemini-pro' to a currently supported model.
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
except Exception as e:
    print(f"Error configuring Gemini API: {e}")
    # Handle cases where API configuration fails (e.g., invalid key)
    # You might want to set 'model = None' here to prevent later errors
    model = None


@app.route('/api/ask-porsche-ai', methods=['POST'])
def ask_porsche_ai():
    # Check if the API key was successfully configured and model is available
    if not API_KEY or not model:
        return jsonify({"error": "Backend is not configured with a valid API key."}), 500

    try:
        # Get the JSON data from the frontend request
        data = request.get_json();
        question = data.get('question');

        # Validate input
        if not question:
            return jsonify({"error": "No question provided in the request body."}), 400

        # --- Interact with the AI Model ---
        prompt = f"""You are an AI assistant specializing in the history of the Porsche 911.\nPlease answer the following question based on your knowledge:\n\n{question}\n\nProvide a concise and informative answer focusing only on Porsche 911 history. If the question is not about Porsche 911 history, politely state that you can only answer questions about Porsche 911 history."""

        # Generate content using the AI model
        # Add a safety mechanism in case the model object wasn't created due to config errors
        if model:
             response = model.generate_content(prompt)
             ai_answer = response.text # Extract the text from the AI's response
        else:
             ai_answer = "Could not connect to the AI model."

        # Return the AI's answer to the frontend
        return jsonify({"answer": ai_answer}), 200

    except Exception as e:
        # Catch any errors during processing or AI interaction
        print(f"Error processing request: {e}")
        return jsonify({"error": "An error occurred while processing your request. Please try again later."}), 500

# Entry point to run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000)