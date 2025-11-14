import styled, { css } from "styled-components";
import { colors } from "../pages/DashboardPage.styles";

export const AppMainLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${colors.backgroundLight};
  color: ${colors.textLight};

  @media (prefers-color-scheme: dark) {
    background: ${colors.backgroundDark};
    color: ${colors.textDark};
  }
`;

interface SidebarStateProps {
  $collapsed: boolean
}

export const Sidebar = styled.aside<SidebarStateProps>`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  width: ${({ $collapsed }) => ($collapsed ? '72px' : '256px')};
  flex-shrink: 0;
  border-right: 1px solid ${colors.borderLight};
  background: ${colors.surfaceLight};
  overflow: hidden;

  flex-direction: column;
  align-items: stretch;

  @media (prefers-color-scheme: dark) {
    border-right-color: ${colors.borderDark};
    background: rgba(26, 26, 42, 0.5);
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 16px;
  flex: 1;
  overflow-y: auto;
`;

export const SidebarNavItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SidebarBrand = styled.div<SidebarStateProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 64px;
  border-bottom: 1px solid ${colors.borderLight};
  justify-content: space-between;

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      padding: 0 12px;
    `}

  @media (prefers-color-scheme: dark) {
    border-bottom-color: ${colors.borderDark};
  }
`;

export const BrandContent = styled.div<SidebarStateProps>`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
`;

export const Title = styled.h1<Partial<SidebarStateProps>>`
  margin: 0;
  font-family: 'Newsreader', serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.01em;

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      display: none;
    `}
`;

interface SidebarLinkProps {
  $active?: boolean
  $collapsed?: boolean
};

export const SidebarLink = styled.a<SidebarLinkProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.subtleLight};
  transition: all 0.2s ease;
  background: transparent;

  span {
    white-space: nowrap;
    transition: opacity 0.2s ease, max-width 0.25s ease;
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    max-width: ${({ $collapsed }) => ($collapsed ? '0px' : '200px')};
    overflow: hidden;
  }

  ${({ $active }) =>
    $active &&
    css`
      background: rgba(42, 77, 105, 0.1);
      color: ${colors.primary};
    `}

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      justify-content: center;
    `}

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${colors.primary};
  }

  @media (prefers-color-scheme: dark) {
    color: ${colors.subtleDark};

    ${({ $active }) =>
      $active &&
      css`
        background: rgba(67, 160, 168, 0.2);
        color: ${colors.accent};
      `}

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: ${colors.accent};
    }
  }
`;

export const SidebarFooter = styled.div<SidebarStateProps>`
  margin-top: auto;
  padding: 16px;
  border-top: 1px solid ${colors.borderLight};

  display: flex;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      padding: 16px 0;

      span {
        display: none;
      }
    `}

  @media (prefers-color-scheme: dark) {
    border-top-color: ${colors.borderDark};
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const SidebarSubNav = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 4px 0 0 20px;
  padding-left: 16px;

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 0;
    width: 1px;
    background: ${colors.borderLight};
  }

  @media (prefers-color-scheme: dark) {
    &::before {
      background: ${colors.borderDark};
    }
  }
`;

interface SidebarSubLinkProps {
  $active?: boolean
}

export const SidebarSubLink = styled.a<SidebarSubLinkProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  color: ${colors.subtleLight};
  transition: all 0.2s ease;
  background: transparent;

  ${({ $active }) =>
    $active &&
    css`
      background: rgba(42, 77, 105, 0.12);
      color: ${colors.primary};
      font-weight: 600;
    `}

  &:hover {
    background: rgba(42, 77, 105, 0.08);
    color: ${colors.primary};
  }

  @media (prefers-color-scheme: dark) {
    color: ${colors.subtleDark};

    ${({ $active }) =>
      $active &&
      css`
        background: rgba(67, 160, 168, 0.15);
        color: ${colors.accent};
      `}

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: ${colors.accent};
    }
  }
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 24px;
  height: 64px;
  border-bottom: 1px solid ${colors.borderLight};
  background: ${colors.surfaceLight};

  @media (min-width: 640px) {
    padding: 0 40px;
  }

  @media (prefers-color-scheme: dark) {
    border-bottom-color: ${colors.borderDark};
    background: rgba(26, 26, 42, 0.5);
  }
`;

export const HeaderStart = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MobileMenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease;

  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const CollapseButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease;

  @media (min-width: 768px) {
    display: inline-flex;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

interface AvatarProps {
  $image: string
};

export const Avatar = styled.div<AvatarProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $image }) => `url(${$image}) center/cover no-repeat`};
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;
