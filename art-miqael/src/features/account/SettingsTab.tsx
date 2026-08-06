import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";

export function SettingsTab() {
  const { pushToast } = useToast();
  return (
    <Card raised className="p-6.5">
      <div className="heading-serif text-xl mb-3.5">Settings</div>
      <label className="checkbox-row">
        <input type="checkbox" className="checkbox" defaultChecked /> Email me about order updates
      </label>
      <label className="checkbox-row">
        <input type="checkbox" className="checkbox" defaultChecked /> Email me new artist drops
      </label>
      <label className="checkbox-row">
        <input type="checkbox" className="checkbox" /> SMS delivery notifications
      </label>
      <Button className="mt-4" onClick={() => pushToast("Preferences saved")}>
        Save preferences
      </Button>
    </Card>
  );
}
