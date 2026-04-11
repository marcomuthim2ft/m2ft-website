// M2 Player Scorecard Quiz Logic

const quizData = {
    questions: [
        {
            id: 1,
            question: "What's your best attribute on the pitch?",
            type: "multiple-choice",
            options: [
                { text: "Ball control & technical skills", archetypes: { technician: 3, workhorse: 0, explosive: 1, leader: 0, wall: 0, finisher: 1 }, scores: { technical: 10, tactical: 5, physical: 0, mental: 0 } },
                { text: "Work rate & stamina", archetypes: { technician: 0, workhorse: 3, explosive: 0, leader: 1, wall: 1, finisher: 0 }, scores: { technical: 0, tactical: 5, physical: 10, mental: 5 } },
                { text: "Speed & acceleration", archetypes: { technician: 0, workhorse: 0, explosive: 3, leader: 0, wall: 0, finisher: 2 }, scores: { technical: 0, tactical: 0, physical: 10, mental: 0 } },
                { text: "Leadership & communication", archetypes: { technician: 0, workhorse: 1, explosive: 0, leader: 3, wall: 1, finisher: 0 }, scores: { technical: 0, tactical: 10, physical: 0, mental: 10 } },
                { text: "Physical strength & presence", archetypes: { technician: 0, workhorse: 1, explosive: 0, leader: 1, wall: 3, finisher: 1 }, scores: { technical: 0, tactical: 0, physical: 10, mental: 5 } },
                { text: "Finishing & goal-scoring", archetypes: { technician: 1, workhorse: 0, explosive: 1, leader: 0, wall: 0, finisher: 3 }, scores: { technical: 10, tactical: 5, physical: 0, mental: 5 } }
            ]
        },
        {
            id: 2,
            question: "How do you prefer to receive the ball?",
            type: "multiple-choice",
            options: [
                { text: "To feet, so I can turn and create", archetypes: { technician: 3, workhorse: 0, explosive: 1, leader: 0, wall: 0, finisher: 1 }, scores: { technical: 10, tactical: 5, physical: 0, mental: 0 } },
                { text: "In space, so I can run onto it", archetypes: { technician: 0, workhorse: 1, explosive: 3, leader: 0, wall: 0, finisher: 2 }, scores: { technical: 5, tactical: 5, physical: 10, mental: 0 } },
                { text: "To hold up and lay off to teammates", archetypes: { technician: 0, workhorse: 2, explosive: 0, leader: 1, wall: 3, finisher: 1 }, scores: { technical: 5, tactical: 10, physical: 5, mental: 5 } },
                { text: "Deep, so I can dictate play", archetypes: { technician: 2, workhorse: 1, explosive: 0, leader: 3, wall: 0, finisher: 0 }, scores: { technical: 10, tactical: 10, physical: 0, mental: 10 } }
            ]
        },
        {
            id: 3,
            question: "In a match, you're most likely to:",
            type: "multiple-choice",
            options: [
                { text: "Dribble past defenders and create chances", archetypes: { technician: 3, workhorse: 0, explosive: 2, leader: 0, wall: 0, finisher: 1 }, scores: { technical: 10, tactical: 5, physical: 5, mental: 5 } },
                { text: "Win tackles and press opponents", archetypes: { technician: 0, workhorse: 3, explosive: 1, leader: 1, wall: 2, finisher: 0 }, scores: { technical: 0, tactical: 10, physical: 10, mental: 5 } },
                { text: "Make runs behind the defense", archetypes: { technician: 0, workhorse: 1, explosive: 3, leader: 0, wall: 0, finisher: 3 }, scores: { technical: 5, tactical: 10, physical: 10, mental: 0 } },
                { text: "Organize teammates and read the game", archetypes: { technician: 1, workhorse: 1, explosive: 0, leader: 3, wall: 1, finisher: 0 }, scores: { technical: 0, tactical: 10, physical: 0, mental: 10 } },
                { text: "Dominate physical battles", archetypes: { technician: 0, workhorse: 2, explosive: 0, leader: 1, wall: 3, finisher: 0 }, scores: { technical: 0, tactical: 5, physical: 10, mental: 5 } },
                { text: "Score goals", archetypes: { technician: 1, workhorse: 0, explosive: 2, leader: 0, wall: 0, finisher: 3 }, scores: { technical: 10, tactical: 5, physical: 0, mental: 5 } }
            ]
        },
        {
            id: 4,
            question: "Rate your sprint speed (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: {
                    technician: value <= 5 ? 1 : 0,
                    workhorse: value >= 5 && value <= 7 ? 1 : 0,
                    explosive: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                    leader: 0,
                    wall: value <= 5 ? 1 : 0,
                    finisher: value >= 7 ? 2 : 0
                },
                scores: {
                    technical: 0,
                    tactical: 0,
                    physical: value * 10,
                    mental: 0
                }
            })
        },
        {
            id: 5,
            question: "Rate your passing accuracy (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: {
                    technician: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                    workhorse: value >= 6 && value <= 8 ? 1 : 0,
                    explosive: 0,
                    leader: value >= 7 ? 2 : 0,
                    wall: value <= 5 ? 1 : 0,
                    finisher: value >= 6 ? 1 : 0
                },
                scores: {
                    technical: value * 10,
                    tactical: value * 5,
                    physical: 0,
                    mental: 0
                }
            })
        },
        {
            id: 6,
            question: "Rate your leadership on the pitch (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: {
                    technician: 0,
                    workhorse: value >= 6 ? 1 : 0,
                    explosive: 0,
                    leader: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                    wall: value >= 7 ? 2 : 0,
                    finisher: value >= 6 ? 1 : 0
                },
                scores: {
                    technical: 0,
                    tactical: value * 5,
                    physical: 0,
                    mental: value * 10
                }
            })
        },
        {
            id: 7,
            question: "Rate your finishing ability (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: {
                    technician: value >= 6 ? 1 : 0,
                    workhorse: 0,
                    explosive: value >= 7 ? 2 : 0,
                    leader: 0,
                    wall: value <= 5 ? 1 : 0,
                    finisher: value >= 8 ? 3 : value >= 6 ? 2 : 0
                },
                scores: {
                    technical: value * 10,
                    tactical: value * 5,
                    physical: 0,
                    mental: value * 5
                }
            })
        },
        {
            id: 8,
            question: "Rate your stamina/endurance (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: {
                    technician: 0,
                    workhorse: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                    explosive: value <= 6 ? 1 : 0,
                    leader: value >= 7 ? 1 : 0,
                    wall: value >= 6 ? 1 : 0,
                    finisher: value >= 6 ? 1 : 0
                },
                scores: {
                    technical: 0,
                    tactical: 0,
                    physical: value * 10,
                    mental: value * 5
                }
            })
        },
        {
            id: 9,
            question: "Which player do you admire most?",
            type: "multiple-choice",
            options: [
                { text: "Kevin De Bruyne (Creative playmaker)", archetypes: { technician: 3, workhorse: 0, explosive: 0, leader: 1, wall: 0, finisher: 0 }, scores: { technical: 10, tactical: 10, physical: 0, mental: 5 } },
                { text: "N'Golo Kanté (Tireless midfielder)", archetypes: { technician: 0, workhorse: 3, explosive: 0, leader: 1, wall: 1, finisher: 0 }, scores: { technical: 5, tactical: 10, physical: 10, mental: 10 } },
                { text: "Kylian Mbappé (Speed demon)", archetypes: { technician: 0, workhorse: 0, explosive: 3, leader: 0, wall: 0, finisher: 2 }, scores: { technical: 10, tactical: 5, physical: 10, mental: 5 } },
                { text: "Virgil van Dijk (Commanding defender)", archetypes: { technician: 0, workhorse: 0, explosive: 0, leader: 3, wall: 2, finisher: 0 }, scores: { technical: 5, tactical: 10, physical: 10, mental: 10 } },
                { text: "Erling Haaland (Physical force)", archetypes: { technician: 0, workhorse: 0, explosive: 1, leader: 0, wall: 3, finisher: 2 }, scores: { technical: 5, tactical: 5, physical: 10, mental: 5 } },
                { text: "Harry Kane (Clinical finisher)", archetypes: { technician: 1, workhorse: 0, explosive: 0, leader: 1, wall: 0, finisher: 3 }, scores: { technical: 10, tactical: 10, physical: 5, mental: 10 } }
            ]
        },
        {
            id: 10,
            question: "What's your primary position?",
            type: "multiple-choice",
            options: [
                { text: "Goalkeeper", archetypes: { technician: 0, workhorse: 1, explosive: 0, leader: 2, wall: 2, finisher: 0 }, scores: { technical: 5, tactical: 10, physical: 5, mental: 10 } },
                { text: "Defender", archetypes: { technician: 0, workhorse: 1, explosive: 0, leader: 2, wall: 3, finisher: 0 }, scores: { technical: 5, tactical: 10, physical: 10, mental: 10 } },
                { text: "Midfielder", archetypes: { technician: 2, workhorse: 3, explosive: 1, leader: 2, wall: 0, finisher: 0 }, scores: { technical: 10, tactical: 10, physical: 10, mental: 10 } },
                { text: "Winger", archetypes: { technician: 2, workhorse: 1, explosive: 3, leader: 0, wall: 0, finisher: 2 }, scores: { technical: 10, tactical: 5, physical: 10, mental: 5 } },
                { text: "Striker", archetypes: { technician: 1, workhorse: 0, explosive: 2, leader: 0, wall: 1, finisher: 3 }, scores: { technical: 10, tactical: 5, physical: 5, mental: 5 } }
            ]
        },
        {
            id: 11,
            question: "How do you handle pressure in big moments?",
            type: "multiple-choice",
            options: [
                { text: "Thrive on it - I want the ball", archetypes: { technician: 2, workhorse: 0, explosive: 1, leader: 2, wall: 0, finisher: 3 }, scores: { technical: 5, tactical: 5, physical: 0, mental: 10 } },
                { text: "Stay calm and focused", archetypes: { technician: 2, workhorse: 1, explosive: 0, leader: 3, wall: 1, finisher: 1 }, scores: { technical: 0, tactical: 10, physical: 0, mental: 10 } },
                { text: "Work harder physically", archetypes: { technician: 0, workhorse: 3, explosive: 1, leader: 0, wall: 2, finisher: 0 }, scores: { technical: 0, tactical: 5, physical: 10, mental: 5 } },
                { text: "Sometimes struggle with it", archetypes: { technician: 1, workhorse: 1, explosive: 1, leader: 0, wall: 1, finisher: 0 }, scores: { technical: 5, tactical: 5, physical: 5, mental: 5 } }
            ]
        },
        {
            id: 12,
            question: "Do you prefer:",
            type: "multiple-choice",
            options: [
                { text: "Individual skill & flair", archetypes: { technician: 3, workhorse: 0, explosive: 2, leader: 0, wall: 0, finisher: 1 }, scores: { technical: 10, tactical: 0, physical: 0, mental: 5 } },
                { text: "Team play & combinations", archetypes: { technician: 2, workhorse: 2, explosive: 0, leader: 2, wall: 0, finisher: 1 }, scores: { technical: 5, tactical: 10, physical: 0, mental: 5 } },
                { text: "Physical battles & duels", archetypes: { technician: 0, workhorse: 2, explosive: 1, leader: 1, wall: 3, finisher: 0 }, scores: { technical: 0, tactical: 5, physical: 10, mental: 5 } },
                { text: "Tactical execution", archetypes: { technician: 1, workhorse: 2, explosive: 0, leader: 3, wall: 1, finisher: 1 }, scores: { technical: 5, tactical: 10, physical: 0, mental: 10 } }
            ]
        },
        {
            id: 13,
            question: "What's your main goal as a player?",
            type: "multiple-choice",
            options: [
                { text: "Become more technical & creative", archetypes: { technician: 3, workhorse: 0, explosive: 1, leader: 0, wall: 0, finisher: 1 }, scores: { technical: 10, tactical: 5, physical: 0, mental: 0 } },
                { text: "Get faster & more explosive", archetypes: { technician: 0, workhorse: 1, explosive: 3, leader: 0, wall: 0, finisher: 2 }, scores: { technical: 0, tactical: 0, physical: 10, mental: 0 } },
                { text: "Improve decision-making & IQ", archetypes: { technician: 1, workhorse: 1, explosive: 0, leader: 3, wall: 0, finisher: 1 }, scores: { technical: 0, tactical: 10, physical: 0, mental: 10 } },
                { text: "Score more goals", archetypes: { technician: 1, workhorse: 0, explosive: 2, leader: 0, wall: 0, finisher: 3 }, scores: { technical: 5, tactical: 5, physical: 0, mental: 5 } },
                { text: "Get stronger & more physical", archetypes: { technician: 0, workhorse: 2, explosive: 0, leader: 1, wall: 3, finisher: 0 }, scores: { technical: 0, tactical: 0, physical: 10, mental: 0 } },
                { text: "Become a team leader", archetypes: { technician: 0, workhorse: 1, explosive: 0, leader: 3, wall: 1, finisher: 0 }, scores: { technical: 0, tactical: 5, physical: 0, mental: 10 } }
            ]
        },
        {
            id: 14,
            question: "Rate your tactical awareness (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: {
                    technician: value >= 7 ? 2 : 0,
                    workhorse: value >= 6 ? 1 : 0,
                    explosive: 0,
                    leader: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                    wall: value >= 7 ? 1 : 0,
                    finisher: value >= 6 ? 1 : 0
                },
                scores: {
                    technical: 0,
                    tactical: value * 10,
                    physical: 0,
                    mental: value * 5
                }
            })
        },
        {
            id: 15,
            question: "Rate your mental toughness (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: {
                    technician: value >= 6 ? 1 : 0,
                    workhorse: value >= 8 ? 2 : value >= 6 ? 1 : 0,
                    explosive: value >= 7 ? 1 : 0,
                    leader: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                    wall: value >= 7 ? 2 : 0,
                    finisher: value >= 8 ? 2 : value >= 6 ? 1 : 0
                },
                scores: {
                    technical: 0,
                    tactical: 0,
                    physical: 0,
                    mental: value * 10
                }
            })
        }
    ],
    archetypes: {
        technician: {
            name: "The Technician",
            icon: "🎨",
            subtitle: "Creative Playmaker",
            description: "You're a technically gifted player with exceptional ball control, vision, and creativity. You see passes others don't and create magic with your feet. Your game is built on skill, intelligence, and the ability to unlock defenses.",
            famousPlayers: "Kevin De Bruyne, Luka Modrić, Andrés Iniesta",
            strengths: ["Exceptional ball control", "Creative passing", "Game intelligence", "Vision & awareness"],
            development: ["Improve physical presence", "Work on defensive contributions", "Increase stamina", "Develop speed"]
        },
        workhorse: {
            name: "The Workhorse",
            icon: "💪",
            subtitle: "Box-to-Box Engine",
            description: "You're the heartbeat of the team with relentless work rate, stamina, and versatility. You cover every blade of grass, win tackles, press opponents, and contribute in both attack and defense. Your engine never stops.",
            famousPlayers: "N'Golo Kanté, Declan Rice, Fabinho",
            strengths: ["Elite stamina & endurance", "High work rate", "Tactical discipline", "Defensive awareness"],
            development: ["Improve technical skills", "Work on finishing", "Develop creativity", "Enhance passing range"]
        },
        explosive: {
            name: "The Explosive",
            icon: "⚡",
            subtitle: "Speed Merchant",
            description: "You're built for speed with blistering pace and explosive acceleration. You terrorize defenders with your ability to burst past them, exploit space behind the defense, and turn games in an instant with your directness.",
            famousPlayers: "Kylian Mbappé, Adama Traoré, Vinícius Jr.",
            strengths: ["Elite sprint speed", "Explosive acceleration", "1v1 dribbling", "Counter-attacking threat"],
            development: ["Improve decision-making", "Work on link-up play", "Develop tactical awareness", "Enhance finishing"]
        },
        leader: {
            name: "The Leader",
            icon: "🧠",
            subtitle: "Tactical Commander",
            description: "You're a natural leader with elite tactical intelligence, communication skills, and game-reading ability. You organize teammates, make smart decisions, and command respect on the pitch. Your brain is your biggest weapon.",
            famousPlayers: "Virgil van Dijk, Thiago Silva, Sergio Ramos",
            strengths: ["Elite tactical IQ", "Leadership & communication", "Game reading", "Organizational skills"],
            development: ["Improve pace", "Work on technical execution", "Develop physical presence", "Enhance 1v1 skills"]
        },
        wall: {
            name: "The Wall",
            icon: "🛡️",
            subtitle: "Physical Dominator",
            description: "You're a physical force with exceptional strength, aerial dominance, and the ability to win duels. You impose yourself on the game through sheer physicality, intimidate opponents, and excel in hold-up play and defensive battles.",
            famousPlayers: "Romelu Lukaku, Erling Haaland, Akinfenwa",
            strengths: ["Physical strength & power", "Aerial dominance", "Winning duels", "Hold-up play"],
            development: ["Improve agility", "Work on technical skills", "Develop first touch", "Enhance mobility"]
        },
        finisher: {
            name: "The Finisher",
            icon: "🎯",
            subtitle: "Elite Goal-Scorer",
            description: "You're a natural goal-scorer with exceptional finishing, movement, and composure in front of goal. You live for those big moments, have ice in your veins, and know exactly where to be to put the ball in the net.",
            famousPlayers: "Harry Kane, Robert Lewandowski, Mohamed Salah",
            strengths: ["Clinical finishing", "Goal-scoring instinct", "Movement in the box", "Composure under pressure"],
            development: ["Improve link-up play", "Work on defensive contribution", "Develop hold-up ability", "Enhance creativity"]
        }
    }
};

