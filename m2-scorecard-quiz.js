// M2 Player Scorecard Quiz Logic - 25 Questions with Position-Specific KPIs
// Based on Hughes (2012) KPI Framework

const quizData = {
    archetypes: {
        technician: {
            name: "The Technician",
            icon: "🎨",
            subtitle: "The Artist of the Game",
            description: "You're a player who thrives on technical excellence. Your close control, vision, and ability to unlock defenses with skill makes you a creative force on the pitch.",
            famousPlayers: "Lionel Messi, Kevin De Bruyne, Luka Modrić",
            strengths: ["Exceptional ball control", "Creative passing", "Technical execution under pressure"],
            development: ["Physical conditioning", "Defensive work rate", "Speed of play in transitions"]
        },
        workhorse: {
            name: "The Workhorse",
            icon: "💪",
            subtitle: "The Engine of the Team",
            description: "Your relentless work rate and stamina are unmatched. You cover every blade of grass and never stop running for the team.",
            famousPlayers: "N'Golo Kanté, Jordan Henderson, Declan Rice",
            strengths: ["Outstanding stamina", "High work rate", "Team-first mentality"],
            development: ["Technical refinement", "Creative decision-making", "Composure in possession"]
        },
        explosive: {
            name: "The Explosive",
            icon: "⚡",
            subtitle: "Pure Speed & Power",
            description: "You're a game-changer with your pace and athleticism. Defenders fear your ability to leave them in the dust.",
            famousPlayers: "Kylian Mbappé, Alphonso Davies, Adama Traoré",
            strengths: ["Blistering pace", "Athletic ability", "Direct attacking threat"],
            development: ["Technical consistency", "Tactical awareness", "Final ball execution"]
        },
        leader: {
            name: "The Leader",
            icon: "🧠",
            subtitle: "The Tactical General",
            description: "Your football IQ and leadership qualities set you apart. You read the game like a coach and organize those around you.",
            famousPlayers: "Virgil van Dijk, Thiago Silva, Sergio Ramos",
            strengths: ["Tactical intelligence", "Leadership presence", "Game management"],
            development: ["Physical explosiveness", "Recovery speed", "Attacking contribution"]
        },
        wall: {
            name: "The Wall",
            icon: "🛡️",
            subtitle: "The Defensive Rock",
            description: "You're a physical presence who dominates aerial duels and wins every battle. Opponents hate playing against you.",
            famousPlayers: "Ruben Dias, Antonio Rudiger, Kalidou Koulibaly",
            strengths: ["Physical dominance", "Aerial ability", "Defensive positioning"],
            development: ["Ball-playing ability", "Agility & footwork", "Attacking set-pieces"]
        },
        finisher: {
            name: "The Finisher",
            icon: "🎯",
            subtitle: "Born to Score Goals",
            description: "You live for goals. Your movement, positioning, and composure in front of goal make you a natural scorer.",
            famousPlayers: "Erling Haaland, Harry Kane, Robert Lewandowski",
            strengths: ["Clinical finishing", "Movement off the ball", "Composure in the box"],
            development: ["Link-up play", "Defensive contribution", "Physical strength"]
        }
    },

    // Universal Questions (Everyone gets these - Questions 1-15)
    questions: []
};

