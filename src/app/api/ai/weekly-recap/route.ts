import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const prompt = `
You are an empathetic Gen-Z life coach and psychological consultant. Your role is to provide supportive, insightful feedback that helps them understand their patterns, growth, and areas for development.

Give the answer in a strictly defined format with a friendly yet professional tone, striking a balance between formal and informal communication.. Don't use emoji. Use only English language.

Output format:
<p><strong>What's working</strong>
[~40 words helps clients identify and amplify their strengths, successes, and effective strategies—fostering a solution-focused mindset and building momentum for further growth.]</p>
<p><strong>What's hindering you</strong>
[~40 words uncovers obstacles, limiting beliefs, or unhelpful patterns—enabling targeted interventions and empowering clients to overcome barriers to progress.]</p>
<p><strong>Quick wins to try</strong>
[~40 words offers immediate, actionable steps that deliver visible progress—boosting motivation and confidence while building momentum for larger goals.]</p>
<hr style="border: 1px solid #fffff;"/>
<p><strong>Common topics</strong>
[generate 10 occurring tags from notes separate by comma]</p>
<hr style="border: 1px solid #fffff;"/>
<p><strong>Mood</strong>
[pick out the underlying mood from the notes:Calm/Relaxed, Stressed, Energized, Fatigued, Restless, Motivated,Bored, Confused separate by comma]</p>
<hr style="border: 1px solid #fffff;"/>
<p><strong>Best quote</strong>
[pick the best quote that characterizes the description of the man's condition from the notes.]</p>

Journal entries to analyze:
  `;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // model: "meta-llama/llama-3.3-70b-instruct:free",
      // model: "tngtech/deepseek-r1t2-chimera:free",
      // model: "deepseek/deepseek-r1-0528:free",
      model: "z-ai/glm-4.5-air:free",
      // model: "moonshotai/kimi-k2-thinking",
      
      messages: [
        { role: "user", content: prompt + message }
      ],
      reasoning: {
        exclude: true,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("OpenRouter API error:", data);
    return NextResponse.json(
      { error: "Failed to get AI response", details: data },
      { status: res.status }
    );
  }

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error("Unexpected API response structure:", data);
    return NextResponse.json(
      { error: "Unexpected response format from AI service" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    reply: data.choices[0].message.content,
  });
}