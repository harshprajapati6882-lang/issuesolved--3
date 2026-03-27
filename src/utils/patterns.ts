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
    runMultiplier: 1.02,
    durationMultiplier: 1,
    earlyBand: [0.82, 1.02],
    midBand: [0.96, 1.24],
    lateBand: [0.82, 1.06],
    midSpikeChance: 0.12,
    spikeBand: [1.1, 1.3],
    dipChance: 0.1,
    dipBand: [0.76, 0.92],
    waveAmplitude: 0.06,
  },
  {
    key: "plateau-growth",
    name: "plateau-growth",
    baseType: "sawtooth",
    runMultiplier: 1.08,
    durationMultiplier: 1.1,
    earlyBand: [0.86, 1.02],
    midBand: [0.94, 1.12],
    lateBand: [0.86, 1.04],
    midSpikeChance: 0.06,
    spikeBand: [1.08, 1.18],
    dipChance: 0.05,
    dipBand: [0.86, 0.95],
    waveAmplitude: 0.018,
  },
  {
    key: "drop-recovery",
    name: "sudden-drop-recovery",
    baseType: "heartbeat",
    runMultiplier: 1,
    durationMultiplier: 1,
    earlyBand: [0.88, 1.1],
    midBand: [0.82, 1.3],
    lateBand: [0.88, 1.18],
    midSpikeChance: 0.1,
    spikeBand: [1.12, 1.24],
    dipChance: 0.16,
    dipBand: [0.68, 0.88],
    waveAmplitude: 0.052,
  },
  {
    key: "exponential-growth",
    name: "exponential-growth",
    baseType: "fibonacci-spiral",
    runMultiplier: 0.88,
    durationMultiplier: 0.95,
    earlyBand: [0.72, 0.88],
    midBand: [1.0, 1.22],
    lateBand: [1.06, 1.34],
    midSpikeChance: 0.14,
    spikeBand: [1.14, 1.3],
    dipChance: 0.05,
    dipBand: [0.84, 0.94],
    waveAmplitude: 0.022,
  },
  {
    key: "organic-spread",
    name: "random-organic-spread",
    baseType: "micro-burst",
    runMultiplier: 1,
    durationMultiplier: 1,
    earlyBand: [0.78, 1.02],
    midBand: [0.96, 1.3],
    lateBand: [0.82, 1.06],
    midSpikeChance: 0.18,
    spikeBand: [1.12, 1.36],
    dipChance: 0.12,
    dipBand: [0.74, 0.92],
    waveAmplitude: 0.05,
  },
  {
    key: "multi-spike-viral",
    name: "multi-spike-viral",
    baseType: "viral-spike",
    runMultiplier: 0.92,
    durationMultiplier: 0.9,
    earlyBand: [0.76, 0.98],
    midBand: [1.08, 1.42],
    lateBand: [0.8, 1],
    midSpikeChance: 0.3,
    spikeBand: [1.24, 1.64],
    dipChance: 0.08,
    dipBand: [0.78, 0.9],
    waveAmplitude: 0.034,
  },
  {
    key: "gradual-decay",
    name: "gradual-decay",
    baseType: "rocket-launch",
    runMultiplier: 1.04,
    durationMultiplier: 1.08,
    earlyBand: [0.98, 1.22],
    midBand: [0.92, 1.12],
    lateBand: [0.74, 0.96],
    midSpikeChance: 0.08,
    spikeBand: [1.06, 1.22],
    dipChance: 0.12,
    dipBand: [0.72, 0.9],
    waveAmplitude: 0.02,
  },
  {
    key: "weekend-burst",
    name: "weekend-burst",
    baseType: "micro-burst",
    runMultiplier: 0.95,
    durationMultiplier: 0.84,
    earlyBand: [0.84, 1.02],
    midBand: [1.04, 1.32],
    lateBand: [0.86, 1.08],
    midSpikeChance: 0.2,
    spikeBand: [1.2, 1.45],
    dipChance: 0.08,
    dipBand: [0.8, 0.93],
    waveAmplitude: 0.042,
  },
  {
    key: "late-night-wave",
    name: "late-night-wave",
    baseType: "heartbeat",
    runMultiplier: 1.06,
    durationMultiplier: 1.18,
    earlyBand: [0.78, 0.95],
    midBand: [0.94, 1.18],
    lateBand: [0.96, 1.24],
    midSpikeChance: 0.1,
    spikeBand: [1.1, 1.24],
    dipChance: 0.1,
    dipBand: [0.76, 0.92],
    waveAmplitude: 0.058,
  },
  {
    key: "morning-ramp",
    name: "morning-ramp",
    baseType: "smooth-s-curve",
    runMultiplier: 1,
    durationMultiplier: 0.9,
    earlyBand: [0.74, 0.9],
    midBand: [1.02, 1.26],
    lateBand: [0.9, 1.08],
    midSpikeChance: 0.12,
    spikeBand: [1.14, 1.34],
    dipChance: 0.07,
    dipBand: [0.8, 0.94],
    waveAmplitude: 0.03,
  },
  {
    key: "lunch-hour-surge",
    name: "lunch-hour-surge",
    baseType: "viral-spike",
    runMultiplier: 0.96,
    durationMultiplier: 0.88,
    earlyBand: [0.8, 0.98],
    midBand: [1.08, 1.36],
    lateBand: [0.84, 1.04],
    midSpikeChance: 0.24,
    spikeBand: [1.2, 1.52],
    dipChance: 0.08,
    dipBand: [0.78, 0.9],
    waveAmplitude: 0.034,
  },
  {
    key: "double-plateau",
    name: "double-plateau",
    baseType: "sawtooth",
    runMultiplier: 1.1,
    durationMultiplier: 1.14,
    earlyBand: [0.86, 1.04],
    midBand: [0.92, 1.12],
    lateBand: [0.88, 1.04],
    midSpikeChance: 0.05,
    spikeBand: [1.06, 1.18],
    dipChance: 0.05,
    dipBand: [0.86, 0.94],
    waveAmplitude: 0.016,
  },
  {
    key: "staggered-spike",
    name: "staggered-spike",
    baseType: "micro-burst",
    runMultiplier: 0.94,
    durationMultiplier: 0.92,
    earlyBand: [0.8, 0.98],
    midBand: [1.04, 1.32],
    lateBand: [0.84, 1],
    midSpikeChance: 0.22,
    spikeBand: [1.18, 1.48],
    dipChance: 0.08,
    dipBand: [0.78, 0.9],
    waveAmplitude: 0.038,
  },
  {
    key: "quiet-then-boom",
    name: "quiet-then-boom",
    baseType: "sunset-fade",
    runMultiplier: 0.9,
    durationMultiplier: 1,
    earlyBand: [0.66, 0.84],
    midBand: [0.94, 1.16],
    lateBand: [1.12, 1.38],
    midSpikeChance: 0.2,
    spikeBand: [1.18, 1.44],
    dipChance: 0.06,
    dipBand: [0.82, 0.92],
    waveAmplitude: 0.028,
  },
  {
    key: "echo-wave",
    name: "echo-wave",
    baseType: "heartbeat",
    runMultiplier: 1.03,
    durationMultiplier: 1.06,
    earlyBand: [0.84, 1.04],
    midBand: [0.96, 1.2],
    lateBand: [0.86, 1.1],
    midSpikeChance: 0.12,
    spikeBand: [1.1, 1.26],
    dipChance: 0.1,
    dipBand: [0.74, 0.9],
    waveAmplitude: 0.062,
  },
  {
    key: "arc-rise",
    name: "arc-rise",
    baseType: "fibonacci-spiral",
    runMultiplier: 0.96,
    durationMultiplier: 0.96,
    earlyBand: [0.76, 0.92],
    midBand: [0.98, 1.18],
    lateBand: [1.02, 1.28],
    midSpikeChance: 0.12,
    spikeBand: [1.12, 1.3],
    dipChance: 0.06,
    dipBand: [0.82, 0.92],
    waveAmplitude: 0.024,
  },
  {
    key: "momentum-shift",
    name: "momentum-shift",
    baseType: "rocket-launch",
    runMultiplier: 0.98,
    durationMultiplier: 0.94,
    earlyBand: [0.9, 1.18],
    midBand: [0.92, 1.16],
    lateBand: [0.8, 1.02],
    midSpikeChance: 0.14,
    spikeBand: [1.12, 1.34],
    dipChance: 0.09,
    dipBand: [0.76, 0.9],
    waveAmplitude: 0.026,
  },
];

