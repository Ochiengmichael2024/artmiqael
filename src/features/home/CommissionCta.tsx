import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

export function CommissionCta() {
  const navigate = useNavigate();
  return (
    <Card className="p-8 sm:p-11 flex justify-between items-center gap-6 flex-wrap">
      <div>
        <div className="heading-serif text-2xl mb-2">Have a space in mind?</div>
        <p className="text-ink-soft text-sm max-w-[420px]">Commission an original piece built for your exact wall, palette and budget.</p>
      </div>
      <Button onClick={() => navigate(ROUTES.customArtwork)}>
        Start a commission 
      </Button>
    </Card>
  );
}
