import React from 'react';
import styles from './PageHeader.module.css';

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  backHref?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  backHref,
}: PageHeaderProps) {
  return (
    <div className={styles.wrapper}>
      {backHref && (
        <a href={backHref} className={styles.back}>
          <span className={styles.backArrow} aria-hidden="true">
            &#8592;
          </span>
          Voltar
        </a>
      )}

      {breadcrumbs && breadcrumbs.length > 0 && (
        <ol className={styles.breadcrumbs} aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={index} className={styles.breadcrumbItem}>
                {index > 0 && (
                  <span className={styles.breadcrumbSeparator} aria-hidden="true">
                    /
                  </span>
                )}
                {isLast || !crumb.href ? (
                  <span
                    className={styles.breadcrumbCurrent}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <a href={crumb.href} className={styles.breadcrumbLink}>
                    {crumb.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      )}

      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
