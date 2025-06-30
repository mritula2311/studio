'use server';

/**
 * @fileOverview Generates a concise summary of each accident, highlighting key details like location, severity, and sensor data.
 *
 * - generateAccidentSummary - A function that handles the accident summary generation process.
 * - GenerateAccidentSummaryInput - The input type for the generateAccidentSummary function.
 * - GenerateAccidentSummaryOutput - The return type for the generateAccidentSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAccidentSummaryInputSchema = z.object({
  location: z.string().describe('The location of the accident.'),
  severity: z.string().describe('The severity level of the accident (e.g., low, medium, high).'),
  sensorData: z.string().describe('Sensor data related to the accident, such as impact force, vehicle speed, etc.'),
});
export type GenerateAccidentSummaryInput = z.infer<typeof GenerateAccidentSummaryInputSchema>;

const GenerateAccidentSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the accident, including location, severity, and sensor data.'),
});
export type GenerateAccidentSummaryOutput = z.infer<typeof GenerateAccidentSummaryOutputSchema>;

export async function generateAccidentSummary(input: GenerateAccidentSummaryInput): Promise<GenerateAccidentSummaryOutput> {
  return generateAccidentSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAccidentSummaryPrompt',
  input: {schema: GenerateAccidentSummaryInputSchema},
  output: {schema: GenerateAccidentSummaryOutputSchema},
  prompt: `You are an expert at summarizing accident reports.

  Generate a concise summary of the accident, highlighting key details like location, severity, and sensor data.  Use the provided sensor data to quantify the details of the accident if possible.

  Location: {{{location}}}
  Severity: {{{severity}}}
  Sensor Data: {{{sensorData}}} `,
});

const generateAccidentSummaryFlow = ai.defineFlow(
  {
    name: 'generateAccidentSummaryFlow',
    inputSchema: GenerateAccidentSummaryInputSchema,
    outputSchema: GenerateAccidentSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
