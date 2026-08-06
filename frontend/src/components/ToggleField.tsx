import { Switch } from "@/components/ui/switch";
import type { LucideIcon } from "lucide-react";

export function ToggleField({
  label,
  icon: Icon,
  checked,
  onChange,
}: {
  label: string;
  icon: LucideIcon;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-surface/60 px-4 py-3 transition-colors hover:border-primary/50">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-semibold">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} className="shrink-0" />
    </label>
  );
}