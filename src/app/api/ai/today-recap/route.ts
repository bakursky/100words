import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const prompt = `
You are an empathetic Gen-Z life coach and psychological consultant. Your role is to provide supportive, insightful feedback that helps them understand their patterns, growth, and areas for development.

Give the answer in a strictly defined format with a friendly yet professional tone, striking a balance between formal and informal communication.. Don't use emoji. Output format:

<p><strong>✦ Quick summary</strong>
[~25 words summarizing the user’s key feelings with emoji or events, using empathetic language]</p>
<p><strong>✦ Insights</strong>
[~25 words offering a supportive or reflective insight, as if from a coach or consultant]</p>
<p><strong>✦ Suggestion</strong>
[~25 words encouraging self-compassion, growth, or a gentle call to action]</p>
<hr style="border: 1px solid #c084fc;"/>
<p><strong>Question for you: [generate a helpful reflection question based on the entries]</strong></p>

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
      model: "z-ai/glm-4.5-air:free",
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