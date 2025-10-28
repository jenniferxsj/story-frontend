import { Button, Form, Layout, Modal, Space, Typography } from 'antd'
import styled from 'styled-components'

const colors = {
  primary: '#1677ff',
  backgroundLight: '#ffffff',
  backgroundDark: '#001529',
  borderLight: '#d9d9d9',
  borderDark: '#424242',
  textPrimaryLight: 'rgba(0, 0, 0, 0.88)',
  textPrimaryDark: 'rgba(255, 255, 255, 0.85)',
  textSecondaryLight: 'rgba(0, 0, 0, 0.65)',
  textSecondaryDark: 'rgba(255, 255, 255, 0.65)',
  textTertiaryLight: 'rgba(0, 0, 0, 0.45)',
  textTertiaryDark: 'rgba(255, 255, 255, 0.45)',
}

export const WelcomeLayout = styled(Layout)`
  min-height: 100vh;
  background: ${colors.backgroundLight};

  @media (prefers-color-scheme: dark) {
    background: ${colors.backgroundDark};
  }
`

export const WelcomeHeader = styled(Layout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${colors.borderLight};

  @media (prefers-color-scheme: dark) {
    background-color: rgba(0, 21, 41, 0.9);
    border-bottom-color: ${colors.borderDark};
  }
`

export const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: ${colors.textPrimaryLight};

  @media (prefers-color-scheme: dark) {
    color: ${colors.textPrimaryDark};
  }
`

export const BrandIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: ${colors.primary};
  font-size: 20px;
`

export const BrandText = styled(Typography.Text)`
  && {
    font-size: 18px;
  }
`

export const HeaderActions = styled(Space)`
  && {
    display: inline-flex;
    align-items: center;
  }
`

export const HeaderButton = styled(Button)`
  && {
    min-width: 92px;
  }
`

export const WelcomeContent = styled(Layout.Content)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 96px 24px;
`

export const Hero = styled.div`
  max-width: 660px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const HeroTitle = styled(Typography.Title)`
  && {
    margin-bottom: 0;
    font-size: clamp(2.8rem, 4vw, 3.75rem);
    line-height: 1.1;
    color: ${colors.textPrimaryLight};

    @media (prefers-color-scheme: dark) {
      color: ${colors.textPrimaryDark};
    }
  }
`

export const HeroSubtitle = styled(Typography.Paragraph)`
  && {
    margin: 0;
    font-size: 18px;
    color: ${colors.textSecondaryLight};

    @media (prefers-color-scheme: dark) {
      color: ${colors.textSecondaryDark};
    }
  }
`

export const HeroActions = styled(Space)`
  && {
    margin-top: 24px;
    justify-content: center;
    flex-wrap: wrap;
    display: flex;
    gap: 16px;
  }
`

export const HeroButton = styled(Button)`
  && {
    min-width: 160px;
    font-weight: 500;
  }
`

export const WelcomeFooter = styled(Layout.Footer)`
  text-align: center;
  background-color: ${colors.backgroundLight};
  border-top: 1px solid ${colors.borderLight};
  padding: 24px 20px;

  @media (prefers-color-scheme: dark) {
    background-color: ${colors.backgroundDark};
    border-top-color: ${colors.borderDark};
  }
`

export const FooterLinks = styled(Space)`
  && {
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 12px;
    display: flex;
    gap: 24px;
  }
`

export const FooterLink = styled.a`
  color: ${colors.textTertiaryLight};
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary};
  }

  @media (prefers-color-scheme: dark) {
    color: ${colors.textTertiaryDark};
  }
`

export const FooterText = styled(Typography.Text)`
  && {
    color: ${colors.textTertiaryLight};

    @media (prefers-color-scheme: dark) {
      color: ${colors.textTertiaryDark};
    }
  }
`

export const AuthModal = styled(Modal)`
  .ant-modal-body {
    padding-top: 24px;
  }
`

export const AuthForm = styled(Form)`
  && {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`

export const SwitchPrompt = styled(Typography.Text)`
  && {
    display: block;
    text-align: center;
    margin-top: 16px;
    color: ${colors.textSecondaryLight};

    @media (prefers-color-scheme: dark) {
      color: ${colors.textSecondaryDark};
    }
  }
`

export const SwitchLink = styled(Typography.Link)`
  && {
    margin-left: 4px;
  }
`
