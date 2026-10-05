import React, { useCallback, useEffect, useRef, useState } from "react";
import { Truck, PackageCheck, ShieldCheck, Volume2, Square } from "lucide-react";
import type { Artwork, Artist, Review } from "@/types";
import { Tabs } from "@/components/ui/Tabs";
import { StarRating } from "@/components/ui/StarRating";
import { IconBox } from "@/components/ui/IconBox";
import { Button } from "@/components/ui/Button";

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
    utterance.lang = navigator.language;
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
    startDescriptionSpeech();
    return () => {
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
