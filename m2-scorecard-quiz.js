// M2 Player Scorecard Quiz - 25 Questions with Position-Specific KPIs
// Q1: Position Selection
// Q2-16: Universal Assessment (original 15 questions)
// Q17-22: Position-Specific KPIs (6 questions based on Q1)
// Q23-25: Goals & Logistics (3 questions)

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

    questions: [
        // Q1: Position Selection
        {
            id: 1,
            question: "What is your primary playing position?",
            type: "multiple-choice",
            options: [
                { text: "Striker", archetypes: { finisher: 1 }, scores: { technical: 0, tactical: 0, physical: 0, mental: 0 }, position: "Striker" },
                { text: "Midfielder", archetypes: { technician: 1 }, scores: { technical: 0, tactical: 0, physical: 0, mental: 0 }, position: "Midfielder" },
                { text: "Defender", archetypes: { wall: 1 }, scores: { technical: 0, tactical: 0, physical: 0, mental: 0 }, position: "Defender" },
                { text: "Winger", archetypes: { explosive: 1 }, scores: { technical: 0, tactical: 0, physical: 0, mental: 0 }, position: "Winger" },
                { text: "Goalkeeper", archetypes: { wall: 1 }, scores: { technical: 0, tactical: 0, physical: 0, mental: 0 }, position: "Goalkeeper" }
            ]
        },
        // Q2-16: Universal Questions (original 15)
        {
            id: 2,
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
            id: 3,
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
            id: 4,
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
            id: 5,
            question: "Rate your sprint speed (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: value <= 5 ? 1 : 0, workhorse: value >= 5 && value <= 7 ? 1 : 0, explosive: value >= 8 ? 3 : value >= 6 ? 2 : 0, leader: 0, wall: value <= 5 ? 1 : 0, finisher: value >= 7 ? 2 : 0 },
                scores: { technical: 0, tactical: 0, physical: value * 10, mental: 0 }
            })
        },
        {
            id: 6,
            question: "Rate your agility and change of direction (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: value >= 7 ? 2 : 0, workhorse: value >= 6 ? 1 : 0, explosive: value >= 8 ? 2 : 0, leader: 0, wall: value <= 5 ? 1 : 0, finisher: value >= 7 ? 1 : 0 },
                scores: { technical: value * 5, tactical: 0, physical: value * 10, mental: 0 }
            })
        },
        {
            id: 7,
            question: "Rate your stamina and endurance (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: 0, workhorse: value >= 8 ? 3 : value >= 6 ? 2 : 0, explosive: value <= 5 ? 1 : 0, leader: value >= 7 ? 1 : 0, wall: value >= 6 ? 1 : 0, finisher: 0 },
                scores: { technical: 0, tactical: 0, physical: value * 10, mental: value * 3 }
            })
        },
        {
            id: 8,
            question: "Rate your first touch and ball control (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: value >= 8 ? 3 : value >= 6 ? 2 : 0, workhorse: 0, explosive: 0, leader: 0, wall: value <= 5 ? 1 : 0, finisher: value >= 7 ? 1 : 0 },
                scores: { technical: value * 10, tactical: value * 3, physical: 0, mental: 0 }
            })
        },
        {
            id: 9,
            question: "Rate your tactical awareness and positioning (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: value >= 7 ? 1 : 0, workhorse: value >= 7 ? 2 : 0, explosive: 0, leader: value >= 8 ? 3 : value >= 6 ? 2 : 0, wall: value >= 7 ? 2 : 0, finisher: value >= 6 ? 1 : 0 },
                scores: { technical: 0, tactical: value * 10, physical: 0, mental: value * 5 }
            })
        },
        {
            id: 10,
            question: "Rate your mental composure under pressure (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: value >= 7 ? 1 : 0, workhorse: value >= 6 ? 1 : 0, explosive: 0, leader: value >= 8 ? 2 : 0, wall: value >= 7 ? 2 : 0, finisher: value >= 8 ? 2 : 0 },
                scores: { technical: 0, tactical: value * 3, physical: 0, mental: value * 10 }
            })
        },
        {
            id: 11,
            question: "Rate your leadership and communication on the pitch (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: 0, workhorse: value >= 6 ? 1 : 0, explosive: 0, leader: value >= 8 ? 3 : value >= 6 ? 2 : 0, wall: value >= 7 ? 2 : 0, finisher: 0 },
                scores: { technical: 0, tactical: value * 5, physical: 0, mental: value * 10 }
            })
        },
        {
            id: 12,
            question: "Rate your work ethic and training intensity (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: 0, workhorse: value >= 8 ? 3 : value >= 6 ? 2 : 0, explosive: 0, leader: value >= 7 ? 1 : 0, wall: value >= 6 ? 1 : 0, finisher: 0 },
                scores: { technical: 0, tactical: 0, physical: value * 3, mental: value * 10 }
            })
        },
        {
            id: 13,
            question: "Rate your ability to learn and adapt (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: value >= 7 ? 1 : 0, workhorse: value >= 6 ? 1 : 0, explosive: 0, leader: value >= 7 ? 1 : 0, wall: 0, finisher: 0 },
                scores: { technical: value * 5, tactical: value * 5, physical: 0, mental: value * 10 }
            })
        },
        {
            id: 14,
            question: "Rate your confidence in matches (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: value >= 7 ? 1 : 0, workhorse: 0, explosive: value >= 7 ? 1 : 0, leader: value >= 8 ? 2 : 0, wall: value >= 7 ? 1 : 0, finisher: value >= 8 ? 2 : 0 },
                scores: { technical: 0, tactical: 0, physical: 0, mental: value * 10 }
            })
        },
        {
            id: 15,
            question: "Rate your physical strength (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: value <= 5 ? 1 : 0, workhorse: value >= 6 ? 1 : 0, explosive: value >= 7 ? 1 : 0, leader: 0, wall: value >= 8 ? 3 : value >= 6 ? 2 : 0, finisher: value >= 6 ? 1 : 0 },
                scores: { technical: 0, tactical: 0, physical: value * 10, mental: value * 3 }
            })
        },
        {
            id: 16,
            question: "Rate your passing accuracy (1-10)",
            type: "scale",
            min: 1,
            max: 10,
            scoring: (value) => ({
                archetypes: { technician: value >= 8 ? 3 : value >= 6 ? 2 : 0, workhorse: value >= 6 && value <= 8 ? 1 : 0, explosive: 0, leader: value >= 7 ? 2 : 0, wall: value <= 5 ? 1 : 0, finisher: value >= 6 ? 1 : 0 },
                scores: { technical: value * 10, tactical: value * 5, physical: 0, mental: 0 }
            })
        }
        // Q17-22 will be injected dynamically based on position
        // Q23-25 final questions added at the end
    ]
};

