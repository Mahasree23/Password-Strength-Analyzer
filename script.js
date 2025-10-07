document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    const weakMessage = document.getElementById('weakMessage');
    const suggestionsList = document.getElementById('suggestionsList');
    const suggestionButton = document.getElementById('suggestionButton');

    // Function to determine password strength
    function checkPasswordStrength(password) {
        if (!password) return 'none'; // Handle empty input

        // Strong criteria: >=10 chars AND all four character types
        const isStrong = password.length >= 10 && 
                         /[a-z]/.test(password) && 
                         /[A-Z]/.test(password) && 
                         /[0-9]/.test(password) && 
                         /[^a-zA-Z0-9]/.test(password);

        if (password.length < 6) {
            return 'weak';
        } else if (isStrong) {
            return 'strong';
        } else {
            return 'medium';
        }
    }

    // Updates the visual strength bar and label
    function updateStrengthUI(strength) {
        strengthBar.className = 'strength-bar';
        if (strength !== 'none') {
            strengthBar.classList.add(strength);
            strengthLabel.textContent = `Strength: ${strength.toUpperCase()}`;
        } else {
            strengthLabel.textContent = 'Strength: ';
        }
    }

    // Displays simple suggestions based on current strength
    function displayBasicSuggestions(strength) {
        suggestionsList.innerHTML = '';
        if (strength === 'weak') {
            suggestionsList.innerHTML += '<li><strong>Suggestion:</strong> Try making it longer (at least 6 characters).</li>';
            suggestionsList.innerHTML += '<li><strong>Suggestion:</strong> Include a mix of uppercase and lowercase letters.</li>';
        } else if (strength === 'medium') {
            suggestionsList.innerHTML += '<li><strong>Suggestion:</strong> Add numbers to your password.</li>';
            suggestionsList.innerHTML += '<li><strong>Suggestion:</strong> Include special symbols (e.g., !, @, #, $).</li>';
            suggestionsList.innerHTML += '<li><strong>Suggestion:</strong> Consider making it longer (at least 10 characters).</li>';
        }
    }

    // Main input handler
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);
        updateStrengthUI(strength);
        displayBasicSuggestions(strength);

        // Manage visibility of the message and suggestion button
        if (strength === 'weak' || strength === 'medium') {
            weakMessage.textContent = `This password is ${strength}. Consider the suggestions below or click the button for more personalized options.`;
            weakMessage.style.display = 'block';
            suggestionButton.style.display = 'block';
        } else {
            weakMessage.style.display = 'none';
            suggestionButton.style.display = 'none';
        }
    });

    // Button to navigate to the suggestion page
    suggestionButton.addEventListener('click', function() {
        const currentPassword = passwordInput.value;
        window.location.href = `suggestion.html?weakPassword=${encodeURIComponent(currentPassword)}`;
    });
});
