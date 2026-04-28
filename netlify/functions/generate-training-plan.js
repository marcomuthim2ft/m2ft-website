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

FORMAT REQUIREMENTS:
- **2-week progressive program** with clear weekly objectives
- **${training_days_per_week} training days per week** schedule
- **Session breakdowns**: Warm-up, Main Drills (with sets/reps/durations), Cool-down
- **Position-specific exercises** for ${position} players based on Hughes KPIs
- **Archetype-specific tips** for ${archetype} players
- **Drill names**: Use specific, recognizable drill names (e.g., "Rondo 4v2", "Brazilian Passing Square")
- **Progressive overload**: Clear progression markers week-by-week
- **Recovery protocols**: Age-appropriate rest, nutrition, sleep guidance for ${age}-year-olds
- **Progress tracking**: Measurable KPIs to test weekly
- **Weak KPI focus**: ${weakKPIs.length > 0 ? `Prioritize improving ${weakKPIs.join(', ')}` : 'Maintain strengths and develop all-round game'}

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
1. **Address their goals**: ${training_goals && training_goals.length > 0 ? training_goals.join(', ') : 'Overall development'}
2. **Use their equipment**: ${equipment_access && equipment_access.length > 0 ? equipment_access.join(', ') : 'Minimal equipment'}
3. **Target weak KPIs**: ${weakKPIs.length > 0 ? `Dedicate 60% of training to ${weakKPIs.slice(0, 3).join(', ')}` : 'Maintain current standards'}
4. **Include numbers**: Exact sets, reps, rest times, distances
5. **Coaching cues**: 2-3 key technical points per drill
6. **Motivation**: Write as if speaking directly to ${name}, age ${age}

OUTPUT LENGTH: 2000-3000 words (detailed, professional, actionable)

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
      max_tokens: 2000
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
