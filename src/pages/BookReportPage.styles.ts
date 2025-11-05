import styled, { css } from 'styled-components'

import { colors } from './DashboardPage.styles'

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const PageTitle = styled.h1`
  margin: 0;
  font-family: 'Newsreader', serif;
  font-size: clamp(1.75rem, 2.4vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${colors.textLight};

  @media (prefers-color-scheme: dark) {
    color: ${colors.textDark};
  }
`

export const SearchField = styled.input`
  width: 100%;
  max-width: 280px;
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid ${colors.borderLight};
  background: ${colors.surfaceLight};
  color: ${colors.textLight};
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(42, 77, 105, 0.12);
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${colors.borderDark};
    background: ${colors.surfaceDark};
    color: ${colors.textDark};

    &:focus {
      border-color: ${colors.accent};
      box-shadow: 0 0 0 3px rgba(67, 160, 168, 0.2);
    }
  }
`

export const ActionRowGroup = styled.div`
  display: flex;
  gap: 12px;
`

interface ActionButtonProps {
  $variant: 'primary' | 'subtle' | 'ghost' | 'link'
}

export const ActionRowButton = styled.button<ActionButtonProps & { icon?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  background: transparent;
  color: ${colors.textLight};

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${colors.primary};
          color: #ffffff;

          &:hover {
            background: rgba(42, 77, 105, 0.9);
          }

          @media (prefers-color-scheme: dark) {
            background: ${colors.accent};
            color: ${colors.textDark};

            &:hover {
              background: rgba(67, 160, 168, 0.85);
            }
          }
        `
      case 'subtle':
        return css`
          border-color: ${colors.borderLight};
          background: ${colors.surfaceLight};

          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }

          @media (prefers-color-scheme: dark) {
            border-color: ${colors.borderDark};
            background: ${colors.surfaceDark};
            color: ${colors.textDark};

            &:hover {
              background: rgba(255, 255, 255, 0.1);
            }
          }
        `
      case 'ghost':
        return css`
          color: ${colors.subtleLight};

          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }

          @media (prefers-color-scheme: dark) {
            color: ${colors.subtleDark};

            &:hover {
              background: rgba(255, 255, 255, 0.1);
            }
          }
        `
      case 'link':
        return css`
          color: ${colors.primary};

          &:hover {
            text-decoration: underline;
          }

          @media (prefers-color-scheme: dark) {
            color: ${colors.accent};
          }
        `
    }
  }}

  @media (prefers-color-scheme: dark) {
    color: ${colors.textDark};
  }
`

export const CollectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const CollectionGrid = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const CollectionCard = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  border-radius: 20px;
  border: 1px solid ${colors.borderLight};
  background: ${colors.surfaceLight};
  box-shadow: 0 10px 30px rgba(42, 77, 105, 0.1);
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    border-color: ${colors.borderDark};
    background: ${colors.surfaceDark};
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.45);
  }
`

export const CollectionContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`

export const CollectionTitle = styled.h3`
  margin: 0;
  font-family: 'Newsreader', serif;
  font-size: 20px;
  font-weight: 700;
  color: ${colors.textLight};

  @media (prefers-color-scheme: dark) {
    color: ${colors.textDark};
  }
`

export const CollectionMeta = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: ${colors.subtleLight};

  @media (prefers-color-scheme: dark) {
    color: ${colors.subtleDark};
  }
`

export const CollectionSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  color: ${colors.textLight};

  strong {
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${colors.subtleLight};
    line-height: 1.5;
  }

  @media (prefers-color-scheme: dark) {
    color: ${colors.textDark};

    p {
      color: ${colors.subtleDark};
    }
  }
`

export const CollectionActions = styled.footer`
  border-top: 1px solid ${colors.borderLight};
  padding: 16px 24px;

  @media (prefers-color-scheme: dark) {
    border-top-color: ${colors.borderDark};
  }
`

export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`
