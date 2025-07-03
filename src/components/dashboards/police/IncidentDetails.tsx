"use client";

import type { Incident } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AlertTriangle, Gauge, Wind, Send } from 'lucide-react';

export function IncidentDetails({ incident }: { incident: Incident }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Incident Details: {incident.id}</CardTitle>
        <CardDescription>{incident.location}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="relative h-64 w-full rounded-lg overflow-hidden border">
            <Image
                src={`https://placehold.co/800x400.png`}
                alt="Map view of accident"
                fill
                className="object-cover"
                data-ai-hint="map"
            />
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incident.sensorData.impact} G</div>
              <p className="text-xs text-muted-foreground">G-force reading</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Speed at Impact</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incident.sensorData.speed} km/h</div>
              <p className="text-xs text-muted-foreground">Vehicle speed</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rescue Team</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incident.sensorData.rescueTeamSent ? 'Sent' : 'Not Sent'}</div>
              <p className="text-xs text-muted-foreground">Dispatch status</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
            <Button variant="accent" size="lg" className="flex-1">
                <AlertTriangle className="mr-2 h-4 w-4" /> Alert Rescue Teams
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
