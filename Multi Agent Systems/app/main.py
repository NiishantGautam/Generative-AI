from flask import Flask, request, jsonify, render_template
from travel_planner.travel_planner_crew import TravelPlannerCrew


# Initialize the Flask app
app = Flask(__name__)

# Define the route for the home page
@app.route('/')
def index():
    return render_template("index.html")


# API endpoint for travel planning
@app.route('/api/plan', methods=['POST'])
def plan_trip():
    try:
        # Get form data
        city = request.form.get('city')
        days = int(request.form.get('days'))
        attractions_per_day = int(request.form.get('attractions_per_day'))

        # Calculate total attractions needed
        total_attractions = days * attractions_per_day

        # TODO: Add a try-except block to handle errors during crew execution
        try:
            
            # TODO: Initialize the TravelPlannerCrew instance
            travel_planner = TravelPlannerCrew()
            
            # TODO: Run the crew with the proper inputs (city, days, attractions_per_day, total_attractions)
            result = travel_planner.travel_crew().kickoff(inputs = {
                "city": city,
                "days": days,
                "attractions_per_day": attractions_per_day,
                "total_attractions": total_attractions
            } )
            
            # TODO: Check if the result has a pydantic model and return it as JSON
            if result.pydantic:
                return jsonify(result.pydantic.model_dump())
                
            # TODO: Return an error message with 404 status if no valid itinerary is generated (not pydantic)
            return jsonify({"error": "No travel itinerary generated"}), 400
            
            
        except Exception as e:
            return jsonify({"error": f"Error generating Travel plan: {str(e)} "}), 500
        
    except Exception as e:
        # Return an error message if there is an exception in the request processing
        return jsonify({"error": str(e)}), 400


# Run the Flask application
if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True
    )