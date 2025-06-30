"use client";

import { useState } from 'react';
import { mockIncidents } from '@/lib/mock-data';
import type { Incident } from '@/lib/types';
import { AppHeader } from '@/components/layout/AppHeader';
import { IncidentList } from '@/components/dashboards/IncidentList';
import { IncidentDetails } from '@/components/dashboards/police/IncidentDetails';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

export function PoliceDashboard() {
  const [incidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(incidents[0]?.id || null);

  const selectedIncident = incidents.find(inc => inc.id === selectedIncidentId);

  return (
    <>
      <AppHeader serviceType="Police" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 h-full">
            <div className="lg:col-span-3">
                <IncidentList 
                    incidents={incidents}
                    selectedIncidentId={selectedIncidentId}
                    onSelectIncident={setSelectedIncidentId}
                />
            </div>
          <div className="lg:col-span-4">
            {selectedIncident ? (
              <IncidentDetails incident={selectedIncident} />
            ) : (
                <Card className="flex flex-col items-center justify-center h-full text-center p-8">
                    <CardHeader>
                        <div className="mx-auto bg-muted p-3 rounded-full mb-4">
                            <ShieldAlert className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <CardTitle>No Incident Selected</CardTitle>
                        <CardDescription>Please select an incident from the list to view details.</CardDescription>
                    </CardHeader>
                </Card>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
