from flask import Flask, request, jsonify
from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from flask_cors import CORS  # Importing CORS

app = Flask(__name__)

# Enable CORS for the frontend origin (allowing requests from http://localhost:5173)
CORS(app, origins="http://localhost:5173")  # Allow requests from React frontend

# MongoDB URI for connection
MONGO_URI = "mongodb+srv://antaraarifa:A95mPTOnq0jX8p6C@cluster0.huusk.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client['job_db']
job_collection = db['jobs']

# Load pre-trained model and tokenizer from Hugging Face
model_name = 'sentence-transformers/all-MiniLM-L6-v2'
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertModel.from_pretrained(model_name)

# Function to generate sentence embeddings
def get_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1)  
    return embeddings.numpy().tolist()

# Function to perform semantic search by comparing embeddings
def semantic_search(query_embedding):
    # Fetch all jobs with their embeddings from the database
    jobs = list(job_collection.find({}, {"title": 1, "embedding": 1}))  # Fetching only title and embedding fields

    similarities = []
    for job in jobs:
        job_embedding = job['embedding']
        # Debugging: Print the query embedding and job embedding
        print(f"Query Embedding: {query_embedding}")
        print(f"Job Embedding: {job_embedding}")
        
        # Compute cosine similarity between query embedding and job embedding
        similarity = cosine_similarity([query_embedding], [job_embedding])[0][0]
        print(f"Similarity with job '{job['title']}': {similarity}")
        similarities.append({"job": job, "similarity": similarity})

    # Sort jobs by similarity (descending) and return top matches
    sorted_jobs = sorted(similarities, key=lambda x: x['similarity'], reverse=True)
    return sorted_jobs[:5]  # Top 5 matches

# API route to handle semantic search
@app.route('/api/v1/semantic-search', methods=['POST'])
def search_jobs():
    data = request.get_json()
    query = data['query']
    
    # Generate embedding for the query
    query_embedding = get_embedding(query)
    print("Query received:", query)
    print("Query embedding:", query_embedding)  # Log the query and its embedding

    # Perform semantic search to find best matching jobs
    results = semantic_search(query_embedding)

    if not results:
        return jsonify({'message': 'No matching jobs found.'})  # Return a message if no results are found

    # Return the top matching jobs, including their titles and similarity scores
    return jsonify({'results': [{"title": result['job']['title'], "similarity": result['similarity']} for result in results]})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Flask server will run on port 5001
