import { useEffect, useState, type MouseEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { BookFilled } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  AuthForm,
  AuthModal,
  Brand,
  BrandIcon,
  BrandText,
  FooterLink,
  FooterLinks,
  FooterText,
  FormActions,
  HeaderActions,
  HeaderButton,
  Hero,
  HeroActions,
  HeroButton,
  HeroSubtitle,
  HeroTitle,
  SwitchLink,
  SwitchPrompt,
  WelcomeContent,
  WelcomeFooter,
  WelcomeHeader,
  WelcomeLayout,
} from './WelcomePage.styles'
import {
  useGetCurrentUser,
  useLogin,
  useLogout,
  useSignup,
  type LoginPayload,
  type SignupPayload,
} from '../services/auth'

const footerLinks = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
]

type AuthTabKey = 'signin' | 'signup'

export function WelcomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeAuthTab, setActiveAuthTab] = useState<AuthTabKey>('signin')
  const [signInForm] = Form.useForm<LoginPayload>()
  const [signUpForm] = Form.useForm<SignupPayload>()
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: currentUser } = useGetCurrentUser()
  const logoutMutation = useLogout({
    onSuccess: () => {
      message.success('Signed out successfully.')
      queryClient.removeQueries({ queryKey: ['current-user'] })
    },
    onError: () => {
      message.error('Unable to sign out. Please try again.')
    },
  })

  const locationState = location.state
  const backFromState = typeof locationState?.back === 'string' ? locationState.back : undefined
  const safeBackFromState =
    backFromState && backFromState.startsWith('/') ? backFromState : undefined

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const handleOpenAuthModal = (tab: AuthTabKey) => {
    setActiveAuthTab(tab)
    setIsAuthModalOpen(true)
  }

  const loginMutation = useLogin({
    onSuccess: () => {
      message.success('Signed in successfully.')
      signInForm.resetFields()
      handleCloseAuthModal()
      const destination =
        safeBackFromState && safeBackFromState !== '/' ? safeBackFromState : '/dashboard'
      navigate(destination)
    },
    onError: () => {
      message.error('Unable to sign in. Please try again.')
    },
  })

  const signupMutation = useSignup({
    onSuccess: () => {
      message.success('Account created successfully.')
      signUpForm.resetFields()
      setActiveAuthTab('signin')
    },
    onError: () => {
      message.error('Unable to sign up. Please try again.')
    },
  })

  useEffect(() => {
    if (!isAuthModalOpen) {
      signInForm.resetFields()
      signUpForm.resetFields()
    }
  }, [isAuthModalOpen, signInForm, signUpForm])

  useEffect(() => {
    if (!location.search) {
      return
    }

    const params = new URLSearchParams(location.search)
    const reason = params.get('reason')
    const rawBack = params.get('back')
    const safeBack = rawBack && rawBack.startsWith('/') ? rawBack : undefined

    if (reason === 'auth') {
      message.warning('Please sign in to continue.')
      const nextUrl = new URL(window.location.href)
      nextUrl.search = ''
      window.history.replaceState(
        safeBack ? { ...window.history.state, usr: { back: safeBack } } : window.history.state,
        '',
        nextUrl,
      )
      if (safeBack) {
        navigate(location.pathname, { replace: true, state: { back: safeBack } })
      }
    } else if (reason === 'expired') {
      message.warning('Your session expired. Please sign in again.')
      navigate(location.pathname, {
        replace: true,
        state: safeBack ? { back: safeBack } : undefined,
      })
    }
  }, [location.pathname, location.search, navigate])

  const handleSwitchTab = (event: MouseEvent<HTMLAnchorElement>, tab: AuthTabKey) => {
    event.preventDefault()
    setActiveAuthTab(tab)
  }

  const isSignInActive = activeAuthTab === 'signin'
  const renderAuthForm = isSignInActive ? (
    <AuthForm
      form={signInForm}
      layout="vertical"
      onFinish={(values) => loginMutation.mutate(values as LoginPayload)}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input placeholder="name@example.com" autoComplete="email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password placeholder="Enter your password" autoComplete="current-password" />
      </Form.Item>
      <FormActions>
        <Button onClick={handleCloseAuthModal}>Cancel</Button>
        <Button htmlType="submit" loading={loginMutation.isPending} type="primary">
          Sign In
        </Button>
      </FormActions>
      <SwitchPrompt>
        New to Story Tailor?
        <SwitchLink href="#" onClick={(event) => handleSwitchTab(event, 'signup')}>
          Create an account
        </SwitchLink>
      </SwitchPrompt>
    </AuthForm>
  ) : (
    <AuthForm
      form={signUpForm}
      layout="vertical"
      onFinish={(values) => signupMutation.mutate(values as SignupPayload)}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input placeholder="Jane Doe" autoComplete="name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input placeholder="name@example.com" autoComplete="email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please create a password' },
          { min: 8, message: 'Password must be at least 8 characters long' },
        ]}
      >
        <Input.Password placeholder="Create a password" autoComplete="new-password" />
      </Form.Item>
      <FormActions>
        <Button onClick={handleCloseAuthModal}>Cancel</Button>
        <Button htmlType="submit" loading={signupMutation.isPending} type="primary">
          Create Account
        </Button>
      </FormActions>
      <SwitchPrompt>
        Already have an account?
        <SwitchLink href="#" onClick={(event) => handleSwitchTab(event, 'signin')}>
          Sign in
        </SwitchLink>
      </SwitchPrompt>
    </AuthForm>
  )

  return (
    <WelcomeLayout>
      <WelcomeHeader role="banner">
        <Brand>
          <BrandIcon aria-hidden>
            <BookFilled />
          </BrandIcon>
          <BrandText strong>
            Story Tailor
          </BrandText>
        </Brand>
        <HeaderActions size="middle">
          {currentUser ? (
            <>
              <HeaderButton onClick={() => navigate('/dashboard')} type="primary">
                Go to Dashboard
              </HeaderButton>
              <Button danger loading={logoutMutation.isPending} onClick={() => logoutMutation.mutate()}>
                Log Out
              </Button>
            </>
          ) : (
            <HeaderButton onClick={() => handleOpenAuthModal('signin')} type="primary">
              Sign In
            </HeaderButton>
          )}
        </HeaderActions>
      </WelcomeHeader>
      <WelcomeContent>
        <Hero>
          <HeroTitle>Welcome to Story Tailor</HeroTitle>
          <HeroSubtitle>
            Generate insightful book reports and unique AI stories in minutes. Your personal writing
            assistant for crafting compelling narratives, instantly.
          </HeroSubtitle>
          <HeroActions size="middle">
            {currentUser ? (
              <HeroButton onClick={() => navigate('/dashboard')} size="large" type="primary">
                Open Dashboard
              </HeroButton>
            ) : (
              <HeroButton onClick={() => handleOpenAuthModal('signin')} size="large" type="primary">
                Get Started
              </HeroButton>
            )}
          </HeroActions>
        </Hero>
      </WelcomeContent>
      <WelcomeFooter>
        <nav aria-label="footer">
          <FooterLinks size="middle">
            {footerLinks.map(({ label, href }) => (
              <FooterLink key={label} href={href}>
                {label}
              </FooterLink>
            ))}
          </FooterLinks>
        </nav>
        <FooterText>© 2025 Story Tailor. All Rights Reserved.</FooterText>
      </WelcomeFooter>
      <AuthModal
        destroyOnHidden
        footer={null}
        onCancel={handleCloseAuthModal}
        open={isAuthModalOpen}
        title="Access Story Tailor"
      >
        {renderAuthForm}
      </AuthModal>
    </WelcomeLayout>
  )
}
