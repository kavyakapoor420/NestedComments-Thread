// This is PSEUDOCODE for a backend server (e.g., Node.js with Express and WebSockets)
// You'll need to install necessary packages: npm install express ws form-data node-fetch

const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const FormData = require('form-data');
const fetch = require('node-fetch'); // For making HTTP requests to Sarvam AI
const cors=require('cors')

const app = express();
app.use(cors())
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const SARVAM_API_KEY = process.env.SARVAM_API_KEY || 'sk_6eh4v4bl_qKbmQnqSO7wsTwZpMDkJy1Nv'

if (!SARVAM_API_KEY || SARVAM_API_KEY === 'YOUR_SARVAM_API_KEY') {
    console.warn("WARNING: SARVAM_API_KEY not set. Please set it as an environment variable or replace 'YOUR_SARVAM_API_KEY'.");
}

wss.on('connection', ws => {
    console.log('Client connected via WebSocket');

    let accumulatedTranslatedText = ''; // To build up the full translated text

    ws.on('message', async message => {
        // Assuming 'message' is an audio chunk (Blob) from the client
        if (typeof message === 'object' && message instanceof Buffer) {
            console.log('Received audio chunk from client');

            try {
                // --- Step 1: Speech-to-Text for the chunk ---
                const sttResult = await speechToTextSarvam(message);
                const transcribedText = sttResult.transcript;
                console.log('Transcribed chunk:', transcribedText);

                if (transcribedText) {
                    // --- Step 2: Translate the transcribed chunk (e.g., to English) ---
                    // Replace with your translation logic. Sarvam.ai might offer NMT soon.
                    // For now, let's assume a dummy translation or another API if needed.
                    const translatedChunk = await translateText(transcribedText, 'en-IN', 'hi-IN'); // Source: Hindi, Target: English
                    console.log('Translated chunk:', translatedChunk);

                    accumulatedTranslatedText += (translatedChunk + ' '); // Accumulate translated text

                    // You might have logic here to check if accumulatedTranslatedText forms a complete sentence
                    // and then send that sentence for TTS to avoid very short TTS responses.
                    // For simplicity, let's just trigger TTS after a certain amount of text or on final message.

                    // --- Step 3: Text-to-Speech for the accumulated translated text ---
                    // This is where you need to be careful: If you TTS after every chunk,
                    // it will sound choppy. You need to decide when to trigger TTS.
                    // A simple approach is to trigger it when a certain amount of translated text accumulates
                    // or when the client signals end of speech.
                    // For a more robust solution, look into VAD (Voice Activity Detection) or sentence boundary detection.

                }
            } catch (error) {
                console.error('Error processing audio chunk:', error);
                ws.send(JSON.stringify({ type: 'error', message: 'Error processing audio on server.' }));
            }
        } else if (typeof message === 'string' && message === 'END_OF_SPEECH') {
            console.log('End of speech signaled by client. Finalizing TTS.');
            if (accumulatedTranslatedText.trim()) {
                try {
                    const audioData = await textToSpeechSarvam(accumulatedTranslatedText.trim(), 'en-IN', 'anushka'); // Target language & speaker
                    ws.send(JSON.stringify({ type: 'finalAudio', audio: audioData }));
                    accumulatedTranslatedText = ''; // Reset for next interaction
                } catch (ttsError) {
                    console.error('Error in final TTS:', ttsError);
                    ws.send(JSON.stringify({ type: 'error', message: 'Error synthesizing final response.' }));
                }
            }
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', error => {
        console.error('WebSocket error:', error);
    });
});

// Sarvam AI Speech-to-Text function (backend)
async function speechToTextSarvam(audioBuffer) {
    const formData = new FormData();
    formData.append('file', audioBuffer, {
        filename: 'audio.wav',
        contentType: 'audio/wav'
    });
    formData.append('model', 'saarika:v2.5');
    formData.append('language_code', 'unknown'); // Auto-detect

    const response = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
            'api-subscription-key': SARVAM_API_KEY,
            ...formData.getHeaders() // Important for FormData
        },
        body: formData
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Sarvam STT API error ${response.status}: ${errorText}`);
    }

    return await response.json();
}

// Dummy Translation Function (Replace with actual NMT API if Sarvam.ai offers, or another provider)
async function translateText(text, sourceLang, targetLang) {
    // For a real application, integrate with a powerful NMT service like:
    // Google Cloud Translation: https://cloud.google.com/translate/docs/reference/rest/v2/translations/translate
    // Azure Translator: https://learn.microsoft.com/en-us/azure/ai-services/translator/reference/rest-api-guide

    // This is a placeholder for demonstration purposes.
    console.log(`Simulating translation from ${sourceLang} to ${targetLang}: "${text}"`);
    // In a real scenario, you'd make an API call here.
    return `[Translated ${text}]`; // Return translated text
}

// Sarvam AI Text-to-Speech function (backend)
async function textToSpeechSarvam(text, targetLanguageCode, speaker) {
    const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
            'api-subscription-key': SARVAM_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text.substring(0, 500), // Respect API limits
            target_language_code: targetLanguageCode,
            speaker: speaker,
            model: 'bulbul:v2',
            enable_preprocessing: true,
            speech_sample_rate: 22050
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Sarvam TTS API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.audios[0]; // Base64 encoded audio
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});