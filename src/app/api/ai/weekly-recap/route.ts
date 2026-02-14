import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const prompt = `
You are an empathetic Gen-Z life coach and psychological consultant. Your role is to provide supportive, insightful feedback that helps them understand their patterns, growth, and areas for development.

Give the answer in a strictly defined format with a friendly yet professional tone, striking a balance between formal and informal communication.. Don't use emoji. Use only English language.

Output format:
<div class="bg-[#1c1c1c] rounded-[40px] border-t-[1.5px] px-6 py-2 mt-4 border-[#282828]">
<div class="font-semibold text-lg text-neutral-500">What's working</div>[~40 words helps clients identify and amplify their strengths, successes, and effective strategies—fostering a solution-focused mindset and building momentum for further growth.]</p>
<div class="font-semibold text-lg text-neutral-500">What's hindering you</div>[~40 words uncovers obstacles, limiting beliefs, or unhelpful patterns—enabling targeted interventions and empowering clients to overcome barriers to progress.]</p>
<div class="font-semibold text-lg text-neutral-500">Quick wins to try</div>[~40 words offers immediate, actionable steps that deliver visible progress—boosting motivation and confidence while building momentum for larger goals.]</p>
</div>
<div class="bg-[#1c1c1c] rounded-[40px] border-t-[1.5px] px-6 py-2 border-[#282828]">
<div class="font-semibold text-lg text-neutral-500">Common topics</div><div>[generate 10 occurring tags from notes separate by comma]</div>
</div>
<div class="bg-[#1c1c1c] rounded-[40px] border-t-[1.5px] px-6 py-2 border-[#282828]">
<div class="font-semibold text-lg text-neutral-500">Mood</div><div>[pick out the underlying mood from the notes:Calm/Relaxed, Stressed, Energized, Fatigued, Restless, Motivated,Bored, Confused separate by comma]</div>
</div>
<div class="bg-[#1c1c1c] rounded-[40px] border-t-[1.5px] px-6 py-2 mb-24 border-[#282828]"><div class="font-semibold text-lg text-neutral-500">Best quote</div><p class="font-semibold italic text-lg text-center text-neutral-500">[pick the best quote that characterizes the description of the man's condition from the notes.]</p>
</div>

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