const EXTRA_PATTERN_COUNT = 100;
const EXTRA_PATTERN_PREFIXES = [
  "aurora",
  "ember",
  "pulse",
  "ripple",
  "glide",
  "nova",
  "drift",
  "cascade",
  "surge",
  "orbit",
];
const EXTRA_PATTERN_SUFFIXES = [
  "arc",
  "lift",
  "trail",
  "burst",
  "echo",
  "crest",
  "flow",
  "flare",
  "wave",
  "rise",
];

function createGeneratedPattern(template: OrganicPatternProfile, index: number): OrganicPatternProfile {
  const seed = index + 1;
  const seeded = (offset: number) => {
    const value = Math.sin(seed * 12.9898 + offset * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };
  const clampValue = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  const between = (min: number, max: number, offset: number) => min + seeded(offset) * (max - min);
  const tweak = (index % 13) / 100;
  const jitter = ((index * 7) % 9) / 100;
  const key = `${EXTRA_PATTERN_PREFIXES[Math.floor(index / EXTRA_PATTERN_SUFFIXES.length)]}-${EXTRA_PATTERN_SUFFIXES[index % EXTRA_PATTERN_SUFFIXES.length]}-${index + 1}`;

  return {
    key,
    name: key,
    baseType: template.baseType,
    runMultiplier: clampValue(template.runMultiplier + tweak - 0.06, 0.78, 1.28),
    durationMultiplier: clampValue(template.durationMultiplier + jitter - 0.04, 0.78, 1.3),
    earlyBand: [
      clampValue(template.earlyBand[0] + between(-0.06, 0.06, 1), 0.58, 1.12),
      clampValue(template.earlyBand[1] + between(-0.06, 0.08, 2), 0.66, 1.24),
    ],
    midBand: [
      clampValue(template.midBand[0] + between(-0.06, 0.08, 3), 0.72, 1.28),
      clampValue(template.midBand[1] + between(-0.05, 0.12, 4), 0.9, 1.54),
    ],
    lateBand: [
      clampValue(template.lateBand[0] + between(-0.06, 0.08, 5), 0.68, 1.2),
      clampValue(template.lateBand[1] + between(-0.04, 0.1, 6), 0.84, 1.42),
    ],
    midSpikeChance: clampValue(template.midSpikeChance + between(-0.05, 0.09, 7), 0.03, 0.42),
    spikeBand: [
      clampValue(template.spikeBand[0] + between(-0.08, 0.1, 8), 1.02, 1.5),
      clampValue(template.spikeBand[1] + between(-0.06, 0.16, 9), 1.12, 1.78),
    ],
    dipChance: clampValue(template.dipChance + between(-0.04, 0.08, 10), 0.02, 0.26),
    dipBand: [
      clampValue(template.dipBand[0] + between(-0.07, 0.05, 11), 0.62, 0.96),
      clampValue(template.dipBand[1] + between(-0.06, 0.06, 12), 0.74, 0.98),
    ],
    waveAmplitude: clampValue(template.waveAmplitude + between(-0.018, 0.03, 13), 0.012, 0.11),
  };
}

const GENERATED_ORGANIC_PATTERNS: OrganicPatternProfile[] = Array.from({ length: EXTRA_PATTERN_COUNT }, (_, index) => {
  const template = BASE_ORGANIC_PATTERN_LIBRARY[index % BASE_ORGANIC_PATTERN_LIBRARY.length];
  return createGeneratedPattern(template, index);
});

const ORGANIC_PATTERN_LIBRARY: OrganicPatternProfile[] = [
  ...BASE_ORGANIC_PATTERN_LIBRARY,
  ...GENERATED_ORGANIC_PATTERNS,
];

let lastPatternKey: string | null = null;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomInt = (min: number, max: number) => Math.floor(random(min, max + 1));

function pickRandomPatternType(): PatternType {
  return PATTERN_TYPES[randomInt(0, PATTERN_TYPES.length - 1)];
}

interface PresetProfile {
  patternType?: PatternType;
  runMultiplier: number;
  durationMultiplier: number;
  varianceMultiplier: number;
  targetAverageViews: number;
}

function resolvePresetProfile(preset: QuickPatternPreset | null): PresetProfile {
  if (preset === "viral-boost") {
    return { patternType: "viral-spike", runMultiplier: 0.8, durationMultiplier: 0.7, varianceMultiplier: 1.3, targetAverageViews: 220 };
  }
  if (preset === "fast-start") {
    return { patternType: "rocket-launch", runMultiplier: 0.75, durationMultiplier: 0.65, varianceMultiplier: 1.05, targetAverageViews: 230 };
  }
  if (preset === "trending-push") {
    return { patternType: "viral-spike", runMultiplier: 0.9, durationMultiplier: 0.95, varianceMultiplier: 1.15, targetAverageViews: 195 };
  }
  if (preset === "slow-burn") {
    return { patternType: "smooth-s-curve", runMultiplier: 1.2, durationMultiplier: 1.35, varianceMultiplier: 0.65, targetAverageViews: 150 };
  }
  return { runMultiplier: 1, durationMultiplier: 1, varianceMultiplier: 1, targetAverageViews: 180 };
}

function withBandNoise(band: [number, number], amount = 0.08): [number, number] {
  const min = Math.max(0.45, band[0] + random(-amount, amount));
  const max = Math.max(min + 0.02, band[1] + random(-amount, amount));
  return [min, max];
}

function createPatternVariant(profile: OrganicPatternProfile): OrganicPatternVariant {
  return {
    earlyBand: withBandNoise(profile.earlyBand),
    midBand: withBandNoise(profile.midBand),
    lateBand: withBandNoise(profile.lateBand),
    midSpikeChance: clamp(profile.midSpikeChance + random(-0.04, 0.08), 0.02, 0.45),
    spikeBand: withBandNoise(profile.spikeBand, 0.12),
    dipChance: clamp(profile.dipChance + random(-0.04, 0.06), 0.01, 0.28),
    dipBand: withBandNoise(profile.dipBand, 0.1),
    waveAmplitude: clamp(profile.waveAmplitude + random(-0.02, 0.03), 0.01, 0.11),
    waveFrequency: random(1.4, 3.8),
    timingShift: random(-0.15, 0.15),
  };
}

function pickPatternProfile(presetType: PatternType | undefined): OrganicPatternProfile {
  const pool = presetType
    ? ORGANIC_PATTERN_LIBRARY.filter((profile) => profile.baseType === presetType)
    : ORGANIC_PATTERN_LIBRARY;

  const candidates = pool.length > 0 ? pool : ORGANIC_PATTERN_LIBRARY;
  let picked = candidates[randomInt(0, candidates.length - 1)];

  if (candidates.length > 1 && lastPatternKey === picked.key) {
    const alternatives = candidates.filter((profile) => profile.key !== lastPatternKey);
    picked = alternatives[randomInt(0, alternatives.length - 1)];
  }

  lastPatternKey = picked.key;
  return picked;
}

function resolveDurationHours(config: OrderConfig): number {
  if (config.delivery.mode === "custom" || config.delivery.mode === "preset") return config.delivery.hours;
  const automatic = 7 + Math.sqrt(Math.max(800, config.totalViews)) / 16;
  return clamp(automatic, 6, 48);
}

function pickWeightedIndex(weights: number[]): number {
  const sum = weights.reduce((acc, value) => acc + value, 0);
  if (sum <= 0) return randomInt(0, Math.max(0, weights.length - 1));
  const threshold = random(0, sum);
  let cursor = 0;
  for (let index = 0; index < weights.length; index += 1) {
    cursor += weights[index];
    if (threshold <= cursor) return index;
  }
  return Math.max(0, weights.length - 1);
}

function resolveRunCount(totalViews: number, desiredRuns: number, averageTarget: number, minViewsPerRun: number): number {
  const maxRunsByMinimum = Math.max(1, Math.floor(totalViews / minViewsPerRun));
  let runCount = clamp(desiredRuns, 1, maxRunsByMinimum);

  while (runCount > 1 && totalViews / runCount < minViewsPerRun * 1.3) {
    runCount -= 1;
  }

  const averageBound = Math.max(1, Math.floor(totalViews / Math.max(minViewsPerRun, averageTarget)));
  runCount = Math.min(runCount, Math.max(1, averageBound));
  
  return Math.max(1, runCount);
}

interface CurveContext {
  spikes: Array<{ center: number; width: number; height: number }>;
  burstAnchors: number[];
  phase: number;
  stepCount: number;
  wobble: number;
}

function createCurveContext(type: PatternType): CurveContext {
  const spikeCount = type === "viral-spike" ? randomInt(2, 4) : 0;
  const spikes = Array.from({ length: spikeCount }, () => ({
    center: random(0.25, 0.85),
    width: random(0.03, 0.09),
    height: random(0.08, 0.2),
  }));

  return {
    spikes,
    burstAnchors: [random(0.15, 0.25), random(0.4, 0.55), random(0.7, 0.88)],
    phase: random(0, Math.PI * 2),
    stepCount: randomInt(8, 14),
    wobble: random(0.006, 0.018),
  };
}

function curveValue(type: PatternType, t: number, context: CurveContext): number {
  if (type === "smooth-s-curve") {
    return 1 / (1 + Math.exp(-10 * (t - 0.5)));
  }
  if (type === "rocket-launch") {
    const k = 5.2;
    return (1 - Math.exp(-k * t)) / (1 - Math.exp(-k));
  }
  if (type === "sunset-fade") {
    const k = 4.1;
    return (Math.exp(k * t) - 1) / (Math.exp(k) - 1);
  }
  if (type === "viral-spike") {
    const base = 1 / (1 + Math.exp(-8 * (t - 0.48)));
    const spikeLift = context.spikes.reduce((acc, spike) => acc + Math.exp(-Math.pow((t - spike.center) / spike.width, 2)) * spike.height, 0);
    return base + spikeLift;
  }
  if (type === "heartbeat") {
    const base = Math.pow(t, 1.08);
    const pulse = Math.sin((t * 9.5 + 0.15) * Math.PI + context.phase) * 0.055 * (1 - t * 0.3);
    const microPulse = Math.sin((t * 19 + 0.2) * Math.PI + context.phase * 0.5) * 0.02;
    return base + pulse + microPulse;
  }
  if (type === "sawtooth") {
    const step = Math.floor(t * context.stepCount) / context.stepCount;
    const remainder = (t * context.stepCount) % 1;
    return step * 0.86 + remainder * 0.14;
  }
  if (type === "micro-burst") {
    const [a, b, c] = context.burstAnchors;
    const jump1 = t >= a ? 0.12 : 0;
    const jump2 = t >= b ? 0.16 : 0;
    const jump3 = t >= c ? 0.2 : 0;
    const drift = t * 0.58;
    const micro = Math.sin(t * 18 * Math.PI + context.phase) * 0.015;
    return drift + jump1 + jump2 + jump3 + micro;
  }

  const phi = 1.618;
  return Math.pow(t, phi) + Math.pow(t, 2.6) * 0.18;
}

function normalizeMonotone(values: number[]): number[] {
  const series = [...values];
  for (let index = 1; index < series.length; index += 1) {
    series[index] = Math.max(series[index], series[index - 1] + 0.0001);
  }

  const first = series[0];
  const last = series[series.length - 1];
  const span = Math.max(0.0001, last - first);
  return series.map((value) => (value - first) / span);
}

function allocateRounded(values: number[], total: number): number[] {
  if (values.length === 0) return [];
  const floors = values.map((value) => Math.floor(value));
  let remainder = total - floors.reduce((acc, value) => acc + value, 0);
  const order = values
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac);

  let cursor = 0;
  while (remainder > 0 && order.length > 0) {
    floors[order[cursor % order.length].index] += 1;
    remainder -= 1;
    cursor += 1;
  }
  return floors;
}

