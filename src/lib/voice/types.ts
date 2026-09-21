/**
 * Speech-to-Text (STT) Provider Abstraction
 */

export interface TranscriptionRequest {
  audioBlob?: Blob;
  mimeType?: string;
  sampleRate?: number;
  language?: string; // e.g. "en-IN", "hi-IN"
}

export interface TranscriptionResult {
  transcript: string;
  confidence: number;
  words?: Array<{ word: string; start: number; end: number }>;
  durationSeconds?: number;
}

export interface VoiceSTTProvider {
  name: string;
  startStreaming?(onChunk: (text: string) => void): Promise<void>;
  stopStreaming?(): Promise<void>;
  transcribeAudio(request: TranscriptionRequest): Promise<TranscriptionResult>;
}

