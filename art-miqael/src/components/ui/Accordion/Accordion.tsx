import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";

export interface AccordionItem {
  key: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenKey?: string | null;
}

export function Accordion({ items, defaultOpenKey = null }: AccordionProps) {
  const [openKey, setOpenKey] = useState<string | null>(defaultOpenKey);

  return (
    <div>
      {items.map((item) => {
        const isOpen = openKey === item.key;
        return (
          <Card key={item.key} className="mb-2.5 overflow-hidden">
            <button
              onClick={() => setOpenKey(isOpen ? null : item.key)}
              className="w-full flex justify-between items-center px-[18px] py-4 bg-transparent text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold">{item.question}</span>
              <ChevronDown size={16} className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="px-[18px] pb-4">
                <p className="text-[13.5px] text-ink-soft leading-relaxed">{item.answer}</p>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
