// JavaScript for the AI History Q&A section

document.addEventListener('DOMContentLoaded', () => {
    const questionInput = document.getElementById('history-question');
    const askButton = document.getElementById('ask-history-btn');
    const aiResponseDiv = document.getElementById('ai-response');
    const loadingDiv = document.getElementById('ai-loading');

    // Check if all elements are found
    if (!questionInput || !askButton || !aiResponseDiv || !loadingDiv) {
        console.error('AI History elements not found in the DOM.');
        return;
    }

    // Add event listener to the Ask button
    askButton.addEventListener('click', handleAskQuestion);

    // Optional: Allow pressing Enter key in the input field to ask
    questionInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission if it were in a form
            handleAskQuestion();
        }
    });

    // Function to handle the question asking process
    async function handleAskQuestion() {
        const question = questionInput.value.trim();

        if (!question) {
            alert('Please enter a question.');
            return;
        }

        // Clear previous response and show loading indicator
        aiResponseDiv.innerHTML = '';
        loadingDiv.style.display = 'block';
        askButton.disabled = true; // Disable button while loading

        try {
            // --- Backend Integration ---
            // This is where you would make a request to your backend API endpoint.
            // The backend needs to:
            // 1. Receive the question.
            // 2. Send the question to an AI model (like Gemini, OpenAI, etc.)
            // 3. Get the AI's response about Porsche 911 history.
            // 4. Return the AI's response to the frontend.
            //
            // Replace '/api/ask-porsche-ai' with the actual URL of your backend endpoint.
            const response = await fetch('http://localhost:5000/api/ask-porsche-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Display the AI's response
            if (data.answer) {
                aiResponseDiv.innerHTML = `<p>${data.answer}</p>`;
            } else {
                aiResponseDiv.innerHTML = '<p>Sorry, I could not get an answer.</p>';
            }

        } catch (error) {
            console.error('Error fetching AI response:', error);
            aiResponseDiv.innerHTML = '<p>Error getting response. Please try again later.</p>';
        } finally {
            // Hide loading indicator and re-enable button
            loadingDiv.style.display = 'none';
            askButton.disabled = false;
        }
    }
}); 