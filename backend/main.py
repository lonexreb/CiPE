from flask import Flask, request, jsonify
from flask_mail import Mail, Message
# from db import get_db
import requests
import os
import json
import predictionguard as pg
# import lancedb
from dotenv import load_dotenv
from flask_cors import CORS
from app import create_app

app = create_app()
CORS(app, origins='*')
# print(app.url_map.default_port)

# print(
# "I AM HEREEEEEE"
# )

@app.route('/ask', methods=['POST'])
def ask_gpt():
    # ask LLM a question and parse result
    question = request.json.get('question')
    print(request)

    load_dotenv()
    os.environ["PREDICTIONGUARD_TOKEN"] = "q1VuOjnffJ3NO2oFN8Q9m8vghYc84ld13jaqdF7E"

    messages = [
    {
        "role": "system",
        "content": "You are a helpful assistant. Your model is hosted by Prediction Guard, a leading AI company."
    },
    {
        "role": "user",
        "content": question
    }
    ]
    # print("HELLOOOO")
    result = pg.Chat.create(
    model="Neural-Chat-7B",
    messages=messages
    )

    print(jsonify(result))
    return jsonify(result)
    # print()
    # response = app.response_class(response=json.dumps(completion.choices[0].message.content),status=200, minetype='application/json')
    # return jsonify({"message":completion.choices[0].message.content, 'status':200})

# @app.route('/openai/image', methods=['POST'])
# def generate_image():
#     # Extract data from request body
#     data = request.json
#     description = data.get('description')

#     # Construct the prompt for the image
#     prompt = f"Generate an image for this information about a user: user description: {description}"

#     # Prepare the header and payload for the OpenAI request
#     headers = {
#         'Authorization': f'Bearer {OPENAI_API_KEY}',
#         'Content-Type': 'application/json'
#     }

#     payload = {
#         'model': 'dall-e-3',  # Replace with the actual model name if different
#         'prompt': prompt,
#         'n': 1,  # Number of images to generate
#         'size': '1024x1024'  # Image size
#     }

#     try:
#         # Make a POST request to the OpenAI API
#         response = requests.post('https://api.openai.com/v1/images/generations', json=payload, headers=headers)

#         # If the request was successful
#         if response.status_code == 200:
#             # Assuming the API returns a JSON with the URL(s) of the generated image(s)
#             image_url = response.json()['data'][0]['url']
#             return jsonify({'image_url': image_url})
#         else:
#             # If the request failed, return the error provided by the OpenAI API
#             return jsonify(response.json()), response.status_code

#     except Exception as e:
#         # Return a JSON response with the error
#         return jsonify({'error': str(e)}), 500

# # @app.route('/')
# # def index():
# #     db = get_db()
# #     try:
# #         # Replace 'test_collection' with a collection name that exists in your database
# #         test_collection = db['userplans']
# #         count = test_collection.count_documents({})
# #         return f"Connected to MongoDB. Collection has {count} documents."
# #     except Exception as e:
# #         return f"Failed to connect to MongoDB: {e}"

# # Email configuration
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USERNAME'] = 'cipe.hacklytics@gmail.com'  # Use environment variable
# app.config['MAIL_PASSWORD'] = 'xzwvodfunbdjhuxi'  # Your App Password without spaces
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USE_SSL'] = False

# mail = Mail(app)

# @app.route('/api/llm', methods=['GET', 'POST'])
# def llm_endpoint():
#     if request.method == 'POST':
#         user_data = request.json

#         # Define the URL of the LLM API
#         llm_api_url = "http://example.com/llm-api"

#         # Call the LLM API with the user data
#         llm_response = requests.post(llm_api_url, json=user_data)

#         # Check if the request was successful
#         if llm_response.status_code == 200:
#             # Return the LLM API's response to the frontend
#             return jsonify(llm_response.json()), 200
#         else:
#             # Handle errors (e.g., API not reachable, bad request, etc.)
#             return jsonify({"error": "LLM API request failed"}), llm_response.status_code

#     else:
#         # For GET requests, you can return a simple message or data
#         return jsonify({"message": "Send a POST request with user data"}), 200

# @app.route('/send-email', methods=['POST'])
# def send_email():
#     data = request.json

#     # Extracting information from the request data
#     doctor_name = data.get("doctor_name")
#     patient_name = data.get("patient_name")
#     suggestions = data.get("suggestions")
#     benefits = data.get("benefits")
#     side_effects = data.get("side_effects")
#     doctor_email = data.get("doctor_email")

#     # Construct the email content
#     subject = "Patient Medical Information"
#     body = f"""
# Hello {doctor_name},

# Your patient, {patient_name}, wanted you to look over the following medical information:

# Suggestions:
# {suggestions}

# Benefits:
# {benefits}

# Side Effects:
# {side_effects}

# Thanks,
# CiPE Team
# """

#     msg = Message(subject, sender=app.config['MAIL_USERNAME'], recipients=[doctor_email])
#     msg.body = body

#     # Send the email
#     try:
#         mail.send(msg)
#         return jsonify({"message": "Email sent successfully"}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # app = create_app()
    app.run(debug=True)
    # print(f"Flask application running on port {app.port}")
