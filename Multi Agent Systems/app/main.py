from flask import Flask, request, jsonify, render_template
import os
from dotenv import load_dotenv
from travel_planner.travel_planner_crew import TravelPlannerCrew

# Load environment variables from .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)

def validate_openai_key():
    """Check if OpenAI API key is available"""
    openai_key = os.getenv('OPENAI_API_KEY')
    if not openai_key:
        return False, "OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable."
    if openai_key.strip() == "":
        return False, "OpenAI API key is empty. Please provide a valid API key."
    return True, "API key is valid"



def validate_serper_key():
    serper_key = os.getenv('SERPER_API_KEY')
    if not serper_key:
        return False, "Serper API key is not set. Please set the SERPER_API_KEY environment variable."
    if serper_key.strip() == "":
        return False, "Serper API key is empty. Please provide a valid API key."
    return True, "API key is valid"


# Define the route for the home page
@app.route('/')
def index():
    return render_template("index.html")

# API endpoint to check API key status
@app.route('/api-status', methods=['GET'])
def api_status():
    openai_valid, openai_msg = validate_openai_key()
    serper_valid, serper_msg = validate_serper_key()
    return jsonify({
        "openai_api_key_valid": openai_valid,
        "openai_message": openai_msg,
        "serper_api_key_valid": serper_valid,
        "serper_message": serper_msg
    })

# API endpoint for travel planning
@app.route('/plan', methods=['POST'])
def plan_trip():
    try:
        # First, validate the OpenAI API key
        is_valid, error_message = validate_openai_key()
        if not is_valid:
            return jsonify({
                "error": error_message,
                "solution": " - Create .env file (Recommended):\n" +
                           "Create a .env file in the same directory as main.py and add:\n" +
                           "OPENAI_API_KEY=your-api-key-here\n" +
                           "SERPER_API_KEY=your-api-key-here\n"
            }), 400

        # Get form data
        city = request.form.get('city')
        days = int(request.form.get('days'))
        attractions_per_day = int(request.form.get('attractions_per_day'))

        # Calculate total attractions needed
        total_attractions = days * attractions_per_day

        try:
            travel_planner = TravelPlannerCrew()
            
            # Run the crew with the proper inputs (city, days, attractions_per_day, total_attractions)
            result = travel_planner.travel_crew().kickoff(inputs = {
                "city": city,
                "days": days,
                "attractions_per_day": attractions_per_day,
                "total_attractions": total_attractions
            } )
            
            # Return the pydantic output in JSON format
            if result.pydantic:
                return jsonify(result.pydantic.model_dump())
                
            return jsonify({"error": "No travel itinerary generated"}), 400
            
        except Exception as e:
            return jsonify({"error": f"Error generating Travel plan: {str(e)} "}), 500
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Run the Flask application
if __name__ == '__main__':
    # Check API key on startup
    is_valid, message = validate_openai_key()
    if not is_valid:
        print("⚠️  WARNING: " + message)
        print("📋 Please set your OpenAI API key using one of these methods:")
        print("   Then restart the application.")
    else:
        print("✅ OpenAI API key is configured correctly!")
    
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True
    )