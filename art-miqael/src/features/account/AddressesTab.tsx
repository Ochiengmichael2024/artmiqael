import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Address } from "@/types";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const EMPTY: Address = { label: "", address: "", city: "", country: "", zip: "" };

export function AddressesTab() {
  const { addresses, addAddress, removeAddress } = useAuth();
  const [draft, setDraft] = useState<Address>(EMPTY);

  return (
    <div>
      <div className="grid gap-3 mb-5">
        {addresses.map((a, i) => (
          <Card key={i} className="p-4 flex justify-between items-center">
            <div>
              <strong className="text-sm">{a.label || `Address ${i + 1}`}</strong>
              <div className="text-[13px] text-ink-soft">
                {a.address}, {a.city}, {a.country} {a.zip}
              </div>
            </div>
            <Button variant="danger" size="sm" onClick={() => removeAddress(i)}>
              <Trash2 size={13} />
            </Button>
          </Card>
        ))}
        {addresses.length === 0 && <p className="text-[13.5px] text-ink-soft">No saved addresses yet.</p>}
      </div>
      <Card raised className="p-5">
        <div className="heading-serif text-[17px] mb-3.5">Add a new address</div>
        <div className="grid gap-3">
          <Input label="Label (e.g. Home)" value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
          <Input label="Street address" value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="City" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
            <Input label="Country" value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value })} />
            <Input label="ZIP" value={draft.zip} onChange={(e) => setDraft({ ...draft, zip: e.target.value })} />
          </div>
          <Button
            disabled={!draft.address || !draft.city}
            onClick={() => {
              addAddress(draft);
              setDraft(EMPTY);
            }}
          >
            Save address
          </Button>
        </div>
      </Card>
    </div>
  );
}
