// Variable to track the theme state
let currentTheme = 0;

// Helper function to validate if the input is a valid number within a specific range
function isValidNumber(value, min = 0, max = Infinity) {
    return !isNaN(value) && value > min && value < max;
}

function showForm() {
    const method = document.getElementById('method').value;
    document.getElementById('form1').style.display = method == '1' ? 'block' : 'none';
    document.getElementById('form2').style.display = method == '2' ? 'block' : 'none';
    document.getElementById('form3').style.display = method == '3' ? 'block' : 'none';
    document.getElementById('result').innerHTML = '';
}

function calculateArea() {
    const method = document.getElementById('method').value;
    let area = 0;

    if (method == '1') {
        const a = parseFloat(document.getElementById('sideA').value);
        const angle = parseFloat(document.getElementById('angle').value);
        const b = parseFloat(document.getElementById('sideB').value);

        // Validate angle between 0 and 180 degrees
        if (isValidNumber(a) && isValidNumber(b) && isValidNumber(angle, 0, 180)) {
            area = 0.5 * a * b * Math.sin(angle * Math.PI / 180);
        }
    } else if (method == '2') {
        const a = parseFloat(document.getElementById('sideA3').value);
        const b = parseFloat(document.getElementById('sideB3').value);
        const c = parseFloat(document.getElementById('sideC').value);

        if (isValidNumber(a) && isValidNumber(b) && isValidNumber(c)) {
            const s = (a + b + c) / 2;
            area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        }
    } else if (method == '3') {
        const angleA = parseFloat(document.getElementById('angleA2').value);
        const b = parseFloat(document.getElementById('sideB2').value);
        const angleC = parseFloat(document.getElementById('angleC2').value);

        // Validate if the angles are between 0 and 180 and if the sum of angleA and angleC is less than 180
        if (isValidNumber(angleA, 0, 180) && isValidNumber(angleC, 0, 180) && (angleA + angleC) < 180 && isValidNumber(b)) {
            const angleB = 180 - angleA - angleC; // Calculate the third angle

            // Calculate the area using the formula for ASA
            area = 0.5 * Math.pow(b, 2) * (Math.sin(angleA * Math.PI / 180) * Math.sin(angleC * Math.PI / 180)) / Math.sin(angleB * Math.PI / 180);
        }
    }

    if (area > 0) {
        document.getElementById('result').innerHTML = `The area of the triangle is: ${area.toFixed(2)}`;
    } else {
        document.getElementById('result').innerHTML = 'Please provide valid inputs.';
    }
}

function changeTheme() {
    const circleButton = document.getElementById('circleButton');
    const icon = document.getElementById('icon');

    // Toggle movement
    if (currentTheme % 2 === 0) {
        circleButton.classList.add('move-right');
        circleButton.classList.remove('move-left');
    } else {
        circleButton.classList.add('move-left');
        circleButton.classList.remove('move-right');
    }

    // Change theme colors and icon
    if (currentTheme === 0) {
        document.body.style.backgroundColor = '#333'; // Dark theme
        document.querySelector('.container').style.backgroundColor = '#444'; // Dark container
        icon.innerHTML = '&#9790;'; // Moon icon
    } else if (currentTheme === 1) {
        document.body.style.backgroundColor = '#f4f4f9'; // Light theme
        document.querySelector('.container').style.backgroundColor = '#fff'; // Light container
        icon.innerHTML = '&#9728;'; // Sun icon
    } else {
        document.body.style.backgroundColor = '#808080'; // Gray theme
        document.querySelector('.container').style.backgroundColor = '#888'; // Gray container
        icon.innerHTML = '&#9790;'; // Moon icon
    }

    currentTheme++;
    if (currentTheme > 2) {
        currentTheme = 0; // Reset after 3 themes
    }
}

// Initialize the form on page load
showForm();
