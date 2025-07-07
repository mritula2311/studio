"use client";

import { useState, useEffect } from 'react';
import type { Incident } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeartPulse, Waves, Thermometer, Dot, ShieldAlert } from 'lucide-react';
import Image from 'next/image';

const severityVariantMap = {
    Low: "default",
    Medium: "secondary",
    High: "outline",
    Critical: "destructive",
  } as const;

const defaultVitals = {
  heartRate: 70,
  bloodPressure: '120/80',
  respirationRate: 16,
};

export function PatientVitals({ incident }: { incident: Incident }) {
  const [vitals, setVitals] = useState(() => incident.vitals || defaultVitals);

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prevVitals => {
        const hrFluctuation = Math.floor(Math.random() * 5) - 2;
        const respFluctuation = Math.floor(Math.random() * 3) - 1;
        
        const newHr = prevVitals.heartRate + hrFluctuation;
        const newResp = prevVitals.respirationRate + respFluctuation;

        const [sys, dia] = prevVitals.bloodPressure.split('/').map(Number);
        const sysFluctuation = Math.floor(Math.random() * 4) - 2;
        const diaFluctuation = Math.floor(Math.random() * 4) - 2;
        const newSys = sys + sysFluctuation;
        const newDia = dia + diaFluctuation;

        return {
          heartRate: newHr > 40 ? newHr : 40,
          bloodPressure: `${newSys > 80 ? newSys : 80}/${newDia > 50 ? newDia : 50}`,
          respirationRate: newResp > 10 ? newResp : 10,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [incident.id]);

  const getStatusColor = (value: number, thresholds: { normal: number, high: number}) => {
    if (value > thresholds.high || value < thresholds.normal) return 'text-destructive';
    return 'text-green-500';
  }

  return (
    <Card className="h-full overflow-hidden shadow-lg">
      <CardHeader className="bg-muted/30">
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Patient Vitals: {incident.id}</CardTitle>
                <CardDescription>{incident.location}</CardDescription>
            </div>
            <Badge variant={severityVariantMap[incident.severity]} className="text-base px-3 py-1">{incident.severity}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 gap-6 p-6">
        <div className="space-y-6">
            <div className="relative h-64 w-full rounded-lg overflow-hidden border shadow-inner">
                <Image
                    src={`https://placehold.co/800x400.png`}
                    alt="Map view of accident"
                    fill
                    className="object-cover"
                    data-ai-hint="map"
                />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Pre-arrival Preparation</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Prepare trauma bay for high-impact injuries.</li>
                        {vitals.heartRate > 100 && <li>Consider tachycardia protocol.</li>}
                        {vitals.respirationRate > 20 && <li>Have respiratory support on standby.</li>}
                        {incident.severity === "Critical" && <li className="font-semibold text-destructive flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Alert surgical team for immediate availability.</li>}
                        <li>Patient vitals indicate potential for shock, prepare fluids and pressors.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <HeartPulse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="flex items-baseline">
                    <span className={`text-4xl font-bold ${getStatusColor(vitals.heartRate, {normal: 60, high: 100})}`}>{vitals.heartRate}</span>
                    <span className="text-sm text-muted-foreground ml-2">BPM</span>
                    <Dot className={`w-8 h-8 animate-pulse ${getStatusColor(vitals.heartRate, {normal: 60, high: 100})}`} />
                </div>
                <p className="text-xs text-muted-foreground">Normal: 60-100 BPM</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline">
                        <span className="text-4xl font-bold">{vitals.bloodPressure}</span>
                        <span className="text-sm text-muted-foreground ml-2">mmHg</span>
                    </div>
                <p className="text-xs text-muted-foreground">Normal: 120/80 mmHg</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Respiration</CardTitle>
                <Waves className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="flex items-baseline">
                    <span className={`text-4xl font-bold ${getStatusColor(vitals.respirationRate, {normal: 12, high: 20})}`}>{vitals.respirationRate}</span>
                    <span className="text-sm text-muted-foreground ml-2">breaths/min</span>
                    <Dot className={`w-8 h-8 animate-pulse ${getStatusColor(vitals.respirationRate, {normal: 12, high: 20})}`} />
                </div>
                <p className="text-xs text-muted-foreground">Normal: 12-20 breaths/min</p>
                </CardContent>
            </Card>
        </div>
      </CardContent>
    </Card>
  );
}
