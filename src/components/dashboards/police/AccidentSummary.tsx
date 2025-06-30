"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Text, Loader2 } from 'lucide-react';
import { generateAccidentSummary, type GenerateAccidentSummaryInput } from '@/ai/flows/generate-accident-summary';

interface AccidentSummaryProps {
    location: string;
    severity: string;
    sensorData: string;
}

export function AccidentSummary({ location, severity, sensorData }: AccidentSummaryProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');

    const input: GenerateAccidentSummaryInput = { location, severity, sensorData };

    try {
      const result = await generateAccidentSummary(input);
      if (result.summary) {
        setSummary(result.summary);
      } else {
        setError('Failed to generate summary. The AI returned an empty response.');
      }
    } catch (e) {
      setError('An error occurred while generating the summary.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI Accident Summary</CardTitle>
        <CardDescription>Generate a concise report of the incident using AI.</CardDescription>
      </CardHeader>
      <CardContent>
        {summary && (
          <div className="p-4 bg-muted/50 rounded-lg text-sm mb-4">
            {summary}
          </div>
        )}
        {error && (
            <p className="text-destructive text-sm mb-4">{error}</p>
        )}
        <Button onClick={handleGenerateSummary} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Text className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </Button>
      </CardContent>
    </Card>
  );
}
