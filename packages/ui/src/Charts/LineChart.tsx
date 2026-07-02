import React from 'react';
import styles from './Charts.module.css';

const DEFAULT_COLORS = [
  '#FF5B00',
  '#05244F',
  '#3C58B4',
  '#273A76',
  '#f59e0b',
  '#22c55e',
  '#ef4444',
  '#8b5cf6',
];

export interface LineChartSeries {
  label: string;
  data: number[];
  color?: string;
}

export interface LineChartProps {
  /** X-axis labels */
  labels: string[];
  series: LineChartSeries[];
  height?: number;
  title?: string;
  subtitle?: string;
  showGrid?: boolean;
  showDots?: boolean;
  smooth?: boolean;
  formatValue?: (v: number) => string;
  showLegend?: boolean;
  className?: string;
}

function makePath(
  points: { x: number; y: number }[],
  doSmooth: boolean,
): string {
  if (points.length === 0) return '';
  if (!doSmooth || points.length < 2) {
    return points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    d += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function LineChart({
  labels,
  series,
  height = 240,
  title,
  subtitle,
  showGrid = true,
  showDots = true,
  smooth = true,
  formatValue = (v) => v.toLocaleString('pt-BR'),
  showLegend = true,
  className,
}: LineChartProps): JSX.Element {
  const paddingLeft = 48;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 40;
  const chartWidth = 600;
  const chartHeight = height;
  const plotW = chartWidth - paddingLeft - paddingRight;
  const plotH = chartHeight - paddingTop - paddingBottom;

  const allValues = series.flatMap((s) => s.data);
  const maxVal = Math.max(...allValues, 0);
  const minVal = Math.min(...allValues, 0);
  const niceMax = maxVal === 0 ? 10 : Math.ceil(maxVal / 5) * 5;
  const niceMin = minVal >= 0 ? 0 : Math.floor(minVal / 5) * 5;
  const niceRange = niceMax - niceMin || 1;

  const toY = (v: number) =>
    paddingTop + plotH - ((v - niceMin) / niceRange) * plotH;
  const toX = (i: number) =>
    labels.length > 1
      ? paddingLeft + (i / (labels.length - 1)) * plotW
      : paddingLeft + plotW / 2;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((r) => ({
    y: paddingTop + plotH * (1 - r),
    label: formatValue(niceMin + niceRange * r),
  }));

  return (
    <div className={[styles.chartWrapper, className].filter(Boolean).join(' ')}>
      {(title || subtitle) && (
        <div className={styles.chartHeader}>
          {title && <p className={styles.chartTitle}>{title}</p>}
          {subtitle && <p className={styles.chartSubtitle}>{subtitle}</p>}
        </div>
      )}
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        role="img"
        aria-label={title ?? 'Gráfico de linhas'}
      >
        {/* Grid */}
        {showGrid &&
          gridLines.map((gl, i) => (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={gl.y}
                x2={chartWidth - paddingRight}
                y2={gl.y}
                stroke="rgba(5,36,79,0.08)"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x={paddingLeft - 6}
                y={gl.y + 4}
                textAnchor="end"
                fontSize="10"
                fill="rgba(5,36,79,0.45)"
                fontFamily="system-ui,sans-serif"
              >
                {gl.label}
              </text>
            </g>
          ))}

        {/* X axis base line */}
        <line
          x1={paddingLeft}
          y1={paddingTop + plotH}
          x2={chartWidth - paddingRight}
          y2={paddingTop + plotH}
          stroke="rgba(5,36,79,0.15)"
          strokeWidth="1"
        />

        {/* X labels */}
        {labels.map((label, i) => (
          <text
            key={i}
            x={toX(i)}
            y={paddingTop + plotH + 16}
            textAnchor="middle"
            fontSize="10"
            fill="rgba(5,36,79,0.55)"
            fontFamily="system-ui,sans-serif"
          >
            {label}
          </text>
        ))}

        {/* Series */}
        {series.map((s, si) => {
          const color = s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length];
          const points = s.data.map((v, i) => ({ x: toX(i), y: toY(v) }));
          const pathD = makePath(points, smooth);

          if (points.length === 0) return null;

          const areaD =
            pathD +
            ` L ${points[points.length - 1].x} ${paddingTop + plotH}` +
            ` L ${points[0].x} ${paddingTop + plotH} Z`;

          return (
            <g key={si}>
              {/* Area fill */}
              <path d={areaD} fill={color} fillOpacity="0.08" />
              {/* Line */}
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dots */}
              {showDots &&
                points.map((p, pi) => (
                  <circle
                    key={pi}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill={color}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                ))}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      {showLegend && series.length > 1 && (
        <div className={styles.legend}>
          {series.map((s, i) => (
            <div key={i} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{
                  background:
                    s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
                }}
              />
              <span className={styles.legendLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
