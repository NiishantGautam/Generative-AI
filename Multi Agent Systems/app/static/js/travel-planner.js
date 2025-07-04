
document.querySelector("#tripForm").addEventListener("submit", async function(e) {
    e.preventDefault();


    // Show loading spinner and result card
    document.querySelector("#loadingSpinner").style.display = "block";
    document.querySelector("#resultsCard").style.display = "block";

    // Get form data
   const formData = new FormData(this);

   const city = formData.get("city");

   const days = Number.parseInt((formData.get("days")),10);
   
   const attractionsPerDay = Number.parseInt(formData.get("attractions_per_day"),10);

   
   // Simulate API calls with Error Handling and UI Feedback
   try {


    // Simulate a delay of 2 seconds to mimic an API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate API response data
    const data = {
        city: city,
        days: days,
        daily_plans: []
    };
    
    // Create simple daily plans
    for (let i = 1; i <= days; i++) {
       
        // Initialize an empty array to store the attractions for this day
        const attractions = [];
       
        // Generate the specified number of attractions for this day
        for (let j = 1; j <= attractionsPerDay; j++) {
            attractions.push({
                name: `${city} Attraction ${j}`,
                category: "Tourist Spot",
                estimated_duration: "2 hours",
                address: `Some Street`,
                description: `Description for attraction ${j} in ${city}.`
            });
        }
        
        // Create a daily plan object for each day
        data.daily_plans.push({
            day_number: i,
            attractions: attractions,
            meal_suggestions: [
                `Breakfast at ${city} Café`,
                `Lunch at ${city} Bistro`,
                `Dinner at ${city} Restaurant`
            ]
        });

    }
    
    // Add overall travel tips 
    data.overall_tips = `Travel tips for ${city}: Bring comfortable shoes and a map.`;


    // Initialize the HTML string for the itinerary container
    let html = '<div class="itinerary">';

    // Check if daily plans exist and are in an array format
    if (data.daily_plans && Array.isArray(data.daily_plans)) {

        data.daily_plans.forEach((day) => {
            html += `
            <div class="day-plan mb-4" >
                <h6>Day ${day.day_number}</h6>
                <ul class="list-group">
                    ${day.attractions.map(attraction => `
                        <li class="list-group-item">
                            <strong>${attraction.name}</strong><br>

                               // Added text-muted class to de-emphasize secondary information
                            <small class="text-muted">${attraction.category} • ${attraction.estimated_duration}</small><br>
                            ${attraction.address ? `<small class="text-muted">${attraction.address}</small><br>` : ''}
                            ${attraction.description}
                        </li>
                    `).join('')}
                </ul>

                ${day.meal_suggestions ? `
                    <div class="mt-2">
                        // Used text-muted for consistent styling of secondary headers
                        <small class="text-muted">Meal Suggestions:</small>
                        // list-unstyled removes default bullet points for cleaner design
                        <ul class="list-unstyled">
                            ${day.meal_suggestions.map(suggestion => `
                                // Added bullet character manually for more control over spacing
                                <li>• ${suggestion}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
        })

        if (data.overall_tips) {
            html += `
                // Added overall-tips class for potential custom styling and mt-4 for spacing
                <div class="overall-tips mt-4">
                    <h6>Overall Tips</h6>
                    // Used Bootstrap's alert component with info styling
                    <div class="alert alert-info">
                        ${data.overall_tips}
                    </div>
                </div>
            `;
        }
   
    } else {

        // Display a message if no itinerary data is available
        html += '<div class="alert alert-warning">No itinerary data available</div>';
    }
    html += '</div>';
document.getElementById('resultsContent').innerHTML = html;

} catch (error) {

    // Used Bootstrap's alert component with danger styling for errors
    document.getElementById('resultsContent').innerHTML = `
        <div class="alert alert-danger">
            An error occurred while planning your trip. Please try again.
        </div>
    `;


} finally {

    // Hide loading spinner
    document.querySelector("#loadingSpinner").style.display = "none";
    

   
});