// Position-specific questions (Q17-22)
const positionQuestions = {
    "Striker": [
        { id: 17, question: "Rate your finishing accuracy in the box (1-10)", type: "scale", min: 1, max: 10, kpi: "finishing", scoring: (v) => ({ archetypes: { finisher: v >= 8 ? 3 : v >= 6 ? 2 : 0, explosive: v >= 7 ? 1 : 0, technician: v >= 7 ? 1 : 0 }, scores: { technical: v * 10, tactical: 0, physical: 0, mental: v * 5 } }) },
        { id: 18, question: "Rate your aerial ability and heading (1-10)", type: "scale", min: 1, max: 10, kpi: "aerial", scoring: (v) => ({ archetypes: { wall: v >= 7 ? 2 : 0, finisher: v >= 6 ? 1 : 0 }, scores: { technical: v * 5, tactical: v * 5, physical: v * 5, mental: 0 } }) },
        { id: 19, question: "Rate your movement off the ball and finding space (1-10)", type: "scale", min: 1, max: 10, kpi: "movement", scoring: (v) => ({ archetypes: { finisher: v >= 8 ? 2 : 0, explosive: v >= 7 ? 1 : 0, technician: v >= 7 ? 1 : 0 }, scores: { technical: 0, tactical: v * 10, physical: 0, mental: v * 5 } }) },
        { id: 20, question: "Rate your link-up play with teammates (1-10)", type: "scale", min: 1, max: 10, kpi: "linkup", scoring: (v) => ({ archetypes: { technician: v >= 7 ? 2 : 0, finisher: v >= 6 ? 1 : 0 }, scores: { technical: v * 5, tactical: v * 10, physical: 0, mental: 0 } }) },
        { id: 21, question: "Rate your ability to hold up the ball and shield defenders (1-10)", type: "scale", min: 1, max: 10, kpi: "holdup", scoring: (v) => ({ archetypes: { wall: v >= 7 ? 2 : 0, finisher: v >= 6 ? 1 : 0 }, scores: { technical: v * 5, tactical: v * 5, physical: v * 5, mental: v * 5 } }) },
        { id: 22, question: "Rate your composure in front of goal (1-10)", type: "scale", min: 1, max: 10, kpi: "composure", scoring: (v) => ({ archetypes: { finisher: v >= 8 ? 3 : v >= 6 ? 2 : 0 }, scores: { technical: 0, tactical: 0, physical: 0, mental: v * 10 } }) }
    ],
    "Midfielder": [
        { id: 17, question: "Rate your passing accuracy under pressure (1-10)", type: "scale", min: 1, max: 10, kpi: "passing_pressure", scoring: (v) => ({ archetypes: { technician: v >= 8 ? 3 : v >= 6 ? 2 : 0, leader: v >= 7 ? 1 : 0 }, scores: { technical: v * 10, tactical: v * 5, physical: 0, mental: v * 5 } }) },
        { id: 18, question: "Rate your ability to dictate tempo and control the game (1-10)", type: "scale", min: 1, max: 10, kpi: "tempo_control", scoring: (v) => ({ archetypes: { technician: v >= 7 ? 2 : 0, leader: v >= 8 ? 2 : 0 }, scores: { technical: v * 5, tactical: v * 10, physical: 0, mental: v * 5 } }) },
        { id: 19, question: "Rate your defensive work rate and tackling (1-10)", type: "scale", min: 1, max: 10, kpi: "defensive_work", scoring: (v) => ({ archetypes: { workhorse: v >= 8 ? 3 : v >= 6 ? 2 : 0, wall: v >= 7 ? 1 : 0 }, scores: { technical: 0, tactical: v * 5, physical: v * 10, mental: v * 5 } }) },
        { id: 20, question: "Rate your ability to make progressive passes forward (1-10)", type: "scale", min: 1, max: 10, kpi: "progressive_passes", scoring: (v) => ({ archetypes: { technician: v >= 8 ? 2 : 0, leader: v >= 7 ? 1 : 0 }, scores: { technical: v * 10, tactical: v * 10, physical: 0, mental: 0 } }) },
        { id: 21, question: "Rate your positioning to receive the ball (1-10)", type: "scale", min: 1, max: 10, kpi: "positioning", scoring: (v) => ({ archetypes: { technician: v >= 7 ? 1 : 0, leader: v >= 7 ? 1 : 0, workhorse: v >= 6 ? 1 : 0 }, scores: { technical: 0, tactical: v * 10, physical: 0, mental: v * 5 } }) },
        { id: 22, question: "Rate your ability to cover ground and press (1-10)", type: "scale", min: 1, max: 10, kpi: "covering_ground", scoring: (v) => ({ archetypes: { workhorse: v >= 8 ? 3 : v >= 6 ? 2 : 0 }, scores: { technical: 0, tactical: v * 5, physical: v * 10, mental: v * 5 } }) }
    ],
    "Defender": [
        { id: 17, question: "Rate your tackling success rate (1-10)", type: "scale", min: 1, max: 10, kpi: "tackling", scoring: (v) => ({ archetypes: { wall: v >= 8 ? 3 : v >= 6 ? 2 : 0, workhorse: v >= 7 ? 1 : 0 }, scores: { technical: v * 5, tactical: v * 5, physical: v * 5, mental: 0 } }) },
        { id: 18, question: "Rate your aerial ability in defensive situations (1-10)", type: "scale", min: 1, max: 10, kpi: "aerial_defending", scoring: (v) => ({ archetypes: { wall: v >= 8 ? 3 : v >= 6 ? 2 : 0 }, scores: { technical: v * 5, tactical: v * 5, physical: v * 10, mental: 0 } }) },
        { id: 19, question: "Rate your defensive positioning and anticipation (1-10)", type: "scale", min: 1, max: 10, kpi: "positioning_defending", scoring: (v) => ({ archetypes: { wall: v >= 7 ? 2 : 0, leader: v >= 7 ? 1 : 0 }, scores: { technical: 0, tactical: v * 10, physical: 0, mental: v * 5 } }) },
        { id: 20, question: "Rate your 1v1 defending ability (1-10)", type: "scale", min: 1, max: 10, kpi: "one_v_one", scoring: (v) => ({ archetypes: { wall: v >= 8 ? 2 : 0, workhorse: v >= 7 ? 1 : 0 }, scores: { technical: v * 5, tactical: v * 5, physical: v * 5, mental: v * 5 } }) },
        { id: 21, question: "Rate your ability to read the game and intercept passes (1-10)", type: "scale", min: 1, max: 10, kpi: "interceptions", scoring: (v) => ({ archetypes: { wall: v >= 7 ? 1 : 0, leader: v >= 7 ? 1 : 0 }, scores: { technical: 0, tactical: v * 10, physical: 0, mental: v * 5 } }) },
        { id: 22, question: "Rate your communication and organization of the defensive line (1-10)", type: "scale", min: 1, max: 10, kpi: "defensive_communication", scoring: (v) => ({ archetypes: { leader: v >= 8 ? 3 : v >= 6 ? 2 : 0, wall: v >= 7 ? 1 : 0 }, scores: { technical: 0, tactical: v * 5, physical: 0, mental: v * 10 } }) }
    ],
    "Winger": [
        { id: 17, question: "Rate your 1v1 dribbling success rate (1-10)", type: "scale", min: 1, max: 10, kpi: "dribbling_one_v_one", scoring: (v) => ({ archetypes: { technician: v >= 8 ? 3 : v >= 6 ? 2 : 0, explosive: v >= 7 ? 1 : 0 }, scores: { technical: v * 10, tactical: v * 5, physical: 0, mental: v * 5 } }) },
        { id: 18, question: "Rate your crossing accuracy (1-10)", type: "scale", min: 1, max: 10, kpi: "crossing", scoring: (v) => ({ archetypes: { technician: v >= 8 ? 2 : 0 }, scores: { technical: v * 10, tactical: v * 5, physical: 0, mental: 0 } }) },
        { id: 19, question: "Rate your ability to cut inside and shoot (1-10)", type: "scale", min: 1, max: 10, kpi: "cut_inside", scoring: (v) => ({ archetypes: { technician: v >= 7 ? 1 : 0, finisher: v >= 7 ? 2 : 0 }, scores: { technical: v * 10, tactical: v * 5, physical: 0, mental: 0 } }) },
        { id: 20, question: "Rate your pace and acceleration in wide areas (1-10)", type: "scale", min: 1, max: 10, kpi: "pace_wide", scoring: (v) => ({ archetypes: { explosive: v >= 8 ? 3 : v >= 6 ? 2 : 0 }, scores: { technical: 0, tactical: 0, physical: v * 10, mental: 0 } }) },
        { id: 21, question: "Rate your stamina to get up and down the wing (1-10)", type: "scale", min: 1, max: 10, kpi: "stamina_wing", scoring: (v) => ({ archetypes: { workhorse: v >= 8 ? 2 : 0 }, scores: { technical: 0, tactical: 0, physical: v * 10, mental: v * 3 } }) },
        { id: 22, question: "Rate your defensive tracking back (1-10)", type: "scale", min: 1, max: 10, kpi: "tracking_back", scoring: (v) => ({ archetypes: { workhorse: v >= 7 ? 2 : 0 }, scores: { technical: 0, tactical: v * 5, physical: v * 5, mental: v * 5 } }) }
    ],
    "Goalkeeper": [
        { id: 17, question: "Rate your shot-stopping ability (1-10)", type: "scale", min: 1, max: 10, kpi: "shot_stopping", scoring: (v) => ({ archetypes: { wall: v >= 8 ? 3 : v >= 6 ? 2 : 0 }, scores: { technical: v * 10, tactical: 0, physical: v * 5, mental: v * 5 } }) },
        { id: 18, question: "Rate your distribution accuracy (passing/throwing) (1-10)", type: "scale", min: 1, max: 10, kpi: "distribution", scoring: (v) => ({ archetypes: { technician: v >= 7 ? 2 : 0 }, scores: { technical: v * 10, tactical: v * 5, physical: 0, mental: 0 } }) },
        { id: 19, question: "Rate your command of the penalty box (1-10)", type: "scale", min: 1, max: 10, kpi: "box_command", scoring: (v) => ({ archetypes: { leader: v >= 8 ? 2 : 0, wall: v >= 7 ? 1 : 0 }, scores: { technical: 0, tactical: v * 5, physical: v * 5, mental: v * 10 } }) },
        { id: 20, question: "Rate your 1v1 ability against strikers (1-10)", type: "scale", min: 1, max: 10, kpi: "one_v_one_gk", scoring: (v) => ({ archetypes: { wall: v >= 7 ? 1 : 0 }, scores: { technical: v * 5, tactical: v * 5, physical: 0, mental: v * 10 } }) },
        { id: 21, question: "Rate your reflexes and reaction speed (1-10)", type: "scale", min: 1, max: 10, kpi: "reflexes", scoring: (v) => ({ archetypes: { explosive: v >= 8 ? 2 : 0, wall: v >= 7 ? 1 : 0 }, scores: { technical: v * 5, tactical: 0, physical: v * 10, mental: 0 } }) },
        { id: 22, question: "Rate your positioning and angle coverage (1-10)", type: "scale", min: 1, max: 10, kpi: "gk_positioning", scoring: (v) => ({ archetypes: { wall: v >= 7 ? 1 : 0 }, scores: { technical: 0, tactical: v * 10, physical: 0, mental: v * 5 } }) }
    ]
};

