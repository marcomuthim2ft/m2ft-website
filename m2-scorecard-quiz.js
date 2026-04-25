// M2 Player Scorecard Quiz Logic - 25 Questions with Position-Specific KPIs
// Based on Hughes (2012) KPI Framework

const quizData = {
    // Universal Questions (Everyone gets these)
    universalQuestions: [
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
    ],

    // Position-Specific Questions (Hughes 2012 KPIs)
    positionSpecificQuestions: {
        "Striker": [
            {
                id: 16,
                question: "Rate your finishing accuracy in the box (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "finishing",
                scoring: (value) => ({
                    archetypes: {
                        finisher: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                        explosive: value >= 7 ? 1 : 0,
                        technician: value >= 7 ? 1 : 0
                    },
                    scores: {
                        technical: value * 10,
                        tactical: 0,
                        physical: 0,
                        mental: value * 5
                    }
                })
            },
            {
                id: 17,
                question: "Rate your aerial ability and heading (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "aerial",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 7 ? 2 : 0,
                        finisher: value >= 6 ? 1 : 0
                    },
                    scores: {
                        technical: value * 5,
                        tactical: value * 5,
                        physical: value * 5,
                        mental: 0
                    }
                })
            },
            {
                id: 18,
                question: "Rate your movement off the ball and finding space (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "movement",
                scoring: (value) => ({
                    archetypes: {
                        finisher: value >= 8 ? 2 : 0,
                        explosive: value >= 7 ? 1 : 0,
                        technician: value >= 7 ? 1 : 0
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
                id: 19,
                question: "Rate your link-up play with teammates (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "linkup",
                scoring: (value) => ({
                    archetypes: {
                        technician: value >= 7 ? 2 : 0,
                        finisher: value >= 6 ? 1 : 0
                    },
                    scores: {
                        technical: value * 5,
                        tactical: value * 10,
                        physical: 0,
                        mental: 0
                    }
                })
            },
            {
                id: 20,
                question: "Rate your ability to hold up the ball and shield defenders (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "holdup",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 7 ? 2 : 0,
                        finisher: value >= 6 ? 1 : 0
                    },
                    scores: {
                        technical: value * 5,
                        tactical: value * 5,
                        physical: value * 5,
                        mental: value * 5
                    }
                })
            },
            {
                id: 21,
                question: "Rate your composure in front of goal (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "composure",
                scoring: (value) => ({
                    archetypes: {
                        finisher: value >= 8 ? 3 : value >= 6 ? 2 : 0
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
        "Midfielder": [
            {
                id: 16,
                question: "Rate your passing accuracy under pressure (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "passing_pressure",
                scoring: (value) => ({
                    archetypes: {
                        technician: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                        leader: value >= 7 ? 1 : 0
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
                id: 17,
                question: "Rate your ability to dictate tempo and control the game (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "tempo_control",
                scoring: (value) => ({
                    archetypes: {
                        technician: value >= 7 ? 2 : 0,
                        leader: value >= 8 ? 2 : 0
                    },
                    scores: {
                        technical: value * 5,
                        tactical: value * 10,
                        physical: 0,
                        mental: value * 5
                    }
                })
            },
            {
                id: 18,
                question: "Rate your defensive work rate and tackling (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "defensive_work",
                scoring: (value) => ({
                    archetypes: {
                        workhorse: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                        wall: value >= 7 ? 1 : 0
                    },
                    scores: {
                        technical: 0,
                        tactical: value * 5,
                        physical: value * 10,
                        mental: value * 5
                    }
                })
            },
            {
                id: 19,
                question: "Rate your ability to make progressive passes forward (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "progressive_passes",
                scoring: (value) => ({
                    archetypes: {
                        technician: value >= 8 ? 2 : 0,
                        leader: value >= 7 ? 1 : 0
                    },
                    scores: {
                        technical: value * 10,
                        tactical: value * 10,
                        physical: 0,
                        mental: 0
                    }
                })
            },
            {
                id: 20,
                question: "Rate your positioning to receive the ball (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "positioning",
                scoring: (value) => ({
                    archetypes: {
                        technician: value >= 7 ? 1 : 0,
                        leader: value >= 7 ? 1 : 0,
                        workhorse: value >= 6 ? 1 : 0
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
                id: 21,
                question: "Rate your ability to cover ground and press (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "covering_ground",
                scoring: (value) => ({
                    archetypes: {
                        workhorse: value >= 8 ? 3 : value >= 6 ? 2 : 0
                    },
                    scores: {
                        technical: 0,
                        tactical: value * 5,
                        physical: value * 10,
                        mental: value * 5
                    }
                })
            }
        ],
        "Defender": [
            {
                id: 16,
                question: "Rate your tackling success rate (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "tackling",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                        workhorse: value >= 7 ? 1 : 0
                    },
                    scores: {
                        technical: value * 5,
                        tactical: value * 5,
                        physical: value * 5,
                        mental: 0
                    }
                })
            },
            {
                id: 17,
                question: "Rate your aerial ability in defensive situations (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "aerial_defending",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 8 ? 3 : value >= 6 ? 2 : 0
                    },
                    scores: {
                        technical: value * 5,
                        tactical: value * 5,
                        physical: value * 10,
                        mental: 0
                    }
                })
            },
            {
                id: 18,
                question: "Rate your defensive positioning and anticipation (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "positioning_defending",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 7 ? 2 : 0,
                        leader: value >= 7 ? 1 : 0
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
                id: 19,
                question: "Rate your 1v1 defending ability (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "one_v_one",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 8 ? 2 : 0,
                        workhorse: value >= 7 ? 1 : 0
                    },
                    scores: {
                        technical: value * 5,
                        tactical: value * 5,
                        physical: value * 5,
                        mental: value * 5
                    }
                })
            },
            {
                id: 20,
                question: "Rate your ability to read the game and intercept passes (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "interceptions",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 7 ? 1 : 0,
                        leader: value >= 7 ? 1 : 0
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
                id: 21,
                question: "Rate your communication and organization of the defensive line (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "defensive_communication",
                scoring: (value) => ({
                    archetypes: {
                        leader: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                        wall: value >= 7 ? 1 : 0
                    },
                    scores: {
                        technical: 0,
                        tactical: value * 5,
                        physical: 0,
                        mental: value * 10
                    }
                })
            }
        ],
        "Winger": [
            {
                id: 16,
                question: "Rate your 1v1 dribbling success rate (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "dribbling_one_v_one",
                scoring: (value) => ({
                    archetypes: {
                        technician: value >= 8 ? 3 : value >= 6 ? 2 : 0,
                        explosive: value >= 7 ? 1 : 0
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
                id: 17,
                question: "Rate your crossing accuracy (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "crossing",
                scoring: (value) => ({
                    archetypes: {
                        technician: value >= 8 ? 2 : 0
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
                id: 18,
                question: "Rate your ability to cut inside and shoot (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "cut_inside",
                scoring: (value) => ({
                    archetypes: {
                        technician: value >= 7 ? 1 : 0,
                        finisher: value >= 7 ? 2 : 0
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
                id: 19,
                question: "Rate your pace and acceleration in wide areas (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "pace_wide",
                scoring: (value) => ({
                    archetypes: {
                        explosive: value >= 8 ? 3 : value >= 6 ? 2 : 0
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
                id: 20,
                question: "Rate your stamina to get up and down the wing (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "stamina_wing",
                scoring: (value) => ({
                    archetypes: {
                        workhorse: value >= 8 ? 2 : 0
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
                id: 21,
                question: "Rate your defensive tracking back (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "tracking_back",
                scoring: (value) => ({
                    archetypes: {
                        workhorse: value >= 7 ? 2 : 0
                    },
                    scores: {
                        technical: 0,
                        tactical: value * 5,
                        physical: value * 5,
                        mental: value * 5
                    }
                })
            }
        ],
        "Goalkeeper": [
            {
                id: 16,
                question: "Rate your shot-stopping ability (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "shot_stopping",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 8 ? 3 : value >= 6 ? 2 : 0
                    },
                    scores: {
                        technical: value * 10,
                        tactical: 0,
                        physical: value * 5,
                        mental: value * 5
                    }
                })
            },
            {
                id: 17,
                question: "Rate your distribution accuracy (passing/throwing) (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "distribution",
                scoring: (value) => ({
                    archetypes: {
                        technician: value >= 7 ? 2 : 0
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
                id: 18,
                question: "Rate your command of the penalty box (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "box_command",
                scoring: (value) => ({
                    archetypes: {
                        leader: value >= 8 ? 2 : 0,
                        wall: value >= 7 ? 1 : 0
                    },
                    scores: {
                        technical: 0,
                        tactical: value * 5,
                        physical: value * 5,
                        mental: value * 10
                    }
                })
            },
            {
                id: 19,
                question: "Rate your 1v1 ability against strikers (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "one_v_one_gk",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 7 ? 1 : 0
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
                id: 20,
                question: "Rate your reflexes and reaction speed (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "reflexes",
                scoring: (value) => ({
                    archetypes: {
                        explosive: value >= 8 ? 2 : 0,
                        wall: value >= 7 ? 1 : 0
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
                id: 21,
                question: "Rate your positioning and angle coverage (1-10)",
                type: "scale",
                min: 1,
                max: 10,
                kpi: "gk_positioning",
                scoring: (value) => ({
                    archetypes: {
                        wall: value >= 7 ? 1 : 0
                    },
                    scores: {
                        technical: 0,
                        tactical: value * 10,
                        physical: 0,
                        mental: value * 5
                    }
                })
            }
        ]
    },

    // Goal-Setting & Logistics Questions
    finalQuestions: [
        {
            id: 22,
            question: "What do you want to improve most? (Select all that apply)",
            type: "multi-select",
            options: [
                { value: "speed", text: "Speed & Acceleration" },
                { value: "finishing", text: "Finishing & Goal-Scoring" },
                { value: "passing", text: "Passing & Vision" },
                { value: "defending", text: "Defending & Tackling" },
                { value: "tactical", text: "Tactical Awareness" },
                { value: "mental", text: "Mental Strength & Confidence" },
                { value: "stamina", text: "Stamina & Fitness" },
                { value: "weak_foot", text: "Weak Foot Development" },
                { value: "one_v_one", text: "1v1 Skills (Attacking or Defending)" },
                { value: "strength", text: "Physical Strength" }
            ]
        },
        {
            id: 23,
            question: "How many days per week can you train?",
            type: "dropdown",
            options: [
                { value: 2, text: "2 days" },
                { value: 3, text: "3 days" },
                { value: 4, text: "4 days" },
                { value: 5, text: "5 days" },
                { value: 6, text: "6 days" },
                { value: 7, text: "7 days" }
            ]
        },
        {
            id: 24,
            question: "What training equipment do you have access to? (Select all that apply)",
            type: "multi-select",
            options: [
                { value: "full_pitch", text: "Full Football Pitch" },
                { value: "half_pitch", text: "Half Pitch / Training Area" },
                { value: "cones", text: "Cones & Training Equipment" },
                { value: "gym", text: "Gym / Weights" },
                { value: "ball_only", text: "Just a Ball" },
                { value: "none", text: "Very Limited Equipment" }
            ]
        },
        {
            id: 25,
            question: "What is your current playing level?",
            type: "dropdown",
            options: [
                { value: "grassroots", text: "Grassroots / Recreational" },
                { value: "youth_academy", text: "Youth Academy" },
                { value: "school_college", text: "School / College Team" },
                { value: "semi_pro", text: "Semi-Professional" },
                { value: "professional", text: "Professional" },
                { value: "aspiring", text: "Aspiring to Play Higher Level" }
            ]
        }
    ]
};

// Export for use in the quiz system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quizData;
}
