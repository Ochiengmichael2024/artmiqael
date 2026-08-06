import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Container className="pt-16">
      <EmptyState
        icon={Compass}
        title="Page not found"
        body="The page you're looking for doesn't exist or may have moved."
        action={<Button onClick={() => navigate(ROUTES.home)}>Back to home</Button>}
      />
    </Container>
  );
}
