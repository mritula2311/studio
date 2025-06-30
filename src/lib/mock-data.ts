import type { Incident } from './types';

export const mockIncidents: Incident[] = [
  {
    id: 'inc-001',
    location: 'I-280 & Saratoga Ave',
    severity: 'High',
    timestamp: '2 mins ago',
    coords: { lat: 37.29, lng: -122.03 },
    sensorData: {
      impact: 15.2,
      speed: 85,
      airbagsDeployed: true,
    },
    vitals: {
      heartRate: 125,
      bloodPressure: '160/100',
      respirationRate: 28,
    },
  },
  {
    id: 'inc-002',
    location: 'US-101 & University Ave',
    severity: 'Medium',
    timestamp: '5 mins ago',
    coords: { lat: 37.44, lng: -122.14 },
    sensorData: {
      impact: 8.5,
      speed: 45,
      airbagsDeployed: true,
    },
    vitals: {
      heartRate: 98,
      bloodPressure: '140/90',
      respirationRate: 22,
    },
  },
  {
    id: 'inc-003',
    location: 'El Camino Real & Page Mill Rd',
    severity: 'Low',
    timestamp: '12 mins ago',
    coords: { lat: 37.42, lng: -122.14 },
    sensorData: {
      impact: 3.1,
      speed: 25,
      airbagsDeployed: false,
    },
    vitals: {
      heartRate: 85,
      bloodPressure: '130/85',
      respirationRate: 18,
    },
  },
  {
    id: 'inc-004',
    location: 'CA-85 & De Anza Blvd',
    severity: 'Critical',
    timestamp: '28 mins ago',
    coords: { lat: 37.29, lng: -122.03 },
    sensorData: {
      impact: 25.8,
      speed: 110,
      airbagsDeployed: true,
    },
    vitals: {
      heartRate: 150,
      bloodPressure: '180/110',
      respirationRate: 35,
    },
  },
];
