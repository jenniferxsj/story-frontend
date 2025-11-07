import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const colors = {
  primary: '#2A4D69',
  accent: '#43A0A8',
  backgroundLight: '#F8F9FA',
  backgroundDark: '#111121',
  surfaceLight: '#ffffff',
  surfaceDark: '#1A1A2A',
  textLight: '#343A40',
  textDark: '#E9ECEF',
  subtleLight: '#6c757d',
  subtleDark: '#adb5bd',
  borderLight: '#E9ECEF',
  borderDark: '#343A40',
};

export const Content = styled.main`
  flex: 1;
  width: 100%;
  padding: 24px;
  background: ${colors.backgroundLight};

  @media (min-width: 640px) {
    padding: 20px 40px;
  }

  @media (prefers-color-scheme: dark) {
    background: ${colors.backgroundDark};
  }
`;

export const SectionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SectionHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    margin: 0;
    font-family: 'Newsreader', serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.015em;
  }

  p {
    margin: 0;
    color: ${colors.subtleLight};
    font-size: 16px;
  }

  @media (prefers-color-scheme: dark) {
    p {
      color: ${colors.subtleDark};
    }
  }
`;

export const QuickStartGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

interface ActionCardProps {
  $accent: 'primary' | 'accent'
};

export const ActionCard = styled.a<ActionCardProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 20px;
  padding: 24px;
  background: ${colors.surfaceLight};
  border: 1px solid ${colors.borderLight};
  box-shadow: 0 10px 30px rgba(42, 77, 105, 0.08);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(42, 77, 105, 0.15);
  }

  ${({ $accent }) =>
    $accent === 'primary'
      ? css`
          --accent-color: ${colors.primary};
          --accent-watermark: rgba(42, 77, 105, 0.06);
          --accent-watermark-dark: rgba(42, 77, 105, 0.15);
        `
      : css`
          --accent-color: ${colors.accent};
          --accent-watermark: rgba(67, 160, 168, 0.08);
          --accent-watermark-dark: rgba(67, 160, 168, 0.1);
        `}

  @media (prefers-color-scheme: dark) {
    background: ${colors.surfaceDark};
    border-color: ${colors.borderDark};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5);
    }
  }
`;

export const CardIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--accent-color);
  color: #ffffff;
  font-size: 26px;
`;

export const CardBody = styled.div`
  z-index: 1;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
  }

  p {
    margin: 8px 0 0 0;
    color: ${colors.subtleLight};
    font-size: 14px;
  }

  @media (prefers-color-scheme: dark) {
    p {
      color: ${colors.subtleDark};
    }
  }
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  z-index: 1;
  color: var(--accent-color);
  font-weight: 600;
  font-size: 14px;
`;

export const CardWatermark = styled.span`
  position: absolute;
  right: -64px;
  bottom: -64px;
  font-size: 160px;
  line-height: 1;
  color: var(--accent-watermark);
  pointer-events: none;

  @media (prefers-color-scheme: dark) {
    color: var(--accent-watermark-dark);
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  h2 {
    margin: 0;
    font-family: 'Newsreader', serif;
    font-size: 28px;
    font-weight: 700;
  }
`;

export const SectionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    color: ${colors.accent};
  }
`;

export const ReportsGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const ReportCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 20px;
  background: ${colors.surfaceLight};
  border: 1px solid ${colors.borderLight};
  box-shadow: 0 8px 20px rgba(42, 77, 105, 0.1);

  @media (prefers-color-scheme: dark) {
    background: ${colors.surfaceDark};
    border-color: ${colors.borderDark};
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  }
`;

export const ReportMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: ${colors.subtleLight};
  }

  @media (prefers-color-scheme: dark) {
    p {
      color: ${colors.subtleDark};
    }
  }
`;

export const ReportExcerpt = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${colors.subtleLight};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    color: ${colors.subtleDark};
  }
`;

export const ReportFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  gap: 12px;
  font-size: 12px;
  color: ${colors.subtleLight};

  @media (prefers-color-scheme: dark) {
    color: ${colors.subtleDark};
  }
`;

export const ReportActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const ReportActionButton = styled.button`
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary};
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      color: ${colors.accent};
    }
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 20px;
  border: 1px solid ${colors.borderLight};
  background: ${colors.surfaceLight};
  box-shadow: 0 8px 24px rgba(42, 77, 105, 0.1);

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: rgba(42, 77, 105, 0.04);
  }

  th,
  td {
    padding: 14px 16px;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid ${colors.borderLight};
  }

  th {
    font-weight: 600;
    color: ${colors.textLight};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${colors.borderDark};
    background: ${colors.surfaceDark};
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);

    thead {
      background: rgba(67, 160, 168, 0.08);
    }

    th,
    td {
      border-bottom-color: ${colors.borderDark};
    }

    th {
      color: ${colors.textDark};
    }
  }
`;

type StatusVariant = 'completed' | 'draft' | 'generating';

interface StatusBadgeProps {
  $variant: StatusVariant
};

const statusStyles: Record<StatusVariant, { lightBg: string; lightColor: string; darkBg: string; darkColor: string }> =
  {
    completed: {
      lightBg: 'rgba(34, 197, 94, 0.15)',
      lightColor: '#166534',
      darkBg: 'rgba(34, 197, 94, 0.2)',
      darkColor: '#bbf7d0',
    },
    draft: {
      lightBg: 'rgba(37, 99, 235, 0.15)',
      lightColor: '#1d4ed8',
      darkBg: 'rgba(37, 99, 235, 0.25)',
      darkColor: '#bfdbfe',
    },
    generating: {
      lightBg: 'rgba(234, 179, 8, 0.2)',
      lightColor: '#92400e',
      darkBg: 'rgba(234, 179, 8, 0.25)',
      darkColor: '#fde68a',
    },
  };

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $variant }) => statusStyles[$variant].lightBg};
  color: ${({ $variant }) => statusStyles[$variant].lightColor};

  @media (prefers-color-scheme: dark) {
    background: ${({ $variant }) => statusStyles[$variant].darkBg};
    color: ${({ $variant }) => statusStyles[$variant].darkColor};
  }
`;

export const TableAction = styled.a`
  color: ${colors.primary};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    color: ${colors.accent};
  }
`;

export const BadgeDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
