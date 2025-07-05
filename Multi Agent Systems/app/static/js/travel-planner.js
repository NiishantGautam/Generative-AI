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
            const container = document.querySelector('.main-container');
            container.insertBefore(warningDiv, container.firstChild);
        }
    } catch (error) {
        console.error('Error checking API status:', error);
    }
});

document.querySelector("#tripForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Show loading spinner and result card
    document.querySelector("#loadingSpinner").style.display = "flex";
    document.querySelector("#resultsCard").style.display = "block";
    document.querySelector("#resultsContent").innerHTML = "";

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
                    <div class="day-plan">
                        <div class="day-number">
                            <i class="fas fa-calendar-day"></i>
                            Day ${day.day_number}
                        </div>
                        <div class="attractions-container">
                            ${day.attractions.map(attraction => `
                                <div class="attraction-card">
                                    <div class="attraction-name">
                                        <i class="fas fa-map-marker-alt" style="color: #667eea;"></i>
                                        ${attraction.name}
                                    </div>
                                    <div class="attraction-meta">
                                        <i class="fas fa-tag icon"></i>
                                        ${attraction.category}
                                        <span class="ms-3">
                                            <i class="fas fa-clock icon"></i>
                                            ${attraction.estimated_duration}
                                        </span>
                                    </div>
                                    ${attraction.address ? `
                                        <div class="attraction-address">
                                            <i class="fas fa-map-marker-alt icon"></i>
                                            ${attraction.address}
                                        </div>
                                    ` : ''}
                                    <div class="attraction-description">
                                        ${attraction.description}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        ${day.meal_suggestions ? `
                            <div class="meal-suggestions">
                                <h6>
                                    <i class="fas fa-utensils icon"></i>
                                    Meal Suggestions
                                </h6>
                                <div class="meal-items">
                                    ${day.meal_suggestions.map(suggestion => `
                                        <div class="meal-item"> ${suggestion}</div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `;
            });

            // Add overall travel tips if available
            if (data.overall_tips) {
                html += `
                    <div class="overall-tips">
                        <h6>
                            <i class="fas fa-lightbulb icon"></i>
                            Overall Travel Tips
                        </h6>
                        <div class="overall-tips-content">
                            ${data.overall_tips}
                        </div>
                    </div>
                `;
            }

         } else {
          // Display a message if no itinerary data is available
            html += `
                <div class="alert alert-warning" style="border-radius: 15px;">
                    <i class="fas fa-exclamation-triangle icon"></i>
                    <strong>No itinerary data available</strong>
                    <p class="mb-0 mt-2">Please try again with different search parameters.</p>
                </div>
            `;
         }

         html += '</div>';
         document.getElementById('resultsContent').innerHTML = html;
        
    } else {
        // Handle API key and other errors
        let errorHtml = `<div class="alert alert-danger" style="border-radius: 15px;">`;
        
        if (data.error && data.solution) {
            // This is an API key error with setup instructions
            errorHtml += `
                <strong>
                    <i class="fas fa-key icon"></i>
                    ${data.error}
                </strong>
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
            errorHtml += `
                <i class="fas fa-exclamation-circle icon"></i>
                <strong>Error</strong><br>
                ${data.error || 'An error occurred while planning your trip. Please try again.'}
            `;
        }
        
        errorHtml += `</div>`;
        document.getElementById('resultsContent').innerHTML = errorHtml;
    }
   

} catch (error) {
    console.error('Error:', error);
    document.getElementById('resultsContent').innerHTML = `
        <div class="alert alert-danger" style="border-radius: 15px;">
            <i class="fas fa-wifi icon"></i>
            <strong>Network Error</strong><br>
            Unable to connect to the server. Please check your connection and try again.
        </div>
    `;
} finally {
    // Hide loading spinner
    document.getElementById('loadingSpinner').style.display = 'none';
}
}); 