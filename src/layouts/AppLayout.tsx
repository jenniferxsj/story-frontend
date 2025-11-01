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
import styled from 'styled-components'
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
import { useGetCurrentUser, useLogout } from '../services/auth'

const BrandIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 20px;
  color: #2a4d69;

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`;

const tabItems: TabsProps['items'] = [
  { key: '/dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
  { key: '/reports', label: 'Book Report', icon: <BookOutlined /> },
  { key: '/stories', label: 'Story Options', icon: <StarOutlined /> },
]

const supportLink = { label: 'Help & Support', icon: <QuestionCircleOutlined />, href: '#' };

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const { data: currentUser, isLoading: loadingCurrentUser } = useGetCurrentUser();

  const logoutMutation = useLogout({
    onSuccess: () => {
      message.success('Signed out successfully.');
      navigate('/');
    },
    onError: () => {
      message.error('Unable to sign out. Please try again.');
    },
  });

  const activeKey = useMemo(() => {
    const match = tabItems?.find(({ key }) => location.pathname.startsWith(key))
    return match?.key ?? '/dashboard'
  }, [location.pathname])

  const handleTabChange: TabsProps['onChange'] = (key) => {
    if (key !== activeKey) {
      navigate(key)
    }
  }

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev)
  }

  const userMenuItems: MenuProps['items'] = [
      {
        key: 'logout',
        label: 'Log Out',
        icon: <LogoutOutlined />,
        disabled: logoutMutation.isPending,
      },
    ];
  
    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
      if (key === 'logout') {
        logoutMutation.mutate();
      }
    };

  if (loadingCurrentUser || !currentUser) {
    return <Spin />;
  }

  return (
    <AppMainLayout>
      <Sidebar $collapsed={isCollapsed}>
        <SidebarBrand $collapsed={isCollapsed}>
          <BrandContent $collapsed={isCollapsed}>
            <BrandIcon>
              <BookOutlined />
            </BrandIcon>
            <Title $collapsed={isCollapsed}>Story Tailor</Title>
          </BrandContent>
          {!isCollapsed && <CollapseButton
            aria-label='Collapse sidebar'
            onClick={() => setIsCollapsed(true)}
          >
            <MenuFoldOutlined />
          </CollapseButton>}
        </SidebarBrand>
        <SidebarNav $collapsed={isCollapsed} aria-label="Primary navigation">
          {isCollapsed ? <MenuUnfoldOutlined onClick={() => setIsCollapsed(false)} /> : tabItems?.map(({ label, icon, key }) => {
            const isActive = key === activeKey
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
            <Title>Welcome, {currentUser?.username ?? 'Momo'}!</Title>
          </HeaderStart>
          <HeaderActions>
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
          </HeaderActions>
        </Header>
        <Outlet />
      </Main>
      </AppMainLayout>)
}
