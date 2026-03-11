document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');

    feedbackForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const payload = {
            name: document.getElementById('name').value.trim(),
            rating: parseInt(document.getElementById('rating').value, 10),
            category: document.getElementById('category').value,
            message: document.getElementById('message').value.trim()
        };

        setLoadingState(true);

        try {
            const API_URL = 'https://2g12y1bgwl.execute-api.ap-south-1.amazonaws.com/feedback';
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            showStatus('Feedback submitted successfully!', 'success');
            feedbackForm.reset();

        } catch (error) {
            console.error('Submission Error:', error);
            showStatus('Error submitting feedback. Please try again.', 'error');
        } finally {
            setLoadingState(false);
        }
    });
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            statusMessage.textContent = '';
            statusMessage.className = 'status';
        } else {
            submitBtn.textContent = 'Submit Feedback';
            submitBtn.disabled = false;
        }
    }

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status ${type}`;
    }
});