// Final questions (Q23-25)
const finalQuestions = [
    {
        id: 23,
        question: "What do you want to improve most?",
        type: "multiple-choice",
        options: [
            { text: "Speed & Acceleration", value: "speed" },
            { text: "Finishing & Goal-Scoring", value: "finishing" },
            { text: "Passing & Vision", value: "passing" },
            { text: "Defending & Tackling", value: "defending" },
            { text: "Tactical Awareness", value: "tactical" },
            { text: "Mental Strength & Confidence", value: "mental" }
        ]
    },
    {
        id: 24,
        question: "How many days per week can you train?",
        type: "multiple-choice",
        options: [
            { text: "2 days", value: 2 },
            { text: "3 days", value: 3 },
            { text: "4 days", value: 4 },
            { text: "5 days", value: 5 },
            { text: "6 days", value: 6 },
            { text: "7 days", value: 7 }
        ]
    },
    {
        id: 25,
        question: "What is your current playing level?",
        type: "multiple-choice",
        options: [
            { text: "Grassroots / Recreational", value: "grassroots" },
            { text: "Youth Academy", value: "youth_academy" },
            { text: "School / College Team", value: "school_college" },
            { text: "Semi-Professional", value: "semi_pro" },
            { text: "Professional", value: "professional" },
            { text: "Aspiring to Play Higher Level", value: "aspiring" }
        ]
    }
];

