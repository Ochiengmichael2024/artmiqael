import React, { useCallback, useEffect, useRef, useState } from "react";
import { Truck, PackageCheck, ShieldCheck, Volume2, Square } from "lucide-react";
import type { Artwork, Artist, Review } from "@/types";
import { Tabs } from "@/components/ui/Tabs";
import { StarRating } from "@/components/ui/StarRating";
import { IconBox } from "@/components/ui/IconBox";
import { Button } from "@/components/ui/Button";

// Speech settings (1 = normal speed / pitch)
const SPEECH_RATE = 0.85; // slower, more relaxed pace
const SPEECH_PITCH = 1.1; // slightly higher, softer tone

// Browsers don't expose a "gender" field, so we match common female voice names.
const FEMININE_VOICE_HINTS = [
  "female", "samantha", "victoria", "karen", "moira", "tessa", "fiona",
  "zira", "aria", "jenny", "hazel", "susan", "libby", "sonia", "natasha",
  "google us english", "google uk english female",
];

function pickFeminineVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const prefix = lang.split("-")[0].toLowerCase();
  const sameLanguage = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  const pool = sameLanguage.length ? sameLanguage : voices;
  return pool.find((v) => FEMININE_VOICE_HINTS.some((hint) => v.name.toLowerCase().includes(hint))) ?? null;
}

function DescriptionPanel({ artwork, artist }: { artwork: Artwork; artist: Artist }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const startDescriptionSpeech = useCallback(() => {
    setIsSpeaking(false);
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setSpeechError("Text-to-speech is not supported by this browser.");
      return;
    }

    setSpeechError("");
    const utterance = new SpeechSynthesisUtterance(artwork.description);
    utterance.rate = SPEECH_RATE;
    utterance.pitch = SPEECH_PITCH;
    utterance.lang = navigator.language;

    const voice = pickFeminineVoice(navigator.language);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.onend = () => {
      utteranceRef.current = null;
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      utteranceRef.current = null;
      setIsSpeaking(false);
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setSpeechError("Unable to play the description. Please try again.");
      }
    };
    utteranceRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [artwork.description]);

  useEffect(() => {
    let started = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const begin = () => {
      if (started) return;
      started = true;
      startDescriptionSpeech();
    };

    if (!("speechSynthesis" in window) || window.speechSynthesis.getVoices().length > 0) {
      begin();
    } else {
      // Voices often load a moment after the page does, so wait for them.
      window.speechSynthesis.addEventListener("voiceschanged", begin, { once: true });
      timer = setTimeout(begin, 500); // fallback if the event never fires
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.speechSynthesis?.removeEventListener?.("voiceschanged", begin);
      const utterance = utteranceRef.current;
      if (utterance) {
        utterance.onend = null;
        utterance.onerror = null;
        utteranceRef.current = null;
        window.speechSynthesis?.cancel();
      }
    };
  }, [startDescriptionSpeech]);

  function toggleDescriptionSpeech() {
    if (isSpeaking) {
      const utterance = utteranceRef.current;
      if (utterance) {
        utterance.onend = null;
        utterance.onerror = null;
        utteranceRef.current = null;
      }
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    startDescriptionSpeech();
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Button type="button" variant="secondary" size="sm" onClick={toggleDescriptionSpeech} aria-pressed={isSpeaking}>
          {isSpeaking ? <Square size={14} /> : <Volume2 size={15} />}
          {isSpeaking ? "Stop reading" : "Listen to description"}
        </Button>
        <span className="text-xs text-ink-faint">Description starts reading automatically using your browser’s voice.</span>
      </div>
      {speechError && <p className="mb-3 text-sm text-danger" role="status">{speechError}</p>}
      <p className="text-[14.5px] leading-[1.8] text-ink-soft mb-4">{artwork.description}</p>
      <p className="text-[14.5px] leading-[1.8] text-ink-soft">{artist.bio}</p>
    </div>
  );
}

export function ProductTabs({ artwork, artist, reviews }: { artwork: Artwork; artist: Artist; reviews: Review[] }) {
  return (
    <Tabs
      defaultKey="description"
      items={[
        {
          key: "description",
          label: "Description",
          content: <DescriptionPanel artwork={artwork} artist={artist} />,
        },
        {
          key: "shipping",
          label: "Shipping & materials",
          content: (
            <div className="grid gap-4">
              <div className="flex flex-wrap gap-3">
                <IconBox size={36} icon={<Truck size={17} />} />
                <div>
                  <strong className="text-sm">Dimensions &amp; materials</strong>
                  <p className="text-[13.5px] text-ink-soft mt-1">
                    {artwork.dims}, {artwork.medium}. Ships rolled or stretched depending on size — full packaging details are confirmed at checkout.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <IconBox size={36} icon={<PackageCheck size={17} />} />
                <div>
                  <strong className="text-sm">Availability</strong>
                  <p className="text-[13.5px] text-ink-soft mt-1">
                    {artwork.availability === "ready" ? "In stock and ready to ship within 2 business days." : "Made to order — allow 3–5 weeks before dispatch."}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <IconBox size={36} icon={<ShieldCheck size={17} />} />
                <div>
                  <strong className="text-sm">Authenticity</strong>
                  <p className="text-[13.5px] text-ink-soft mt-1">Ships with a signed certificate of authenticity from {artist.name}.</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          key: "reviews",
          label: `Reviews (${reviews.length})`,
          content: (
            <div className="grid gap-4">
              {reviews.map((r, i) => (
                <div key={i} className={i < reviews.length - 1 ? "pb-4 border-b border-line" : ""}>
                  <div className="flex justify-between mb-1.5">
                    <strong className="text-[13.5px]">{r.name}</strong>
                    <StarRating rating={5} size={12} />
                  </div>
                  <p className="text-[13.5px] text-ink-soft leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}