// Build complete questions array
const universalQuestions = [
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
        question: "Rate your agility and change of direction (1-10)",
        type: "scale",
        min: 1,
        max: 10,
        scoring: (value) => ({
            archetypes: {
                technician: value >= 7 ? 2 : 0,
                workhorse: value >= 6 ? 1 : 0,
                explosive: value >= 8 ? 2 : 0,
                leader: 0,
                wall: value <= 5 ? 1 : 0,
                finisher: value >= 7 ? 1 : 0
            },
            scores: {
                technical: value * 5,
                tactical: 0,
                physical: value * 10,
                mental: 0
            }
        })
    },
    {
        id: 6,
        question: "Rate your stamina and endurance (1-10)",
        type: "scale",
        min: 1,
        max: 10,
        scoring: (value) => ({
            archetypes: {
                technician: 0,
                workhorse: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                explosive: value <= 5 ? 1 : 0,
                leader: value >= 7 ? 1 : 0,
                wall: value >= 6 ? 1 : 0,
                finisher: 0
            },
            scores: {
                technical: 0,
                tactical: 0,
                physical: value * 10,
                mental: value * 3
            }
        })
    },
    {
        id: 7,
        question: "Rate your first touch and ball control (1-10)",
        type: "scale",
        min: 1,
        max: 10,
        scoring: (value) => ({
            archetypes: {
                technician: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                workhorse: 0,
                explosive: 0,
                leader: 0,
                wall: value <= 5 ? 1 : 0,
                finisher: value >= 7 ? 1 : 0
            },
            scores: {
                technical: value * 10,
                tactical: value * 3,
                physical: 0,
                mental: 0
            }
        })
    },
    {
        id: 8,
        question: "Rate your tactical awareness and positioning (1-10)",
        type: "scale",
        min: 1,
        max: 10,
        scoring: (value) => ({
            archetypes: {
                technician: value >= 7 ? 1 : 0,
                workhorse: value >= 7 ? 2 : 0,
                explosive: 0,
                leader: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                wall: value >= 7 ? 2 : 0,
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
        id: 9,
        question: "Rate your mental composure under pressure (1-10)",
        type: "scale",
        min: 1,
        max: 10,
        scoring: (value) => ({
            archetypes: {
                technician: value >= 7 ? 1 : 0,
                workhorse: value >= 6 ? 1 : 0,
                explosive: 0,
                leader: value >= 8 ? 2 : 0,
                wall: value >= 7 ? 2 : 0,
                finisher: value >= 8 ? 2 : 0
            },
            scores: {
                technical: 0,
                tactical: value * 3,
                physical: 0,
                mental: value * 10
            }
        })
    },
    {
        id: 10,
        question: "Rate your leadership and communication on the pitch (1-10)",
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
                finisher: 0
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
        id: 11,
        question: "Rate your work ethic and training intensity (1-10)",
        type: "scale",
        min: 1,
        max: 10,
        scoring: (value) => ({
            archetypes: {
                technician: 0,
                workhorse: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                explosive: 0,
                leader: value >= 7 ? 1 : 0,
                wall: value >= 6 ? 1 : 0,
                finisher: 0
            },
            scores: {
                technical: 0,
                tactical: 0,
                physical: value * 3,
                mental: value * 10
            }
        })
    },
    {
        id: 12,
        question: "Rate your ability to learn and adapt (1-10)",
        type: "scale",
        min: 1,
        max: 10,
        scoring: (value) => ({
            archetypes: {
                technician: value >= 7 ? 1 : 0,
                workhorse: value >= 6 ? 1 : 0,
                explosive: 0,
                leader: value >= 7 ? 1 : 0,
                wall: 0,
                finisher: 0
            },
            scores: {
                technical: value * 5,
                tactical: value * 5,
                physical: 0,
                mental: value * 10
            }
        })
    },
    {
        id: 13,
        question: "Rate your confidence in matches (1-10)",
        type: "scale",
        min: 1,
        max: 10,
        scoring: (value) => ({
            archetypes: {
                technician: value >= 7 ? 1 : 0,
                workhorse: 0,
                explosive: value >= 7 ? 1 : 0,
                leader: value >= 8 ? 2 : 0,
                wall: value >= 7 ? 1 : 0,
                finisher: value >= 8 ? 2 : 0
            },
            scores: {
                technical: 0,
                tactical: 0,
                physical: 0,
                mental: value * 10
            }
        })
    },
    {
        id: 14,
        question: "Rate your physical strength (1-10)",
        type: "scale",
        min: 1,
        max: 10,
        scoring: (value) => ({
            archetypes: {
                technician: value <= 5 ? 1 : 0,
                workhorse: value >= 6 ? 1 : 0,
                explosive: value >= 7 ? 1 : 0,
                leader: 0,
                wall: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                finisher: value >= 6 ? 1 : 0
            },
            scores: {
                technical: 0,
                tactical: 0,
                physical: value * 10,
                mental: value * 3
            }
        })
    },
    {
        id: 15,
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
    }
];

// Add universal questions to the main array
quizData.questions = [...universalQuestions];

// Position-specific questions will be added dynamically
let selectedPosition = null;
let positionKPIs = {};

// Quiz state
let currentQuestion = 0;
let answers = {};
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
    const progress = ((currentQuestion + 1) / 25) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of 25`;
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
    
    // Average the category scores and normalize to 60-95 range
    Object.keys(categoryScores).forEach(key => {
        if (scoreCounts[key] > 0) {
            let avgScore = categoryScores[key] / scoreCounts[key];
            categoryScores[key] = Math.round(60 + (avgScore * 0.35));
            categoryScores[key] = Math.min(95, Math.max(60, categoryScores[key]));
        } else {
            categoryScores[key] = 65;
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
    
    // Calculate overall score
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
    
    selectedPosition = position;
    const results = calculateResults();
    
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

        <div style="background: linear-gradient(135deg, #FF6B35 0%, #ff8c5a 100%); padding: 3rem; border-radius: 12px; text-align: center; margin-bottom: 3rem; box-shadow: 0 10px 40px rgba(255, 107, 53, 0.4);">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
            <h3 style="font-size: 2.2rem; color: white; margin-bottom: 1rem;">Ready for Your Personalized Training Plan?</h3>
            <p style="font-size: 1.2rem; color: rgba(255,255,255,0.95); margin-bottom: 2rem; max-width: 700px; margin-left: auto; margin-right: auto;">
                Based on your answers, we've created a custom 4-week training plan designed specifically for <strong>${archetype.name}</strong> players like you.
            </p>
            <div style="background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; text-align: left; color: white;">
                    <div>✓ 4-week progressive program</div>
                    <div>✓ Daily session breakdowns</div>
                    <div>✓ Tailored to your position</div>
                    <div>✓ Position-specific drills</div>
                </div>
            </div>
            <button onclick="alert('Training plan generator coming soon!')" style="background: white; color: #FF6B35; border: none; padding: 1.5rem 3rem; border-radius: 8px; font-size: 1.3rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(0,0,0,0.3);">
                📥 Get My FREE Training Plan
            </button>
            <div style="margin-top: 1rem; font-size: 0.95rem; color: rgba(255,255,255,0.9);">
                Instant download • No payment required
            </div>
        </div>
    `;
    
    document.getElementById('results').innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
