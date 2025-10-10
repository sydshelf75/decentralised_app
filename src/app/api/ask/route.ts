import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try {
        const { question } = await req.json();

        if (!question || question.trim() === "") {
            return new Response(JSON.stringify({ error: "Question is required" }), { status: 400 });
        }

        const ai = new GoogleGenAI({ apiKey: "AIzaSyCXxYDV8ZDQVgyHnYwyi65cPEnq5efiUcU" });

        const response = await ai.models.generateContentStream({
            model: "gemini-2.0-flash",
            // contents: "Write a story about a magic backpack.",
            contents: question
        });
        let text = "";
        for await (const chunk of response) {
            console.log(chunk.text);
            text += chunk.text;
        }

        return new Response(JSON.stringify({ text }), { status: 200 });
    } catch (error: any) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}