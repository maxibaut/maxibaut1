/**
 * BizBuz Score Tracker
 * 
 * To add a new score, ONLY add an object to the `scores` array below.
 * Labels, colors, grid, and placeholders update automatically.
 */

interface ScoreEntry {
  date: string;
  score: number;
}

const scores: ScoreEntry[] = [
  { date: "5 mrt 2026", score: 25 },
  { date: "11 mrt 2026", score: 37 },
  { date: "19 mrt 2026", score: 53 },
  { date: "29 mrt 2026", score: 56 },
  // Add new scores here — the grid handles everything automatically
];

// --- Derive label & color from score ---

function getScoreStyle(score: number) {
  if (score >= 80) return { label: 'Uitstekend', color: 'hsl(88, 61%, 37%)' };   // #639922
  if (score >= 60) return { label: 'Goed', color: 'hsl(210, 58%, 38%)' };        // #378ADD
  if (score >= 40) return { label: 'Matig', color: 'hsl(37, 91%, 44%)' };        // #D97706
  return { label: 'Zwak', color: 'hsl(0, 73%, 59%)' };                           // #E24B4A
}

// --- SVG circular progress ---

const RING_SIZE = 80;
const STROKE = 6;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ScoreRing({ score, color }: { score: number; color: string }) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  return (
    <svg width={RING_SIZE} height={RING_SIZE} className="mx-auto">
      {/* Background ring */}
      <circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth={STROKE}
      />
      {/* Progress ring */}
      <circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
      />
      {/* Score number */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 22, fontWeight: 500, fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {score}
      </text>
    </svg>
  );
}

// --- Cards ---

function FilledCard({ entry }: { entry: ScoreEntry }) {
  const { label, color } = getScoreStyle(entry.score);

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col items-center gap-2">
      <span className="text-muted-foreground" style={{ fontSize: 13 }}>
        {entry.date}
      </span>
      <ScoreRing score={entry.score} color={color} />
      <span style={{ fontSize: 12, fontWeight: 500, color }}>{label}</span>
    </div>
  );
}

function EmptyCard({ opacity }: { opacity: number }) {
  return (
    <div
      className="rounded-lg border border-dashed border-border aspect-auto"
      style={{ opacity, borderWidth: '0.5px', minHeight: 140 }}
    />
  );
}

// --- Main component ---

export default function BizBuzScoreTracker() {
  const count = scores.length;
  const cols = 4;
  // Fill current row + one extra row
  const currentRowEnd = Math.ceil(count / cols) * cols;
  const totalSlots = currentRowEnd + cols;

  const cards = [];

  for (let i = 0; i < totalSlots; i++) {
    if (i < count) {
      cards.push(<FilledCard key={i} entry={scores[i]} />);
    } else {
      const isCurrentRow = i < currentRowEnd;
      cards.push(<EmptyCard key={i} opacity={isCurrentRow ? 0.4 : 0.25} />);
    }
  }

  return (
    <div className="mt-12">
      <p className="text-muted-foreground mb-4" style={{ fontSize: 13 }}>
        BizBuz score-evolutie — ardennest.be
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {cards}
      </div>
    </div>
  );
}
