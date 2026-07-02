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

export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartDataPoint[];
  donut?: boolean;
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  formatValue?: (v: number, total: number) => string;
  size?: number;
  className?: string;
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
): { x: number; y: number } {
  const angle = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

export function PieChart({
  data,
  donut = false,
  title,
  subtitle,
  showLegend = true,
  formatValue = (v, total) => `${((v / total) * 100).toFixed(1)}%`,
  size = 200,
  className,
}: PieChartProps): JSX.Element {
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 8;
  const innerR = donut ? outerR * 0.55 : 0;

  let currentAngle = 0;
  const slices = data.map((d, i) => {
    const angle = total > 0 ? (d.value / total) * 360 : 0;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;
    const color = d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];

    const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
    const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
    const innerStart = polarToCartesian(cx, cy, innerR, endAngle);
    const innerEnd = polarToCartesian(cx, cy, innerR, startAngle);
    const largeArc = angle > 180 ? 1 : 0;

    let pathD: string;
    if (donut) {
      pathD = [
        `M ${outerStart.x} ${outerStart.y}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
        `L ${innerStart.x} ${innerStart.y}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
        'Z',
      ].join(' ');
    } else {
      pathD = [
        `M ${cx} ${cy}`,
        `L ${outerStart.x} ${outerStart.y}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
        'Z',
      ].join(' ');
    }

    return { ...d, pathD, color, startAngle, endAngle, angle };
  });

  return (
    <div className={[styles.chartWrapper, className].filter(Boolean).join(' ')}>
      {(title || subtitle) && (
        <div className={styles.chartHeader}>
          {title && <p className={styles.chartTitle}>{title}</p>}
          {subtitle && <p className={styles.chartSubtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.pieContainer}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={title ?? 'Gráfico de pizza'}
        >
          {slices.map((s, i) => (
            <path
              key={i}
              d={s.pathD}
              fill={s.color}
              stroke="#fff"
              strokeWidth="2"
              style={{ transition: 'opacity 0.2s', cursor: 'default' }}
            />
          ))}

          {/* Donut center label */}
          {donut && (
            <>
              <text
                x={cx}
                y={cy - 4}
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                fill="#05244F"
                fontFamily="system-ui,sans-serif"
              >
                {total.toLocaleString('pt-BR')}
              </text>
              <text
                x={cx}
                y={cy + 14}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(5,36,79,0.5)"
                fontFamily="system-ui,sans-serif"
              >
                total
              </text>
            </>
          )}
        </svg>

        {showLegend && (
          <div className={styles.pieLegend}>
            {slices.map((s, i) => (
              <div key={i} className={styles.pieLegendItem}>
                <span
                  className={styles.legendDot}
                  style={{ background: s.color }}
                />
                <div className={styles.pieLegendText}>
                  <span className={styles.legendLabel}>{s.label}</span>
                  <span className={styles.legendValue}>
                    {formatValue(s.value, total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