function redistributeForMinimum(runs: number[], minimum: number): number[] {
  const result = [...runs];

  for (let index = 0; index < result.length; index += 1) {
    if (result[index] >= minimum) continue;

    let deficit = minimum - result[index];
    while (deficit > 0) {
      let donor = -1;
      let donorExcess = 0;
      for (let candidate = 0; candidate < result.length; candidate += 1) {
        if (candidate === index) continue;
        const excess = result[candidate] - minimum;
        if (excess > donorExcess) {
          donorExcess = excess;
          donor = candidate;
        }
      }
      if (donor < 0 || donorExcess <= 0) break;

      const transfer = Math.min(deficit, donorExcess);
      result[index] += transfer;
      result[donor] -= transfer;
      deficit -= transfer;
    }
  }

  for (let index = 0; index < result.length; index += 1) {
    if (result[index] >= minimum || result.length === 1) continue;

    if (index === result.length - 1) {
      result[index - 1] += result[index];
      result.splice(index, 1);
    } else {
      result[index + 1] += result[index];
      result.splice(index, 1);
      index -= 1;
    }
  }

  return result;
}

function distributeWithMinimum(weights: number[], total: number, minimum: number): number[] {
  if (total === 0) return [0];
  if (total < minimum) return [total];

  const count = clamp(weights.length, 1, Math.floor(total / minimum));
  const localWeights = weights.slice(0, count).map((weight) => Math.max(0.01, weight));
  const weightSum = localWeights.reduce((acc, value) => acc + value, 0);
  const baseline = count * minimum;
  const remainder = total - baseline;
  const rawExtras = localWeights.map((weight) => (weight / weightSum) * remainder);
  const extras = allocateRounded(rawExtras, remainder);
  return extras.map((extra) => extra + minimum);
}

