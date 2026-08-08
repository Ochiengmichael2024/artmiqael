import React from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

export function ProfileTab() {
  const { user } = useAuth();
  const { pushToast } = useToast();

  return (
    <Card raised className="p-6.5">
      <div className="heading-serif text-xl mb-4.5">Profile</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full name" defaultValue={user?.name} />
        <Input label="Email" defaultValue={user?.email} />
      </div>
      <Button className="mt-4.5" onClick={() => pushToast("Profile updated")}>
        Save changes
      </Button>
    </Card>
  );
}
