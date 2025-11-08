import {
  BookOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Dropdown, message, Spin, type MenuProps, type TabsProps } from 'antd'
import { useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AppMainLayout,
  Avatar,
  BrandContent,
  CollapseButton,
  Header,
  HeaderActions,
  HeaderStart,
  Main,
  MobileMenuButton,
  Sidebar,
  SidebarBrand,
  SidebarFooter,
  SidebarLink,
  SidebarNav,
  Title,
} from './AppLayout.styles'
import { useLogout } from '../services/auth'
import { useUser } from '../context/UserContext'
import { useQueryClient } from '@tanstack/react-query'
import IconComponent from '../component/Icon'

const tabItems: TabsProps['items'] = [
  { key: '/dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
  { key: '/reports', label: 'Book Report', icon: <BookOutlined /> },
  { key: '/stories', label: 'Story Options', icon: <StarOutlined /> },
]

const supportLink = { label: 'Help & Support', icon: <QuestionCircleOutlined />, href: '#' };

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, isLoading: loadingCurrentUser } = useUser()

  const logoutMutation = useLogout({
    onSuccess: () => {
      message.success('Signed out successfully.')
      queryClient.removeQueries({ queryKey: ['current-user'] })
      navigate('/')
    },
    onError: () => {
      message.error('Unable to sign out. Please try again.')
    },
  })

  const activeTab = useMemo(() => {
    const match = tabItems?.find(({ key }) => location.pathname.startsWith(key))
    return match ?? tabItems?.[0]
  }, [location.pathname])

  const handleTabChange: TabsProps['onChange'] = (key) => {
    if (key !== activeTab?.key) {
      navigate(key)
    }
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Log Out',
      icon: <LogoutOutlined />,
      disabled: logoutMutation.isPending,
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logoutMutation.mutate()
    }
  }

  if (loadingCurrentUser || !user) {
    return <Spin />
  }

  return (
    <AppMainLayout>
      <Sidebar $collapsed={isCollapsed}>
        <SidebarBrand $collapsed={isCollapsed}>
          <BrandContent $collapsed={isCollapsed}>
            <IconComponent />
            <Title $collapsed={isCollapsed}>Story Tailor</Title>
          </BrandContent>
          <CollapseButton
            onClick={() => setIsCollapsed(true)}
          >
            {!isCollapsed && <MenuFoldOutlined />}
          </CollapseButton>
        </SidebarBrand>
        <SidebarNav aria-label="Primary navigation">
          {isCollapsed && <MenuUnfoldOutlined style={{marginLeft: '4px'}} onClick={() => setIsCollapsed(false)}/>}
          {!isCollapsed && tabItems?.map(({ label, icon, key }) => {
            const isActive = key === activeTab?.key
            return (
              <SidebarLink
                key={key}
                $active={isActive}
                $collapsed={isCollapsed}
                href={key}
                onClick={(event) => {
                  event.preventDefault()
                  handleTabChange(key)
                }}
              >
                {icon}
                {!isCollapsed && <span>{label}</span>}
              </SidebarLink>
            )
          })}
        </SidebarNav>
        <SidebarFooter $collapsed={isCollapsed}>
          <SidebarLink $collapsed={isCollapsed} href={supportLink.href}>
            {supportLink.icon}
            {!isCollapsed && <span>{supportLink.label}</span>}
          </SidebarLink>
        </SidebarFooter>
      </Sidebar>
      <Main>
        <Header>
          <HeaderStart>
            <MobileMenuButton aria-label="Open navigation">
              <MenuOutlined />
            </MobileMenuButton>
            <Title>{activeTab?.label ?? 'Dashboard'}</Title>
          </HeaderStart>
          <HeaderActions>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>Welcome {user.username ?? 'User'}</span>
              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: handleMenuClick,
                }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Avatar
                  $image="https://lh3.googleusercontent.com/aida-public/AB6AXuBdRNtZ16GzoWr-5G3wOBRXbBWati6tfb7fsK2RaPSWmbm5bcBZZiKs7zuG-4Wy7Y29fuTJ5R7fXo99mUQr8jMvEuX52PjVfpTtUZtscMCyjHTIap_QatlCOYN5liJTWZNlpT67Le6sCf_ZQbhzJPEMI3dn2mUsN_G-P1At5JehxLWsYT2SvTnYXEppnHXxs4lR8w7TRQRUhe3kgySSA-uP1XbUtHWbUwltvuyO7J7KdMB61qi1F0qK3etk1DH51ZY3qCyjjDodTBo"
                  role="button"
                  aria-label="Account menu"
                  tabIndex={0}
                />
              </Dropdown>
            </div>
          </HeaderActions>
        </Header>
        <Outlet />
      </Main>
      </AppMainLayout>)
}
