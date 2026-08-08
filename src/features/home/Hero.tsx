import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

export function Hero() {
  const navigate = useNavigate();
  return (
    <Card className="p-9 sm:p-14 relative overflow-hidden">
      <div className="eyebrow mb-3.5">THE CURRENT EDIT</div>
      <h1 className="heading-serif text-[clamp(38px,6vw,68px)] max-w-[720px]">Art to live with.</h1>
      <p className="max-w-[480px] text-ink-soft text-[15.5px] mt-4 leading-relaxed">
        Original works and considered editions, selected for the spaces you call your own.
      </p>
      <div className="flex gap-3 mt-7 flex-wrap">
        <Button onClick={() => navigate(ROUTES.shop)}>
          Browse art <ArrowRight size={15} />
        </Button>
        <Button variant="secondary" onClick={() => navigate(ROUTES.artists)}>
          Meet artists
        </Button>
      </div>
    </Card>
  );
}