// Quiz state
let currentQuestion = 0;
let answers = {};
let selectedPosition = null;
let positionKPIs = {};
let archetypeScores = { technician: 0, workhorse: 0, explosive: 0, leader: 0, wall: 0, finisher: 0 };
let categoryScores = { technical: 0, tactical: 0, physical: 0, mental: 0 };

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
    
    // If Q1, capture position
    if (currentQuestion === 0) {
        selectedPosition = quizData.questions[0].options[index].position;
        
        // Inject position-specific questions (Q17-22)
        const posQuestions = positionQuestions[selectedPosition];
        quizData.questions = quizData.questions.slice(0, 17).concat(posQuestions).concat(finalQuestions);
    }
    
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
    archetypeScores = { technician: 0, workhorse: 0, explosive: 0, leader: 0, wall: 0, finisher: 0 };
    categoryScores = { technical: 0, tactical: 0, physical: 0, mental: 0 };
    positionKPIs = {};
    
    let scoreCounts = { technical: 0, tactical: 0, physical: 0, mental: 0 };
    
    quizData.questions.forEach((question, index) => {
        const answer = answers[index];
        
        if (question.type === 'multiple-choice') {
            const option = question.options[answer];
            
            if (option && option.archetypes) {
                Object.keys(option.archetypes).forEach(key => {
                    archetypeScores[key] += option.archetypes[key];
                });
            }
            
            if (option && option.scores) {
                Object.keys(option.scores).forEach(key => {
                    if (option.scores[key] > 0) {
                        categoryScores[key] += option.scores[key];
                        scoreCounts[key]++;
                    }
                });
            }
        } else if (question.type === 'scale') {
            const result = question.scoring(answer);
            
            Object.keys(result.archetypes).forEach(key => {
                archetypeScores[key] += result.archetypes[key];
            });
            
            Object.keys(result.scores).forEach(key => {
                if (result.scores[key] > 0) {
                    categoryScores[key] += result.scores[key];
                    scoreCounts[key]++;
                }
            });
            
            // Capture KPI scores
            if (question.kpi) {
                positionKPIs[question.kpi] = answer;
            }
        }
    });
    
    // Average the category scores
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
    
    const overallScore = Math.round(
        (categoryScores.technical + categoryScores.tactical + categoryScores.physical + categoryScores.mental) / 4
    );
    
    return { archetype: dominantArchetype, overallScore, categoryScores };
}

