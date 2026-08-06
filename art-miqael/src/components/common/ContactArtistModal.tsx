import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { IconBox } from "@/components/ui/IconBox";
import { useUI } from "@/hooks/useUI";
import { useToast } from "@/hooks/useToast";

export function ContactArtistModal() {
  const { contactArtistTarget, closeContactArtist } = useUI();
  const { pushToast } = useToast();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (contactArtistTarget) {
      setMessage("");
      setSent(false);
    }
  }, [contactArtistTarget]);

  return (
    <Modal open={!!contactArtistTarget} onClose={closeContactArtist} maxWidth={440} labelledBy="contact-artist-title" className="p-7">
      {contactArtistTarget && (
        <>
          <h3 id="contact-artist-title" className="font-serif text-[22px] mb-3.5 pr-8">
            Message {contactArtistTarget.name}
          </h3>
          {sent ? (
            <div className="text-center py-5">
              <IconBox icon={<Check size={20} />} tone="sage" size={46} className="mx-auto mb-3.5" />
              <p className="text-sm">Message sent to {contactArtistTarget.name}. They typically reply within 2 business days.</p>
              <Button variant="secondary" className="mt-4" onClick={closeContactArtist}>
                Close
              </Button>
            </div>
          ) : (
            <>
              <p className="text-[13px] text-ink-soft mb-3.5">Ask about a piece, availability, or a custom idea — this demo simulates delivery.</p>
              <TextArea rows={4} placeholder="Write your message…" value={message} onChange={(e) => setMessage(e.target.value)} />
              <Button
                block
                className="mt-3.5"
                disabled={!message.trim()}
                onClick={() => {
                  setSent(true);
                  pushToast(`Message sent to ${contactArtistTarget.name}`);
                }}
              >
                Send message
              </Button>
            </>
          )}
        </>
      )}
    </Modal>
  );
}
