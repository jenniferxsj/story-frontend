import styled from "styled-components";
import { colors } from "../../pages/DashboardPage.styles";

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 16px;
  text-align: center;
  font-size: 14px;
  color: ${colors.subtleLight};

  svg {
    font-size: 48px;
    color: ${colors.borderLight};
  }

  @media (prefers-color-scheme: dark) {
    color: ${colors.subtleDark};

    svg {
      color: ${colors.borderDark};
    }
  }
`;