function nudgeConsecutiveDuplicates(values: number[], minimum: number): number[] {
  if (values.length < 2) return values;
  const result = [...values];

  for (let index = 1; index < result.length; index += 1) {
    if (result[index] !== result[index - 1]) continue;

    const canRaiseCurrent = index < result.length - 1 || result[index - 1] > minimum;
    if (canRaiseCurrent) {
      result[index] += 1;
      let donated = false;
      if (index < result.length - 1 && result[index + 1] > minimum) {
        result[index + 1] -= 1;
        donated = true;
      } else {
        for (let donor = result.length - 1; donor >= 0; donor -= 1) {
          if (donor !== index && result[donor] > minimum) {
            result[donor] -= 1;
            donated = true;
            break;
          }
        }
      }
      if (!donated) result[index] -= 1;
    }
  }

  return result;
}

function generateViewRunsFromCurve(
  patternType: PatternType,
  totalViews: number,
  runCount: number,
  variancePercent: number,
  preset: QuickPatternPreset | null,
  variant: OrganicPatternVariant,
  minViewsPerRun: number
): number[] {
  if (totalViews <= 0) return [0];
  if (totalViews < minViewsPerRun) return [totalViews];

  const context = createCurveContext(patternType);
  const varianceFactor = clamp(variancePercent, 10, 50) / 100;
  const presetVarianceBoost = preset === "viral-boost" ? 1.2 : preset === "slow-burn" ? 0.8 : 1;
  const noiseAmplitude = clamp(0.01 + varianceFactor * 0.02 * presetVarianceBoost, 0.01, 0.03);

  const cumulativeRaw = Array.from({ length: runCount + 1 }, (_, index) => {
    const t = index / runCount;
    const base = curveValue(patternType, t, context);
    const wiggle = 1 + random(-noiseAmplitude, noiseAmplitude) + Math.sin((index + 1) * 0.8 + context.phase) * context.wobble;
    return base * wiggle;
  });

  const cumulative = normalizeMonotone(cumulativeRaw);
  const rampRuns = Math.max(3, Math.min(5, Math.floor(runCount * 0.2)));
  const incrementsRaw = Array.from({ length: runCount }, (_, index) => {
    const phase = index / Math.max(1, runCount - 1);
    const delta = Math.max(0.00001, cumulative[index + 1] - cumulative[index]);
    const shapeVariance = random(1 - varianceFactor * 0.55, 1 + varianceFactor * 0.7);
    const wave = 1 + Math.sin((phase + variant.timingShift) * Math.PI * variant.waveFrequency) * variant.waveAmplitude;
    let phaseFactor = 1;

    if (phase < 0.2) {
      phaseFactor = random(variant.earlyBand[0], variant.earlyBand[1]);
    } else if (phase <= 0.8) {
      phaseFactor = random(variant.midBand[0], variant.midBand[1]);
      const spikeChance = phase > 0.32 && phase < 0.72 ? variant.midSpikeChance + varianceFactor * 0.08 : variant.midSpikeChance * 0.4;
      if (Math.random() < spikeChance) {
        phaseFactor *= random(variant.spikeBand[0], variant.spikeBand[1]);
      }
    } else {
      phaseFactor = random(variant.lateBand[0], variant.lateBand[1]);
    }

    if (Math.random() < variant.dipChance) {
      phaseFactor *= random(variant.dipBand[0], variant.dipBand[1]);
    }

    if (index < rampRuns) {
      const ease = (index + 1) / rampRuns;
      const easeIn = Math.pow(ease, 1.8);
      phaseFactor *= 0.52 + easeIn * 0.44;
    }

    if (index >= runCount - rampRuns) {
      phaseFactor *= random(0.82, 0.98);
    }

    return delta * shapeVariance * phaseFactor * wave;
  });

  const incrementSum = incrementsRaw.reduce((acc, value) => acc + value, 0);
  const scaled = incrementsRaw.map((value) => (value / Math.max(0.0001, incrementSum)) * totalViews);
  const rounded = allocateRounded(scaled, totalViews);
  const phasedWeights = rounded.map((value, index) => {
    const phase = index / Math.max(1, rounded.length - 1);
    if (phase < 0.2) return value * random(0.78, 0.9);
    if (phase <= 0.8) {
      const boosted = value * random(1.06, 1.24);
      return Math.random() < 0.14 ? boosted * random(1.12, 1.42) : boosted;
    }
    return value * random(0.86, 1.02);
  });
  const phasedRuns = distributeWithMinimum(phasedWeights, totalViews, minViewsPerRun);
  const minimumSafe = redistributeForMinimum(phasedRuns, minViewsPerRun);
  const finalRuns = nudgeConsecutiveDuplicates(minimumSafe, minViewsPerRun);

  if (finalRuns.length > 1 && finalRuns.every((value) => value === finalRuns[0])) {
    finalRuns[0] += 1;
    let adjusted = false;
    for (let donor = finalRuns.length - 1; donor >= 1; donor -= 1) {
      if (finalRuns[donor] > minViewsPerRun) {
        finalRuns[donor] -= 1;
        adjusted = true;
        break;
      }
    }
    if (!adjusted) finalRuns[0] -= 1;
  }

  return finalRuns;
}

