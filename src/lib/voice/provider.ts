import { VoiceSTTProvider, TranscriptionRequest, TranscriptionResult } from "./types";

export class BrowserSpeechProvider implements VoiceSTTProvider {
  name = "Browser-WebSpeech-API";

  async transcribeAudio(request: TranscriptionRequest): Promise<TranscriptionResult> {
    return {
      transcript: "",
      confidence: 1.0,
      durationSeconds: 0,
    };
  }
}

