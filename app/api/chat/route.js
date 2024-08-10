

import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import {OpenAI} from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt =`Welcome to HeadstartAI Support! I'm here to assist you with any questions or issues related to our AI-powered interview platform for software engineering jobs.

How can I assist you today?

Account Assistance: Need help with account setup, login issues, or profile management?
Interview Process: Have questions about how to use the platform, schedule interviews, or understand the AI-powered interview process?
Technical Support: Encountering technical problems with the platform or need help with system requirements?
General Inquiries: Looking for information about our services, pricing, or company policies?
Please let me know your specific issue or question, and I'll do my best to assist you!`; // Use your own system prompt here

// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-4o', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}