function intervalPatternFactor(type: PatternType, t: number): number {
  if (type === "smooth-s-curve") return 1.06 - Math.exp(-Math.pow((t - 0.5) / 0.2, 2)) * 0.34;
  if (type === "rocket-launch") return 0.58 + t * 1.02;
  if (type === "sunset-fade") return 1.2 - t * 0.52;
  if (type === "viral-spike") return 1.14 - Math.exp(-Math.pow((t - 0.56) / 0.14, 2)) * 0.5;
  if (type === "micro-burst") return Math.sin(t * 22) > 0.25 ? 0.64 : 1.52;
  if (type === "heartbeat") return Math.sin(t * 16) > 0.2 ? 0.76 : 1.26;
  if (type === "sawtooth") return ((t * 10) % 1) < 0.2 ? 0.66 : 1.24;
  return 1.16 - t * 0.46;
}

function intervalPresetFactor(preset: QuickPatternPreset | null, t: number): number {
  if (preset === "viral-boost") return 1.2 - Math.exp(-Math.pow((t - 0.58) / 0.2, 2)) * 0.45;
  if (preset === "fast-start") return 0.65 + t * 0.9;
  if (preset === "trending-push") return 1.1 - Math.exp(-Math.pow((t - 0.58) / 0.22, 2)) * 0.3;
  if (preset === "slow-burn") return 1.2 + t * 0.25;
  return 1;
}

