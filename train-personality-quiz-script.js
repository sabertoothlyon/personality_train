function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const personalities = {
    Thomas: {
        name: "Thomas the Tank Engine",
        description: "You believe that simple is better. You see life's lessons in stories and believe in finding the clearest path forward. You're positive and practical, always looking for the most direct way to help others. You value simplicity and straightforward solutions.",
        image: "Thomas"
    },
    Percy: {
        name: "Percy the Small Engine",
        description: "You are young and not all there, but good at heart. You're enthusiastic and well-meaning, though sometimes unsure of yourself. Your inexperience doesn't stop you from trying your very best to help others. While you might make mistakes, your heart is always in the right place.",
        image: "Percy"
    },
    Gordon: {
        name: "Gordon the Big Engine",
        description: "You are strong and important, but you may not always listen to others. You carry yourself with dignity and expect proper recognition. As a natural leader, you believe in maintaining high standards and proper procedures. While you might seem proud, you take your responsibilities very seriously.",
        image: "Gordon"
    },
    Edward: {
        name: "Edward the Blue Engine",
        description: "You are wise and kind. Your advice comes from a place of deep understanding, and you're always ready to help guide others with patient counsel. You offer wisdom gained from experience and support others with kindness.",
        image: "Edward"
    },
    Henry: {
        name: "Henry the Green Engine",
        description: "You are hardworking and strong. You believe in showing up and getting things done without complaint. Your dependability makes you a valued team member. You're hardworking, reliable, and always ready to put in the effort needed.",
        image: "Henry"
    },
    Diesel: {
        name: "Diesel",
        description: "You are tricky and cause trouble. You may be seen as someone who is difficult to deal with and may not be trustworthy. You tend to see problems as opportunities for mischief. Your approach often involves creating difficulty for others and avoiding responsibility. While clever, your actions frequently lead to complications.",
        image: "Diesel"
    }
};

const questions = [
    {
        question: "How do you handle customer inquiries during a busy shift?",
        options: [
            { text: "Ensure the most urgent questions are addressed quickly.", personality: "Gordon" },
            { text: "Stay upbeat and engage customers in a friendly way.", personality: "Percy" },
            { text: "Calmly ensure each customer feels valued and heard.", personality: "Edward" },
            { text: "Provide thorough and accurate responses, even if it takes more time.", personality: "Thomas" },
            { text: "Pretend not to notice and let someone else deal with it.", personality: "Diesel" }
        ]
    },
    // ... (rest of the questions remain the same as in the original HTML)
];

document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions');

    questions.forEach((q, index) => {
        shuffleArray(q.options); // Shuffle the options
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>Question ${index + 1}</h3>
            <p>${q.question}</p>
            <div class="options">
                ${q.options.map(option => `
                    <label>
                        <input type="radio" name="q${index}" value="${option.personality}" required>
                        ${option.text}
                    </label>
                `).join('')}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });

    document.getElementById('quizForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const answers = Array.from(new FormData(this).values());
        const tally = answers.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});

        const result = Object.entries(tally).reduce((a, b) => (b[1] > a[1] ? b : a));
        const personalityType = personalities[result[0]];

        document.getElementById('description').innerHTML = `
            <h3>${personalityType.name}</h3>
            <p>${personalityType.description}</p>
        `;

        document.querySelectorAll('.train-images img').forEach(img => {
            img.classList.remove('active');
        });

        document.getElementById(personalityType.image).classList.add('active');
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
    });
});

// Diesel image click event
document.addEventListener('DOMContentLoaded', () => {
    const dieselImage = document.getElementById('Diesel');
    dieselImage.addEventListener('click', () => {
        alert("You're a Diesel!");
    });
});