let currentQuestion = 0;
let answers = [];
let archetypeScores = {
    technician: 0,
    workhorse: 0,
    explosive: 0,
    leader: 0,
    wall: 0,
    finisher: 0
};
let categoryScores = {
    technical: 0,
    tactical: 0,
    physical: 0,
    mental: 0
};

function startQuiz() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    renderQuestion();
}

function renderQuestion() {
    const question = quizData.questions[currentQuestion];
    const container = document.getElementById('quizQuestions');
    
    let html = `<div class="quiz-step active">
        <div class="question-card">
            <h2 class="question-title">${question.question}</h2>`;
    
    if (question.type === 'multiple-choice') {
        html += '<div class="answer-options">';
        question.options.forEach((option, index) => {
            const selected = answers[currentQuestion] === index ? 'selected' : '';
            html += `
                <div class="answer-option ${selected}" onclick="selectAnswer(${index})">
                    <input type="radio" name="q${question.id}" id="q${question.id}_${index}" value="${index}">
                    <label class="answer-label" for="q${question.id}_${index}">${option.text}</label>
                </div>
            `;
        });
        html += '</div>';
    } else if (question.type === 'scale') {
        const value = answers[currentQuestion] || 5;
        html += `
            <div class="range-input-container">
                <input type="range" class="range-input" min="${question.min}" max="${question.max}" value="${value}" 
                    oninput="updateRangeValue(this.value)" id="rangeInput${question.id}">
                <div class="range-value" id="rangeValue${question.id}">${value}</div>
                <div class="range-labels">
                    <span>Beginner</span>
                    <span>Elite</span>
                </div>
            </div>
        `;
    }
    
    html += '</div></div>';
    container.innerHTML = html;
    
    updateProgress();
    updateButtons();
}

