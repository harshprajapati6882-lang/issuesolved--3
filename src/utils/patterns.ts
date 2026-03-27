import type { OrderConfig, PatternPlan, PatternType, QuickPatternPreset, RunStep } from "../types/order";

const PATTERN_TYPES: PatternType[] = [
  "smooth-s-curve",
  "rocket-launch",
  "sunset-fade",
  "viral-spike",
  "micro-burst",
  "heartbeat",
  "sawtooth",
  "fibonacci-spiral",
];

interface OrganicPatternProfile {
  key: string;
  name: string;
  baseType: PatternType;
  runMultiplier: number;
  durationMultiplier: number;
  earlyBand: [number, number];
  midBand: [number, number];
  lateBand: [number, number];
  midSpikeChance: number;
  spikeBand: [number, number];
  dipChance: number;
  dipBand: [number, number];
  waveAmplitude: number;
}

interface OrganicPatternVariant {
  earlyBand: [number, number];
  midBand: [number, number];
  lateBand: [number, number];
  midSpikeChance: number;
  spikeBand: [number, number];
  dipChance: number;
  dipBand: [number, number];
  waveAmplitude: number;
  waveFrequency: number;
  timingShift: number;
}

const BASE_ORGANIC_PATTERN_LIBRARY: OrganicPatternProfile[] = [
  {
    key: "slow-growth",
    name: "slow-growth",
    baseType: "smooth-s-curve",
    runMultiplier: 1.12,
    durationMultiplier: 1.16,
    earlyBand: [0.74, 0.92],
    midBand: [1.0, 1.14],
    lateBand: [0.84, 1.03],
    midSpikeChance: 0.08,
    spikeBand: [1.1, 1.22],
    dipChance: 0.06,
    dipBand: [0.84, 0.94],
    waveAmplitude: 0.02,
  },
  {
    key: "viral-spike",
    name: "viral-spike",
    baseType: "viral-spike",
    runMultiplier: 0.9,
    durationMultiplier: 0.92,
    earlyBand: [0.76, 0.96],
    midBand: [1.06, 1.34],
    lateBand: [0.82, 1.02],
    midSpikeChance: 0.26,
    spikeBand: [1.22, 1.56],
    dipChance: 0.08,
    dipBand: [0.78, 0.92],
    waveAmplitude: 0.035,
  },
  {
    key: "delayed-explosion",
    name: "delayed-explosion",
    baseType: "sunset-fade",
    runMultiplier: 0.96,
    durationMultiplier: 1.02,
    earlyBand: [0.7, 0.88],
    midBand: [0.94, 1.18],
    lateBand: [1.06, 1.3],
    midSpikeChance: 0.15,
    spikeBand: [1.14, 1.34],
    dipChance: 0.06,
    dipBand: [0.82, 0.94],
    waveAmplitude: 0.03,
  },
  {
    key: "wave-pattern",
    name: "wave-pattern",
    baseType: "heartbeat",
    runMultiplier: 
