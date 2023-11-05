let level = 1;
let score = 0;
let timer;
let timeLeft = 30;

function generateProblem() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * level * 10);
    let num2 = Math.floor(Math.random() * level * 10);
    let answer;

    switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            num1 = Math.floor(Math.random() * 10); // Keep multiplication simpler
            num2 = Math.floor(Math.random() * level * 5);
            answer = num1 * num2;
            break;
        case '/':
            num1 = Math.floor(Math.random() * level * 5);
            num2 = Math.floor(Math.random() * level * 5) + 1; // Ensure non-zero divisor
            answer = num1 / num2;
            break;
    }

    document.getElementById('problem').textContent = `${num1} ${operator} ${num2} = ?`;
    return answer;
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('userAnswer').value);
    const correctAnswer = generateProblem();

    if (userAnswer === correctAnswer) {
        score += level;
        document.getElementById('feedback').textContent = `Correct! Score: ${score}`;
    } else {
        document.getElementById('feedback').textContent = 'Incorrect. Try again!';
    }

    // Clear the input field
    document.getElementById('userAnswer').value = '';

    // Reset the timer and update the score
    clearInterval(timer);
    document.getElementById('timer').textContent = 'Time Left: 30';
    timeLeft = 30;

    // Next problem
    generateProblem();

    // Start the timer for the next problem
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(timer);
            document.getElementById('feedback').textContent = 'Time\'s up! Try the next one.';
            generateProblem();
            timer = setInterval(() => {
                timeLeft--;
                document.getElementById('timer').textContent = `Time Left: ${timeLeft}`;
                if (timeLeft === 0) {
                    clearInterval(timer);
                    document.getElementById('feedback').textContent = 'Time\'s up! Try the next one.';
                    generateProblem();
                }
            }, 1000);
        }
    }, 1000);
}

// Initial problem generation
generateProblem();
