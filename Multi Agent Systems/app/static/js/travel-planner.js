// Check API key status on page load
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api-status');
        const data = await response.json();
        
        if (!data.api_key_valid) {
            // Show API key warning
            const warningDiv = document.createElement('div');
            warningDiv.className = 'alert alert-warning alert-dismissible fade show';
            warningDiv.innerHTML = `
                <strong>⚠️ OpenAI API Key Required</strong>
                <p class="mb-2">${data.message}</p>
                <details>
                    <summary>Setup Instructions</summary>
                    <div class="mt-2">
                        <p><strong>🎯 OPTION 1 - Create .env file (Recommended):</strong></p>
                        <p>Create a <code>.env</code> file in the same directory as main.py and add:</p>
                        <code>OPENAI_API_KEY=your-api-key-here</code>
                        <hr class="my-2">
                        <p><strong>🎯 OPTION 2 - Export environment variable:</strong></p>
                        <p><strong>For macOS/Linux:</strong></p>
                        <code>export OPENAI_API_KEY='your-api-key-here'</code>
                        <p class="mt-2"><strong>For Windows CMD:</strong></p>
                        <code>set OPENAI_API_KEY=your-api-key-here</code>
                        <p class="mt-2"><strong>For Windows PowerShell:</strong></p>
                        <code>$env:OPENAI_API_KEY='your-api-key-here'</code>
                        <p class="mt-2 mb-0"><small>Then restart the application.</small></p>
                    </div>
                </details>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            // Insert warning at the top of the container
            const container = document.querySelector('.container');
            container.insertBefore(warningDiv, container.firstChild);
        }
    } catch (error) {
        console.error('Error checking API status:', error);
    }
});

document.querySelector("#tripForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Show loading spinner and result card
    document.querySelector("#loadingSpinner").style.display = "block";
    document.querySelector("#resultsCard").style.display = "block";

    // Get form data
   const formData = new FormData(this);

   // API call to the backend
   try {
    const response = await fetch("/plan", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    // Check if the response is valid
    if(response.ok && data) {
        
        // Display the itinerary
       
        let html = '<div class="itinerary">';

         // Check if daily plans exist and are in an array format

         if (data.daily_plans && Array.isArray(data.daily_plans)) {
            data.daily_plans.forEach((day) => {
                html += `
                    <div class="day-plan mb-4">
                        <h6>Day ${day.day_number}</h6>
                        <ul class="list-group">
                            ${day.attractions.map(attraction => `
                                <li class="list-group-item">
                                    <strong>${attraction.name}</strong><br>
                                    <small class="text-muted">${attraction.category} • ${attraction.estimated_duration}</small><br>
                                    ${attraction.address ? `<small class="text-muted">${attraction.address}</small><br>` : ''}
                                    ${attraction.description}
                                </li>
                            `).join('')}
                        </ul>
                        ${day.meal_suggestions ? `
                            <div class="mt-2">
                                <small class="text-muted">Meal Suggestions:</small>
                                <ul class="list-unstyled">
                                    ${day.meal_suggestions.map(suggestion => `
                                        <li>• ${suggestion}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                `;
            });

            // Add overall travel tips if available

            if (data.overall_tips) {
                html += `
                    <div class="overall-tips mt-4">
                        <h6>Overall Tips</h6>
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
        
    } else {
        // Handle API key and other errors
        let errorHtml = `<div class="alert alert-danger">`;
        
        if (data.error && data.solution) {
            // This is an API key error with setup instructions
            errorHtml += `
                <strong>🔑 ${data.error}</strong>
                <details class="mt-2">
                    <summary>Setup Instructions</summary>
                    <div class="mt-2">
                        <pre style="background-color: #f8f9fa; padding: 10px; border-radius: 5px;">${data.solution}</pre>
                        <small class="text-muted">After setting the API key, restart the application.</small>
                    </div>
                </details>
            `;
        } else {
            // Generic error
            errorHtml += `${data.error || 'An error occurred while planning your trip.'}`;
        }
        
        errorHtml += `</div>`;
        document.getElementById('resultsContent').innerHTML = errorHtml;
    }
   

} catch (error) {
    console.error('Error:', error);
    document.getElementById('resultsContent').innerHTML = `
        <div class="alert alert-danger">
            <strong>Network Error</strong><br>
            Unable to connect to the server. Please check your connection and try again.
        </div>
    `;
} finally {
    // Hide loading spinner
    document.getElementById('loadingSpinner').style.display = 'none';
}
}); 