"use client";

import { useState } from 'react';
import { mockIncidents } from '@/lib/mock-data';
import type { Incident } from '@/lib/types';
import { AppHeader } from '@/components/layout/AppHeader';
import { IncidentList } from '@/components/dashboards/IncidentList';
import { IncidentDetails } from '@/components/dashboards/police/IncidentDetails';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function PoliceDashboard() {
  const [incidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(incidents[0]?.id || null);

  const selectedIncident = incidents.find(inc => inc.id === selectedIncidentId);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <h2 className="text-xl font-semibold">Active Incidents</h2>
          </div>
          <div className="flex-1">
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <IncidentList 
                  incidents={incidents}
                  selectedIncidentId={selectedIncidentId}
                  onSelectIncident={setSelectedIncidentId}
              />
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <AppHeader 
          serviceType="Police"
          incidents={incidents}
          selectedIncidentId={selectedIncidentId}
          onSelectIncident={setSelectedIncidentId}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
            {selectedIncident ? (
              <IncidentDetails incident={selectedIncident} />
            ) : (
                <Card className="flex flex-col items-center justify-center h-full text-center p-8 shadow-none border-dashed">
                    <CardHeader>
                        <div className="mx-auto bg-muted p-3 rounded-full mb-4">
                            <ShieldAlert className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <CardTitle>No Incident Selected</CardTitle>
                        <CardDescription>Please select an incident from the list to view details.</CardDescription>
                    </CardHeader>
                </Card>
            )}
        </main>
      </div>
    </div>
  );
}