async function submitEmailAndShowResults() {
    const name = document.getElementById('playerName').value.trim();
    const email = document.getElementById('playerEmail').value.trim();
    const age = document.getElementById('playerAge').value;
    
    if (!name || !email || !age) {
        alert('Please fill in all fields');
        return;
    }
    
    const results = calculateResults();
    displayResults(results, name, email, age);
}

function displayResults(results, playerName, playerEmail, playerAge) {
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
                Based on your answers, we've created a custom 2-week training plan designed specifically for <strong>${selectedPosition}</strong> players like you.
            </p>
            <div style="background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; text-align: left; color: white;">
                    <div>✓ 2-week progressive program</div>
                    <div>✓ Daily session breakdowns</div>
                    <div>✓ Tailored to ${selectedPosition}</div>
                    <div>✓ Position-specific drills</div>
                </div>
            </div>
            <button onclick="generateTrainingPlan('${playerName}', '${playerEmail}', ${playerAge}, '${selectedPosition}', '${archetype.name}', ${JSON.stringify(results.categoryScores).replace(/"/g, '&quot;')}, ${JSON.stringify(positionKPIs).replace(/"/g, '&quot;')})" id="generatePlanBtn" style="background: white; color: #FF6B35; border: none; padding: 1.5rem 3rem; border-radius: 8px; font-size: 1.3rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 20px rgba(0,0,0,0.3);">
                📥 Get My FREE Training Plan
            </button>
            <div style="margin-top: 1rem; font-size: 0.95rem; color: rgba(255,255,255,0.9);">
                Instant generation • No payment required
            </div>
        </div>
    `;
    
    document.getElementById('results').innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function generateTrainingPlan(name, email, age, position, archetype, scores, kpis) {
    const btn = document.getElementById('generatePlanBtn');
    btn.disabled = true;
    btn.innerHTML = '⏳ Generating Your Plan...';
    
    try {
        const response = await fetch('/.netlify/functions/generate-training-plan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                age,
                position,
                archetype,
                playing_level: quizData.questions[24].options[answers[24]].text,
                training_days_per_week: quizData.questions[23].options[answers[23]].value,
                training_goals: [quizData.questions[22].options[answers[22]].text],
                equipment_access: [],
                scores,
                position_kpis: kpis
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            const planContent = data.plan.plan_content;
            
            btn.innerHTML = '📥 Download Your Plan';
            btn.style.background = '#4CAF50';
            btn.onclick = () => downloadPDF(name, position, archetype, scores, kpis, planContent, age);
            
        } else {
            throw new Error('Failed to generate plan');
        }
        
    } catch (error) {
        console.error('Error:', error);
        btn.innerHTML = '❌ Error - Try Again';
        btn.disabled = false;
        alert('⚠️ There was an error generating your plan. Please try again or contact marco@officialm2ft.com');
    }
}

function downloadPDF(name, position, archetype, scores, kpis, planContent, age) {
    // Load jsPDF from CDN if not already loaded
    if (typeof window.jspdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => generatePDFDocument(name, position, archetype, scores, kpis, planContent, age);
        document.head.appendChild(script);
    } else {
        generatePDFDocument(name, position, archetype, scores, kpis, planContent, age);
    }
}

function generatePDFDocument(name, position, archetype, scores, kpis, planContent, age) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    
    let yPos = margin;
    
    // Header - M2FT Logo & Title
    doc.setFillColor(25, 40, 70); // M2FT Navy
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('M2FT PERFORMANCE', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('2-Week Personalized Training Plan', pageWidth / 2, 30, { align: 'center' });
    
    yPos = 50;
    
    // Player Info Box
    doc.setFillColor(255, 107, 53); // Orange
    doc.roundedRect(margin, yPos, maxWidth, 45, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}`, margin + 10, yPos + 12);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Age: ${age} | Position: ${position} | Player Type: ${archetype}`, margin + 10, yPos + 22);
    
    // Scores
    doc.setFontSize(9);
    doc.text(`Technical: ${scores.technical}/100  |  Tactical: ${scores.tactical}/100  |  Physical: ${scores.physical}/100  |  Mental: ${scores.mental}/100`, 
             margin + 10, yPos + 32);
    
    yPos += 55;
    
    // Position-Specific KPIs Section
    if (kpis && Object.keys(kpis).length > 0) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${position} KPIs (Hughes 2012 Framework)`, margin, yPos);
        
        yPos += 8;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        
        const kpiNames = {
            finishing: 'Finishing', aerial: 'Aerial', movement: 'Movement', linkup: 'Link-Up', holdup: 'Hold-Up', composure: 'Composure',
            passing_pressure: 'Passing Under Pressure', tempo_control: 'Tempo Control', defensive_work: 'Defensive Work',
            progressive_passes: 'Progressive Passes', positioning: 'Positioning', covering_ground: 'Covering Ground',
            tackling: 'Tackling', aerial_defending: 'Aerial Defending', positioning_defending: 'Positioning',
            one_v_one: '1v1 Defending', interceptions: 'Interceptions', defensive_communication: 'Communication',
            dribbling_one_v_one: '1v1 Dribbling', crossing: 'Crossing', cut_inside: 'Cut Inside', pace_wide: 'Pace',
            stamina_wing: 'Stamina', tracking_back: 'Tracking Back',
            shot_stopping: 'Shot-Stopping', distribution: 'Distribution', box_command: 'Box Command',
            one_v_one_gk: '1v1 vs Strikers', reflexes: 'Reflexes', gk_positioning: 'Positioning'
        };
        
        let kpiText = '';
        Object.entries(kpis).forEach(([key, value]) => {
            const label = kpiNames[key] || key;
            kpiText += `${label}: ${value}/10  `;
        });
        
        const kpiLines = doc.splitTextToSize(kpiText, maxWidth);
        doc.text(kpiLines, margin, yPos);
        yPos += (kpiLines.length * 5) + 5;
    }
    
    // Divider
    doc.setDrawColor(25, 40, 70);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
    
    // Training Plan Content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('YOUR 2-WEEK TRAINING PLAN', margin, yPos);
    yPos += 10;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    // Split content into lines that fit
    const lines = doc.splitTextToSize(planContent, maxWidth);
    
    lines.forEach((line) => {
        if (yPos > pageHeight - 30) {
            doc.addPage();
            yPos = margin;
        }
        doc.text(line, margin, yPos);
        yPos += 5;
    });
    
    // Footer on last page
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`M2FT Performance | Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        doc.text('marco@officialm2ft.com | m2ftperformance.com', pageWidth / 2, pageHeight - 5, { align: 'center' });
    }
    
    // Save the PDF
    doc.save(`M2FT_Training_Plan_${name.replace(/\s+/g, '_')}.pdf`);
}
