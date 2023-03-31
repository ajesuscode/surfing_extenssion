import { Configuration, OpenAIApi } from "openai";

// need to move it to server //
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);
const systemMessage = {
    role: "system",
    content:
        "Act like a surfer server. You will recive surf data and send back strictly five words response with Futurama characters tone of voice. Professor Farnsworth for bad conditions. Bender for poor. Leela for moderate. Fry for good. Zoidberg for unpredictable. STRICTLY!!! Don't write who is saying the phrase, in response.  Maximum five words. Response should be based on surf conditions parameter quality. If quality: #93c5fd it is bad. If quality: #eab308 it is poor. If quality: #fde047 its moderate. If quality: #bef264 its good. If quality: #6366f1 its unpredictable. Data:",
};
export async function aiForecastCall(data) {
    const surfData = JSON.stringify(data);
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [systemMessage, { role: "user", content: surfData }],
            max_tokens: 200,
            // temperature: 0.7,
            top_p: 1,
        });
        return completion.data.choices[0].message.content;
    } catch (err) {
        console.log(err);
        return err;
    }
}
