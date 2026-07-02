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

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  height?: number;
  title?: string;
  subtitle?: string;
  showGrid?: boolean;
  showValues?: boolean;
  barRadius?: number;
  gap?: number;
  formatValue?: (v: number) => string;
  className?: string;
}

export function BarChart({
  data,
  height = 240,
  title,
  subtitle,
  showGrid = true,
  showValues = true,
  barRadius = 4,
  gap = 8,
  formatValue = (v) => v.toLocaleString('pt-BR'),
  className,
}: BarChartProps): JSX.Element {
  const paddingLeft = 48;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 48;
  const chartWidth = 600;
  const chartHeight = height;
  const plotW = chartWidth - paddingLeft - paddingRight;
  const plotH = chartHeight - paddingTop - paddingBottom;

  const maxVal = Math.max(...data.map((d) => d.value), 0);
  const niceMax = maxVal === 0 ? 10 : Math.ceil(maxVal / 5) * 5;

  const barCount = data.length;
  const totalGap = (barCount - 1) * gap;
  const barW = barCount > 0 ? (plotW - totalGap) / barCount : 0;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    y: paddingTop + plotH * (1 - ratio),
    label: formatValue(niceMax * ratio),
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
        aria-label={title ?? 'Gráfico de barras'}
      >
        {/* Grid lines */}
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

        {/* Bars */}
        {data.map((d, i) => {
          const x = paddingLeft + i * (barW + gap);
          const barH = niceMax > 0 ? (d.value / niceMax) * plotH : 0;
          const y = paddingTop + plotH - barH;
          const color = d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill={color}
                rx={barRadius}
                ry={barRadius}
                style={{ transition: 'height 0.4s ease, y 0.4s ease' }}
              />
              {/* Value label above bar */}
              {showValues && barH > 0 && (
                <text
                  x={x + barW / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill={color}
                  fontFamily="system-ui,sans-serif"
                >
                  {formatValue(d.value)}
                </text>
              )}
              {/* X axis label */}
              <text
                x={x + barW / 2}
                y={paddingTop + plotH + 16}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(5,36,79,0.55)"
                fontFamily="system-ui,sans-serif"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
