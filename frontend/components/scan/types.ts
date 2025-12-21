// components/saferclick/types.ts
import { LucideIcon } from 'lucide-react';

export type ScanResult = {
  level: 'critical' | 'warning' | 'safe';
  title: string;
  subtitle: string;
  icon: LucideIcon; // frontend map เอง
  risk: string;
  threatLevel: string;
  type: string;
  ssl: string;
  url: string;
  threats: string[];
  score: number;
};