function selectAnswer(index) {
    answers[currentQuestion] = index;
    
    // Visual feedback
    const options = document.querySelectorAll('.answer-option');
    options.forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    document.getElementById('btnNext').disabled = false;
}

function updateRangeValue(value) {
    const question = quizData.questions[currentQuestion];
    document.getElementById(`rangeValue${question.id}`).textContent = value;
    answers[currentQuestion] = parseInt(value);
    document.getElementById('btnNext').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < quizData.questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        // Quiz complete - show email gate
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('emailGate').style.display = 'block';
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${quizData.questions.length}`;
}

function updateButtons() {
    const btnBack = document.getElementById('btnBack');
    const btnNext = document.getElementById('btnNext');
    
    btnBack.style.display = currentQuestion > 0 ? 'block' : 'none';
    btnNext.disabled = answers[currentQuestion] === undefined;
}

function calculateResults() {
    // Reset scores
    archetypeScores = { technician: 0, workhorse: 0, explosive: 0, leader: 0, wall: 0, finisher: 0 };
    categoryScores = { technical: 0, tactical: 0, physical: 0, mental: 0 };
    
    let scoreCounts = { technical: 0, tactical: 0, physical: 0, mental: 0 };
    
    quizData.questions.forEach((question, index) => {
        const answer = answers[index];
        
        if (question.type === 'multiple-choice') {
            const option = question.options[answer];
            
            // Add to archetype scores
            Object.keys(option.archetypes).forEach(key => {
                archetypeScores[key] += option.archetypes[key];
            });
            
            // Add to category scores
            Object.keys(option.scores).forEach(key => {
                if (option.scores[key] > 0) {
                    categoryScores[key] += option.scores[key];
                    scoreCounts[key]++;
                }
            });
        } else if (question.type === 'scale') {
            const result = question.scoring(answer);
            
            // Add to archetype scores
            Object.keys(result.archetypes).forEach(key => {
                archetypeScores[key] += result.archetypes[key];
            });
            
            // Add to category scores
            Object.keys(result.scores).forEach(key => {
                if (result.scores[key] > 0) {
                    categoryScores[key] += result.scores[key];
                    scoreCounts[key]++;
                }
            });
        }
    });
    
    // Average the category scores and normalize to 60-95 range for better feel
    Object.keys(categoryScores).forEach(key => {
        if (scoreCounts[key] > 0) {
            // Average the raw scores
            let avgScore = categoryScores[key] / scoreCounts[key];
            
            // Normalize to 60-95 range (base score of 60 + up to 35 points)
            // This ensures everyone gets a decent score but can still see improvement areas
            categoryScores[key] = Math.round(60 + (avgScore * 0.35));
            
            // Cap at 95 (elite level)
            categoryScores[key] = Math.min(95, Math.max(60, categoryScores[key]));
        } else {
            categoryScores[key] = 65; // Default if no data
        }
    });
    
    // Find dominant archetype
    let dominantArchetype = 'technician';
    let highestScore = 0;
    Object.keys(archetypeScores).forEach(key => {
        if (archetypeScores[key] > highestScore) {
            highestScore = archetypeScores[key];
            dominantArchetype = key;
        }
    });
    
    // Calculate overall score (average of 4 categories)
    const overallScore = Math.round(
        (categoryScores.technical + categoryScores.tactical + categoryScores.physical + categoryScores.mental) / 4
    );
    
    return {
        archetype: dominantArchetype,
        overallScore,
        categoryScores
    };
}

async function submitEmailAndShowResults() {
    const name = document.getElementById('playerName').value.trim();
    const email = document.getElementById('playerEmail').value.trim();
    const age = document.getElementById('playerAge').value;
    const position = document.getElementById('playerPosition').value;
    
    if (!name || !email || !age || !position) {
        alert('Please fill in all fields');
        return;
    }
    
    const results = calculateResults();
    
    // Save to database
    try {
        await fetch('tables/player_scorecard_leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                age: parseInt(age),
                position,
                archetype: quizData.archetypes[results.archetype].name,
                overall_score: results.overallScore,
                technical_score: results.categoryScores.technical,
                tactical_score: results.categoryScores.tactical,
                physical_score: results.categoryScores.physical,
                mental_score: results.categoryScores.mental,
                quiz_answers: JSON.stringify(answers),
                completed_at: new Date().toISOString()
            })
        });
    } catch (error) {
        console.error('Error saving results:', error);
    }
    
    // Show results
    displayResults(results, name);
}

function displayResults(results, playerName) {
    document.getElementById('emailGate').style.display = 'none';
    document.getElementById('results').classList.add('active');
    
    const archetype = quizData.archetypes[results.archetype];
    
    const html = `
        <div class="archetype-reveal">
            <div class="archetype-icon">${archetype.icon}</div>
            <div class="archetype-title">${archetype.name}</div>
            <div class="archetype-subtitle">${archetype.subtitle}</div>
            <div class="archetype-description">${archetype.description}</div>
            <div class="famous-players">
                <strong>Similar Players:</strong> ${archetype.famousPlayers}
            </div>
        </div>

        <div style="background: var(--navy); padding: 3rem; border-radius: 12px; margin-bottom: 3rem;">
            <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem; color: var(--white);">
                Your M2 Player Score
            </h2>
            
            <div style="text-align: center; margin-bottom: 3rem;">
                <div style="font-size: 5rem; font-weight: 900; color: #FF6B35;">${results.overallScore}</div>
                <div style="font-size: 1.2rem; color: var(--medium-grey);">out of 100</div>
            </div>

            <div class="score-grid">
                <div class="score-card">
                    <div class="score-label">Technical</div>
                    <div class="score-number">${results.categoryScores.technical}</div>
                    <div class="score-bar">
                        <div class="score-bar-fill" style="width: ${results.categoryScores.technical}%"></div>
                    </div>
                </div>
                <div class="score-card">
                    <div class="score-label">Tactical</div>
                    <div class="score-number">${results.categoryScores.tactical}</div>
                    <div class="score-bar">
                        <div class="score-bar-fill" style="width: ${results.categoryScores.tactical}%"></div>
                    </div>
                </div>
                <div class="score-card">
                    <div class="score-label">Physical</div>
                    <div class="score-number">${results.categoryScores.physical}</div>
                    <div class="score-bar">
                        <div class="score-bar-fill" style="width: ${results.categoryScores.physical}%"></div>
                    </div>
                </div>
                <div class="score-card">
                    <div class="score-label">Mental</div>
                    <div class="score-number">${results.categoryScores.mental}</div>
                    <div class="score-bar">
                        <div class="score-bar-fill" style="width: ${results.categoryScores.mental}%"></div>
                    </div>
                </div>
            </div>

            <div style="margin-top: 3rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div style="background: rgba(76, 175, 80, 0.1); border-left: 3px solid #4CAF50; padding: 1.5rem; border-radius: 8px;">
                    <h4 style="color: #4CAF50; margin-bottom: 1rem; font-size: 1.1rem;">Your Strengths</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${archetype.strengths.map(s => `<li style="padding: 0.5rem 0; color: var(--light-grey);">✓ ${s}</li>`).join('')}
                    </ul>
                </div>
                <div style="background: rgba(255, 107, 53, 0.1); border-left: 3px solid #FF6B35; padding: 1.5rem; border-radius: 8px;">
                    <h4 style="color: #FF6B35; margin-bottom: 1rem; font-size: 1.1rem;">Development Areas</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${archetype.development.map(d => `<li style="padding: 0.5rem 0; color: var(--light-grey);">→ ${d}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('results').innerHTML = html;
    
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