// 🔥 NEW: Distribute likes proportionally to views (5-8% ratio)
function distributeLikesProportional(runs: { views: number }[], targetTotal: number): number[] {
  if (runs.length === 0) return [];

  const totalViews = Math.max(1, runs.reduce((sum, run) => sum + Math.max(0, run.views), 0));
  const minimumPerRun = 10;
  const likesTarget = Math.max(targetTotal, runs.length * minimumPerRun);

  const baseShares = runs.map((run) => (Math.max(0, run.views) / totalViews) * likesTarget);
  const withVariation = baseShares.map((base) => base * random(0.8, 1.2));

  const preliminary = withVariation.map((value) => Math.max(minimumPerRun, Math.round(value)));
  const baseFloor = runs.length * minimumPerRun;
  const currentExtra = preliminary.reduce((sum, value) => sum + (value - minimumPerRun), 0);
  const targetExtra = Math.max(0, likesTarget - baseFloor);

  const scaled =
    currentExtra > 0
      ? preliminary.map((value) => minimumPerRun + Math.max(0, Math.round((value - minimumPerRun) * (targetExtra / currentExtra))))
      : Array.from({ length: runs.length }, () => minimumPerRun);

  let drift = likesTarget - scaled.reduce((sum, value) => sum + value, 0);
  const weightedIndexes = runs
    .map((run, index) => ({ index, weight: Math.max(1, run.views) }))
    .sort((a, b) => b.weight - a.weight)
    .map((slot) => slot.index);

  if (drift > 0) {
    let pointer = 0;
    while (drift > 0) {
      const index = weightedIndexes[pointer % weightedIndexes.length];
      scaled[index] += 1;
      drift -= 1;
      pointer += 1;
    }
  } else if (drift < 0) {
    let pointer = 0;
    let guard = 0;
    while (drift < 0 && guard < scaled.length * 30) {
      const index = weightedIndexes[pointer % weightedIndexes.length];
      if (scaled[index] > minimumPerRun) {
        scaled[index] -= 1;
        drift += 1;
      }
      pointer += 1;
      guard += 1;
    }
  }

  for (let index = 1; index < scaled.length; index += 1) {
    if (scaled[index] === scaled[index - 1]) {
      const direction = Math.random() < 0.5 ? -1 : 1;
      const next = scaled[index] + direction;
      if (next >= minimumPerRun) {
        scaled[index] = next;
      } else {
        scaled[index] += 1;
      }
    }
  }

  let finalDelta = likesTarget - scaled.reduce((sum, value) => sum + value, 0);
  if (finalDelta !== 0) {
    const ordered = [...weightedIndexes];
    let pointer = 0;
    let guard = 0;
    while (finalDelta !== 0 && guard < ordered.length * 40) {
      const index = ordered[pointer % ordered.length];
      if (finalDelta > 0) {
        scaled[index] += 1;
        finalDelta -= 1;
      } else if (scaled[index] > minimumPerRun) {
        scaled[index] -= 1;
        finalDelta += 1;
      }
      pointer += 1;
      guard += 1;
    }
  }

  return scaled;
}

