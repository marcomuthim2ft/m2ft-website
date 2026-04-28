const https = require('https');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const {
      name,
      email,
      age,
      position,
      archetype,
      playing_level,
      training_days_per_week,
      training_goals,
      equipment_access,
      scores,
      position_kpis
    } = data;

    // Build position-specific KPI section
    let positionKPIsSection = '';
    
    if (position_kpis && Object.keys(position_kpis).length > 0) {
      positionKPIsSection = `\nPOSITION-SPECIFIC KPIs (${position} - Hughes 2012 Framework):`;
      
      if (position === 'Striker') {
        positionKPIsSection += `
  • Finishing Accuracy: ${position_kpis.finishing || 'N/A'}/10
  • Aerial Ability: ${position_kpis.aerial || 'N/A'}/10
  • Movement Off Ball: ${position_kpis.movement || 'N/A'}/10
  • Link-Up Play: ${position_kpis.linkup || 'N/A'}/10
  • Hold-Up Play: ${position_kpis.holdup || 'N/A'}/10
  • Composure in Front of Goal: ${position_kpis.composure || 'N/A'}/10`;
      } else if (position === 'Midfielder') {
        positionKPIsSection += `
  • Passing Under Pressure: ${position_kpis.passing_pressure || 'N/A'}/10
  • Tempo Control: ${position_kpis.tempo_control || 'N/A'}/10
  • Defensive Work Rate: ${position_kpis.defensive_work || 'N/A'}/10
  • Progressive Passes: ${position_kpis.progressive_passes || 'N/A'}/10
  • Positioning to Receive: ${position_kpis.positioning || 'N/A'}/10
  • Covering Ground & Pressing: ${position_kpis.covering_ground || 'N/A'}/10`;
      } else if (position === 'Defender') {
        positionKPIsSection += `
  • Tackling Success: ${position_kpis.tackling || 'N/A'}/10
  • Aerial Defending: ${position_kpis.aerial_defending || 'N/A'}/10
  • Defensive Positioning: ${position_kpis.positioning_defending || 'N/A'}/10
  • 1v1 Defending: ${position_kpis.one_v_one || 'N/A'}/10
  • Interceptions & Reading the Game: ${position_kpis.interceptions || 'N/A'}/10
  • Defensive Communication: ${position_kpis.defensive_communication || 'N/A'}/10`;
      } else if (position === 'Winger') {
        positionKPIsSection += `
  • 1v1 Dribbling: ${position_kpis.dribbling_one_v_one || 'N/A'}/10
  • Crossing Accuracy: ${position_kpis.crossing || 'N/A'}/10
  • Cutting Inside & Shooting: ${position_kpis.cut_inside || 'N/A'}/10
  • Pace in Wide Areas: ${position_kpis.pace_wide || 'N/A'}/10
  • Stamina (Up & Down Wing): ${position_kpis.stamina_wing || 'N/A'}/10
  • Defensive Tracking Back: ${position_kpis.tracking_back || 'N/A'}/10`;
      } else if (position === 'Goalkeeper') {
        positionKPIsSection += `
  • Shot-Stopping: ${position_kpis.shot_stopping || 'N/A'}/10
  • Distribution Accuracy: ${position_kpis.distribution || 'N/A'}/10
  • Command of Box: ${position_kpis.box_command || 'N/A'}/10
  • 1v1 vs Strikers: ${position_kpis.one_v_one_gk || 'N/A'}/10
  • Reflexes & Reactions: ${position_kpis.reflexes || 'N/A'}/10
  • Positioning & Angles: ${position_kpis.gk_positioning || 'N/A'}/10`;
      }
    }

    // Build equipment access section
    const equipmentSection = equipment_access && equipment_access.length > 0 
      ? `\nEQUIPMENT ACCESS:\n${equipment_access.map(eq => `  • ${eq}`).join('\n')}`
      : '';

    // Identify weak KPIs (below 6/10)
    let weakKPIs = [];
    if (position_kpis) {
      Object.entries(position_kpis).forEach(([kpi, score]) => {
        if (score < 6) {
          weakKPIs.push(kpi);
        }
      });
    }

    const weakKPIsSection = weakKPIs.length > 0 
      ? `\nPRIORITY DEVELOPMENT AREAS:\n${weakKPIs.map(kpi => `  • ${kpi.replace(/_/g, ' ')} (${position_kpis[kpi]}/10 - NEEDS IMPROVEMENT)`).join('\n')}`
      : '';

    // Construct the enhanced prompt
    const prompt = `You are Marco Muthi, MSc Performance Football Coach with experience at Chelsea FC Foundation, Aldershot Town, and LionHeart Football. You specialize in evidence-based training using the Hughes (2012) KPI framework for position-specific development.

Create a detailed, professional 2-week training plan for:

PLAYER PROFILE:
- Name: ${name}
- Age: ${age} years old
- Position: ${position}
- Player Type (Archetype): ${archetype}
- Playing Level: ${playing_level}
- Training Availability: ${training_days_per_week} days per week
- Main Goals: ${training_goals && training_goals.length > 0 ? training_goals.join(', ') : 'Overall development'}

OVERALL SCORES (M2FT Assessment):
  • Technical: ${scores.technical}/100
  • Tactical: ${scores.tactical}/100
  • Physical: ${scores.physical}/100
  • Mental: ${scores.mental}/100
${positionKPIsSection}
${weakKPIsSection}
${equipmentSection}

COACHING PHILOSOPHY:
Apply these MSc-level principles:
1. **Hughes (2012) KPI Framework**: Focus on position-specific metrics that predict performance
2. **Science-backed periodization**: Foundation → Skill Development → Integration → Application
3. **Deliberate practice**: Target weaknesses (especially KPIs below 6/10) with 60% of training time
4. **Individual adaptation**: Tailor to ${archetype} archetype and ${position} position demands
5. **Age-appropriate loading**: Design for ${age}-year-old physical and cognitive development
6. **Progressive overload**: Increase intensity/complexity weekly by 10-15%
7. **Equipment-based**: Only use available equipment: ${equipment_access && equipment_access.length > 0 ? equipment_access.join(', ') : 'Basic equipment'}

FORMAT REQUIREMENTS - CRITICAL:
This must be a DRILL-BY-DRILL training plan with step-by-step instructions for each session.

For EACH training day, provide:
1. **Warm-Up Drills** (10-15 min)
   - Drill name
   - Equipment needed
   - Step-by-step setup instructions
   - How to perform it
   - Coaching points
   
2. **Main Technical Drills** (30-40 min)
   - 3-4 specific drills per session
   - For EACH drill include:
     * Drill Name (e.g., "Finisher's Touch", "Triangle Passing Progression")
     * Setup: Exact cone/marker placement, distances, equipment
     * Instructions: Step 1, Step 2, Step 3 (how to do it)
     * Sets x Reps x Duration (e.g., "3 sets x 8 reps, 90 sec rest")
     * Coaching Cues: 2-3 technical points to focus on
     * Progressions: How to make it harder as they improve
     
3. **Cool-Down** (5-10 min)
   - Specific stretches/recovery drills
   
EXAMPLE FORMAT:
**DAY 1 - FINISHING DEVELOPMENT**

WARM-UP (12 min):
Drill 1: Dynamic Movement Circuit
- Setup: Place 5 cones in a line, 5 yards apart
- Instructions:
  1. High knees through cones (there and back)
  2. Butt kicks through cones
  3. Side shuffles (both directions)
- Duration: 2 rounds, 60 sec rest between
- Coaching Cues: Stay on toes, arms pumping

MAIN DRILLS (35 min):
Drill 1: One-Touch Finishing
- Setup: 6 cones in semi-circle 12 yards from goal, partner at each cone with ball
- Instructions:
  1. Start at center cone
  2. Sprint to cone 1, receive pass, one-touch finish
  3. Return to center, repeat at each cone
- Sets/Reps: 3 sets x 6 shots (1 at each cone), 2 min rest
- Coaching Cues: Plant foot beside ball, strike through center, follow through to target
- Progression: Increase distance to 15 yards, add goalkeeper

**CRUCIAL**: Every single drill must have this level of detail. ${training_days_per_week} days per week for 2 weeks = ${training_days_per_week * 2} total sessions. Write out EVERY drill for EVERY session.

WEEKLY STRUCTURE:
**Week 1: Foundation & KPI Assessment**
- Objective: Establish baseline, build movement quality, introduce position-specific drills
- Focus: ${weakKPIs.length > 0 ? `Begin addressing ${weakKPIs[0]}` : 'Technical fundamentals'}
- Load: 60-75% intensity

**Week 2: Integration & Game Application**
- Objective: Apply skills in match-realistic scenarios, develop weak KPIs, test improvements
- Focus: ${weakKPIs.length > 0 ? `Target ${weakKPIs.slice(0, 2).join(' and ')}` : 'Position-specific skills in game situations'}
- Load: 75-90% intensity (with taper before match)

SPECIFIC INSTRUCTIONS:
1. **NO theory or philosophy** - only drills and instructions
2. **Address their goals**: ${training_goals && training_goals.length > 0 ? training_goals.join(', ') : 'Overall development'}
3. **Target weak KPIs**: ${weakKPIs.length > 0 ? `60% of drills focus on ${weakKPIs.slice(0, 3).join(', ')}` : 'All-round development'}
4. **Use only**: Ball, cones/markers (assume basic equipment available)
5. **Age-appropriate**: Drills suitable for ${age}-year-old
6. **Position-specific**: Every drill tailored for ${position} players

OUTPUT LENGTH: 3000-4000 words (highly detailed drill instructions)
OUTPUT STYLE: Instructional manual, not a philosophy document

Make this feel like a **£100 personalized 2-week plan** from an MSc-qualified coach. Be specific, evidence-based, and motivating!`;

    // Call OpenAI API
    const openAIResponse = await callOpenAI(prompt);

    // Format the response as a training plan
    const trainingPlan = {
      player_name: name,
      email: email,
      age: age,
      position: position,
      archetype: archetype,
      playing_level: playing_level,
      training_days: training_days_per_week,
      goals: training_goals,
      equipment: equipment_access,
      scores: scores,
      position_kpis: position_kpis,
      plan_content: openAIResponse,
      generated_date: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Training plan generated successfully',
        plan: trainingPlan
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to generate training plan',
        details: error.message
      })
    };
  }
};

function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      reject(new Error('OpenAI API key not configured'));
      return;
    }

    const postData = JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are Marco Muthi, an MSc-qualified Performance Football Coach specializing in position-specific development using the Hughes (2012) KPI framework. Create detailed, professional, evidence-based training plans.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.choices && response.choices[0]) {
            resolve(response.choices[0].message.content);
          } else {
            reject(new Error('Invalid OpenAI response'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}
