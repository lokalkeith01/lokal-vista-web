import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Building2, Users, Music } from "lucide-react";

export type PersonaType = 'admin' | 'business' | 'influencer' | 'musician';

interface PersonaSelectorProps {
  value: PersonaType;
  onChange: (value: PersonaType) => void;
}

const personas = [
  { value: 'admin' as const, label: 'Admin Overview', icon: Shield, description: 'Platform-wide metrics' },
  { value: 'business' as const, label: 'Business Owner', icon: Building2, description: 'Business performance' },
  { value: 'influencer' as const, label: 'Influencer', icon: Users, description: 'Creator metrics' },
  { value: 'musician' as const, label: 'Musician', icon: Music, description: 'Music & royalties' },
];

const PersonaSelector = ({ value, onChange }: PersonaSelectorProps) => {
  const selectedPersona = personas.find(p => p.value === value);
  const SelectedIcon = selectedPersona?.icon || Shield;

  return (
    <Select value={value} onValueChange={(v) => onChange(v as PersonaType)}>
      <SelectTrigger className="w-[220px] bg-background">
        <div className="flex items-center gap-2">
          <SelectedIcon className="h-4 w-4" />
          <SelectValue placeholder="Select view" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {personas.map((persona) => {
          const Icon = persona.icon;
          return (
            <SelectItem key={persona.value} value={persona.value}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <div>
                  <div className="font-medium">{persona.label}</div>
                  <div className="text-xs text-muted-foreground">{persona.description}</div>
                </div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default PersonaSelector;