// 🔥 NEW: Distribute shares proportionally to views (0.5-2% ratio)
function distributeSharesProportional(runs: { views: number }[], targetTotal: number): number[] {
  if (runs.length === 0) return [];
  if (targetTotal < 20) return Array.from({ length: runs.length }, () => 0);

  const totalViews = Math.max(1, runs.reduce((sum, run) => sum + Math.max(0, run.views), 0));
  const minimumPerRun = 20; // Shares minimum is 20
  
  // Calculate how many runs should have shares (not all runs need shares)
  const runsWithShares = Math.max(1, Math.min(runs.length, Math.ceil(targetTotal / minimumPerRun)));
  
  // If we can't distribute minimum to enough runs, reduce minimum
  const effectiveMinimum = Math.min(minimumPerRun, Math.floor(targetTotal / runsWithShares));
  
  const result = Array.from({ length: runs.length }, () => 0);
  
  // Select runs with highest views to get shares
  const sortedIndexes = runs
    .map((run, index) => ({ index, views: run.views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, runsWithShares)
    .map((item) => item.index);
  
  // Calculate weights for selected runs
  const selectedTotalViews = sortedIndexes.reduce((sum, idx) => sum + Math.max(1, runs[idx].views), 0);
  
  // Distribute proportionally
  let remaining = targetTotal;
  sortedIndexes.forEach((idx, i) => {
    const proportion = Math.max(1, runs[idx].views) / selectedTotalViews;
    let share = Math.round(targetTotal * proportion * random(0.85, 1.15));
    
    // Ensure minimum
    share = Math.max(effectiveMinimum, share);
    
    // Don't exceed remaining
    share = Math.min(share, remaining);
    
    // Last one gets the rest
    if (i === sortedIndexes.length - 1) {
      share = remaining;
    }
    
    result[idx] = share;
    remaining -= share;
  });
  
  // Ensure no consecutive duplicates
  for (let i = 1; i < result.length; i++) {
    if (result[i] > 0 && result[i] === result[i - 1]) {
      if (result[i] > effectiveMinimum) {
        result[i] -= 1;
      } else {
        result[i] += 1;
      }
    }
  }
  
  return result;
}

// 🔥 NEW: Distribute saves proportionally to views (1-2% ratio)
function distributeSavesProportional(runs: { views: number }[], targetTotal: number): number[] {
  if (runs.length === 0) return [];
  if (targetTotal < 10) return Array.from({ length: runs.length }, () => 0);

  const totalViews = Math.max(1, runs.reduce((sum, run) => sum + Math.max(0, run.views), 0));
  const minimumPerRun = 10; // Saves minimum is 10
  
  // Calculate how many runs should have saves
  const runsWithSaves = Math.max(1, Math.min(runs.length, Math.ceil(targetTotal / minimumPerRun)));
  
  // If we can't distribute minimum to enough runs, reduce minimum
  const effectiveMinimum = Math.min(minimumPerRun, Math.floor(targetTotal / runsWithSaves));
  
  const result = Array.from({ length: runs.length }, () => 0);
  
  // Select runs with highest views to get saves
  const sortedIndexes = runs
    .map((run, index) => ({ index, views: run.views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, runsWithSaves)
    .map((item) => item.index);
  
  // Calculate weights for selected runs
  const selectedTotalViews = sortedIndexes.reduce((sum, idx) => sum + Math.max(1, runs[idx].views), 0);
  
  // Distribute proportionally
  let remaining = targetTotal;
  sortedIndexes.forEach((idx, i) => {
    const proportion = Math.max(1, runs[idx].views) / selectedTotalViews;
    let save = Math.round(targetTotal * proportion * random(0.85, 1.15));
    
    // Ensure minimum
    save = Math.max(effectiveMinimum, save);
    
    // Don't exceed remaining
    save = Math.min(save, remaining);
    
    // Last one gets the rest
    if (i === sortedIndexes.length - 1) {
      save = remaining;
    }
    
    result[idx] = save;
    remaining -= save;
  });
  
  // Ensure no consecutive duplicates
  for (let i = 1; i < result.length; i++) {
    if (result[i] > 0 && result[i] === result[i - 1]) {
      if (result[i] > effectiveMinimum) {
        result[i] -= 1;
      } else {
        result[i] += 1;
      }
    }
  }
  
  // Clear first run for saves (more organic)
  if (result.length > 1 && result[0] > 0) {
    const carry = result[0];
    result[0] = 0;
    // Find the run with highest saves to add the carry
    let maxIdx = 1;
    for (let i = 2; i < result.length; i++) {
      if (result[i] > result[maxIdx]) maxIdx = i;
    }
    result[maxIdx] += carry;
  }
  
  return result;
}

function detectRisk(viewsPerHour: number, variancePercent: number, hours: number): "Safe" | "Medium" | "Risk" {
  const speedScore = clamp(viewsPerHour / 15000, 0, 1.2);
  const varianceScore = clamp(variancePercent / 50, 0, 1);
  const shortWindowPenalty = hours <= 12 ? 0.25 : hours <= 24 ? 0.12 : 0;
  const score = speedScore * 0.75 + varianceScore * 0.45 + shortWindowPenalty;
  if (score >= 1) return "Risk";
  if (score >= 0.62) return "Medium";
  return "Safe";
}

export function createPatternPlan(config: OrderConfig): PatternPlan {
  const minViewsPerRun = config.minViewsPerRun || 100;
  
  const presetProfile = resolvePresetProfile(config.quickPreset);
  const selectedPatternProfile = pickPatternProfile(presetProfile.patternType);
  const patternType = presetProfile.patternType ?? selectedPatternProfile.baseType ?? pickRandomPatternType();
  const patternName = selectedPatternProfile.name;
  const variant = createPatternVariant(selectedPatternProfile);
  const patternId = randomInt(100, 999);
  const requestedViews = Math.max(0, Math.floor(config.totalViews));
  const variance = clamp(config.variancePercent * presetProfile.varianceMultiplier, 10, 50);
  
  const maxPossibleRuns = Math.max(1, Math.floor(requestedViews / minViewsPerRun));
  
  const baseRequestedRuns = Math.round(randomInt(50, 80) * presetProfile.runMultiplier * selectedPatternProfile.runMultiplier);
  const requestedRuns = Math.min(baseRequestedRuns, maxPossibleRuns);
  
  const totalRuns = requestedViews >= minViewsPerRun 
    ? resolveRunCount(requestedViews, requestedRuns, presetProfile.targetAverageViews, minViewsPerRun) 
    : 1;
    
  const durationHours = clamp(
    resolveDurationHours(config) * presetProfile.durationMultiplier * selectedPatternProfile.durationMultiplier,
    2,
    72
  );
  const durationMin = durationHours * 60;
  const startDelayMin = clamp(config.startDelayHours || 0, 0, 168) * 60;

  let viewRuns = generateViewRunsFromCurve(
    patternType, 
    requestedViews, 
    totalRuns, 
    variance, 
    config.quickPreset, 
    variant,
    minViewsPerRun
  );
  
  if (config.peakHoursBoost && viewRuns.length > 1 && requestedViews >= minViewsPerRun) {
    const initialWeights = viewRuns.map((views) => Math.max(0.01, views));
    const boostedWeights = initialWeights.map((weight, index) => {
      const t = index / Math.max(1, initialWeights.length - 1);
      const pseudoHour = Math.floor((t * durationHours) % 24);
      const inPeakWindow = pseudoHour >= 18 && pseudoHour <= 23;
      const boostChance = inPeakWindow ? 0.78 : 0.18;
      const boost = Math.random() < boostChance ? random(1.14, inPeakWindow ? 1.52 : 1.2) : random(0.94, 1.06);
      return weight * boost;
    });
    viewRuns = distributeWithMinimum(boostedWeights, requestedViews, minViewsPerRun);
  }

  const baseInterval = durationMin / Math.max(1, viewRuns.length - 1);
  const now = new Date();
  let elapsed = startDelayMin;
  const provisionalRuns = viewRuns.map((views, index) => {
    if (index > 0) {
      const t = index / Math.max(1, viewRuns.length - 1);
      const jitter = random(0.78, 1.24);
      elapsed += Math.max(
        1,
        baseInterval * jitter * intervalPresetFactor(config.quickPreset, t) * intervalPatternFactor(patternType, t)
      );
    }
    return { at: new Date(now.getTime() + elapsed * 60_000), views };
  });

  const totalViews = provisionalRuns.reduce((acc, run) => acc + run.views, 0);
  
  // 🔥 FIXED: Engagement ratios now properly scale with views
  const likesRatio = random(0.05, 0.08);   // 5-8% of views
  const sharesRatio = random(0.005, 0.02); // 0.5-2% of views
  const savesRatio = random(0.01, 0.02);   // 1-2% of views

  const likesTotal = config.includeLikes ? Math.max(10, Math.floor(totalViews * likesRatio)) : 0;
  const sharesTotal = config.includeShares ? Math.max(20, Math.floor(totalViews * sharesRatio)) : 0;
  const savesTotal = config.includeSaves ? Math.max(10, Math.floor(totalViews * savesRatio)) : 0;

  // 🔥 FIXED: Use proportional distribution for ALL engagement types
  const likesRuns = config.includeLikes 
    ? distributeLikesProportional(provisionalRuns, likesTotal) 
    : viewRuns.map(() => 0);
  
  const sharesRuns = config.includeShares 
    ? distributeSharesProportional(provisionalRuns, sharesTotal) 
    : viewRuns.map(() => 0);
  
  const savesRuns = config.includeSaves 
    ? distributeSavesProportional(provisionalRuns, savesTotal) 
    : viewRuns.map(() => 0);

  let cumulativeViews = 0;
  let cumulativeLikes = 0;
  let cumulativeShares = 0;
  let cumulativeSaves = 0;

  const runs: RunStep[] = provisionalRuns.map((run, index) => {
    cumulativeViews += run.views;
    cumulativeLikes += likesRuns[index];
    cumulativeShares += sharesRuns[index];
    cumulativeSaves += savesRuns[index];

    return {
      run: index + 1,
      at: run.at,
      minutesFromStart: Math.round((run.at.getTime() - now.getTime()) / 60_000),
      views: run.views,
      likes: likesRuns[index],
      shares: sharesRuns[index],
      saves: savesRuns[index],
      cumulativeViews,
      cumulativeLikes,
      cumulativeShares,
      cumulativeSaves,
    };
  });

  const viewsPerHour = totalViews / Math.max(1, durationHours);

  return {
    patternId,
    patternName,
    patternType,
    totalRuns: runs.length,
    approximateIntervalMin: Math.round(durationMin / Math.max(1, runs.length)),
    finishTime: runs[runs.length - 1]?.at ?? now,
    estimatedDurationHours: Number((durationHours + startDelayMin / 60).toFixed(1)),
    risk: detectRisk(viewsPerHour, variance, durationHours),
    runs,
  };
}
