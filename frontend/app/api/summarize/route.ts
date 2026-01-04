import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages: string[] = body.messages;

        if (!messages || messages.length === 0) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            );
        }

        // Join chat messages
        const chatText = messages.join("\n");

        const ollamaRes = await fetch(
            "http://localhost:11434/api/generate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "codellama:7b-instruct",
                    prompt: `
Summarize the following student-mentor chat.
Use bullet points.
Do not include code.

Chat:
${chatText}
          `,
                    stream: false,
                }),
            }
        );

        const data = await ollamaRes.json();

        return NextResponse.json({
            summary: data.response,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to generate summary" },
            { status: 500 }
        );
    }
}
