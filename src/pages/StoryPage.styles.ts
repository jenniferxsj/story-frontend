import styled from "styled-components";
import { colors } from "./DashboardPage.styles";

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const StoryMetaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 14px;
`;

export const StoryMetaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StoryLabel = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${colors.textLight};

  @media (prefers-color-scheme: dark) {
    color: ${colors.textDark};
  }
`;

export const StoryValue = styled.p`
  margin: 0;
  color: ${colors.subtleLight};

  @media (prefers-color-scheme: dark) {
    color: ${colors.subtleDark};
  }
`;

export const StoryPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 0 8px;
`;

export const PaginationInfo = styled.span`
  font-size: 14px;
  color: ${colors.subtleLight};

  @media (prefers-color-scheme: dark) {
    color: ${colors.subtleDark};
  }
`;
