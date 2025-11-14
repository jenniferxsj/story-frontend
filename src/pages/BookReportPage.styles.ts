import styled from 'styled-components'

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

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

export const CollectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const CollectionPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 0 8px;
`

export const PaginationInfo = styled.span`
  font-size: 14px;
  color: ${colors.subtleLight};

  @media (prefers-color-scheme: dark) {
    color: ${colors.subtleDark};
  }
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
`;