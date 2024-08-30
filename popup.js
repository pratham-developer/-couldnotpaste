document.addEventListener('DOMContentLoaded', function() {
    const questionNumberInput = document.getElementById('questionNumber');
    const codeInput = document.getElementById('codeInput');
    const copyButton = document.getElementById('copyButton');
    const message = document.getElementById('message');
    message.textContent='Click here 👆';

    function formatQuestionNumber(num) {
        // Subtract 1 from the input and ensure it's not negative
        let formattedNum = Math.max(0, parseInt(num) - 1);
        // Pad with leading zero if it's a single digit
        return formattedNum.toString().padStart(2, '0');
    }

    copyButton.addEventListener('click', function() {
        const questionNumber = questionNumberInput.value;
        const code = codeInput.value;

        if (!questionNumber || !code) {
            message.textContent = 'Please fill in both fields ❌';
            message.style.color = '#ff0000';
            return;
        }

        const formattedQuestionNumber = formatQuestionNumber(questionNumber);
        const generatedCode = `var editor = ace.edit("tt-answer-${formattedQuestionNumber}-ttAnswerEditor1"); \neditor.setValue(\`${code.replace(/`/g, '\\`')}\`);`;

        navigator.clipboard.writeText(generatedCode).then(function() {
            message.textContent = 'Code copied to clipboard ✅';
            message.style.color = '#40ff00';
        }, function(err) {
            message.textContent = 'Failed to copy code. Please try again.';
            message.style.color = '#ff0000';
            console.error('Could not copy text ❌', err);
        });
    });
});