"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Incident } from "@/lib/types";

interface IncidentListProps {
  incidents: Incident[];
  selectedIncidentId: string | null;
  onSelectIncident: (id: string) => void;
}

const severityVariantMap = {
  Low: "default",
  Medium: "secondary",
  High: "outline",
  Critical: "destructive",
} as const;

export function IncidentList({ incidents, selectedIncidentId, onSelectIncident }: IncidentListProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Active Incidents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {incidents.map((incident) => (
          <button
            key={incident.id}
            onClick={() => onSelectIncident(incident.id)}
            className={cn(
              "block w-full text-left p-4 rounded-lg border transition-all",
              selectedIncidentId === incident.id
                ? "bg-primary/10 border-primary shadow-md"
                : "bg-card hover:bg-muted/50"
            )}
            aria-pressed={selectedIncidentId === incident.id}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{incident.location}</h3>
              <Badge variant={severityVariantMap[incident.severity]}>{incident.severity}</Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{incident.coords.lat}, {incident.coords.lng}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{incident.timestamp}</span>
                </div>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
