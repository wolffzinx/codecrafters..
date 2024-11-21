document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Qual é a declaração correta de uma variável inteira em Java?",
            options: [
                "numero = 10;",
                "int numero = 10;",
                "Integer numero = 10",
                "var numero = 10;"
            ],
            correct: 1,
            explanation: "Em Java, precisamos declarar o tipo da variável explicitamente. Para números inteiros, usamos 'int'."
        },
        {
            question: "Como declarar corretamente uma String em Java?",
            options: [
                "String nome = João;",
                "String nome = 'João';",
                'String nome = "João";',
                "nome = 'João';"
            ],
            correct: 2,
            explanation: "Strings em Java devem ser declaradas com aspas duplas."
        },
        {
            question: "Qual tipo de variável é usado para armazenar números decimais em Java?",
            options: [
                "int",
                "decimal",
                "float",
                "double"
            ],
            correct: 3,
            explanation: "double é o tipo mais comum para números decimais em Java."
        },
        {
            question: "Qual é o valor padrão de uma variável boolean em Java?",
            options: [
                "true",
                "false",
                "null",
                "0"
            ],
            correct: 1,
            explanation: "O valor padrão de uma variável boolean é false."
        },
        {
            question: "Como declarar uma constante em Java?",
            options: [
                "const int VALOR = 10;",
                "constant int VALOR = 10;",
                "final int VALOR = 10;",
                "static int VALOR = 10;"
            ],
            correct: 2,
            explanation: "Em Java, usamos a palavra-chave 'final' para declarar constantes."
        },
        {
            question: "Qual é o tipo correto para armazenar um único caractere em Java?",
            options: [
                "String",
                "char",
                "Character",
                "letra"
            ],
            correct: 1,
            explanation: "char é usado para armazenar um único caractere em Java."
        },
        {
            question: "Qual declaração está correta para uma variável que pode armazenar números inteiros ou null?",
            options: [
                "int numero = null;",
                "Integer numero = null;",
                "nullable int numero;",
                "Null<Integer> numero;"
            ],
            correct: 1,
            explanation: "Integer é a classe wrapper que permite que um número inteiro seja null."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answeredQuestions = new Set();

    const introSection = document.querySelector('.intro-section');
    const quizSection = document.querySelector('.quiz-section');
    const questionContainer = document.querySelector('.question-container');
    const resultContainer = document.querySelector('.result-container');
    const startQuizButton = document.querySelector('.start-quiz');

    // Iniciar Quiz
    startQuizButton.addEventListener('click', () => {
        introSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        showQuestion();
    });

    function showQuestion() {
        if (currentQuestion >= questions.length) {
            showResults();
            return;
        }

        const question = questions[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <h3>Questão ${currentQuestion + 1} de ${questions.length}</h3>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button class="option" data-index="${index}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Adicionar event listeners para as opções
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => checkAnswer(option));
        });
    }

    function checkAnswer(selectedOption) {
        if (answeredQuestions.has(currentQuestion)) return;

        const question = questions[currentQuestion];
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const options = document.querySelectorAll('.option');

        answeredQuestions.add(currentQuestion);

        // Mostrar resposta correta e incorreta
        options[question.correct].classList.add('correct');
        if (selectedIndex !== question.correct) {
            selectedOption.classList.add('wrong');
        } else {
            score++;
        }

        // Mostrar explicação
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 1500);
    }

    function showResults() {
        const percentage = (score / questions.length) * 100;
        const message = percentage >= 50 
            ? "Parabéns! Você está pronto para avançar para a próxima fase!"
            : "Que tal revisar o conteúdo e tentar novamente?";

        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        resultContainer.innerHTML = `
            <h3>Resultado Final</h3>
            <p>Você acertou ${score} de ${questions.length} questões (${percentage.toFixed(1)}%)</p>
            <p>${message}</p>
            <div class="result-actions">
                ${percentage >= 50 
                    ? '<button onclick="window.location.href=\'../index.html\'">Voltar ao Menu</button>'
                    : '<button onclick="window.location.reload()">Tentar Novamente</button>'}
            </div>
        `;
    }

    // Tema
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', toggleTheme);
});