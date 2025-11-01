import {
  ArrowRightOutlined,
  BookOutlined,
  DashboardOutlined,
  DeleteOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ActionCard,
  Avatar,
  BadgeDot,
  BrandIcon,
  CardBody,
  CardFooter,
  CardIcon,
  CardWatermark,
  Content,
  DashboardLayout,
  Header,
  HeaderActions,
  HeaderStart,
  Main,
  MobileMenuButton,
  QuickStartGrid,
  ReportActionButton,
  ReportActions,
  ReportCard,
  ReportExcerpt,
  ReportFooter,
  ReportMeta,
  ReportsGrid,
  Section,
  SectionHeader,
  SectionHeading,
  SectionLink,
  SectionStack,
  Sidebar,
  SidebarBrand,
  SidebarFooter,
  SidebarLink,
  SidebarNav,
  StatusBadge,
  TableAction,
  TableWrapper,
  Title,
  VisuallyHidden,
} from './DashboardPage.styles';
import { useGetCurrentUser, useLogout } from '../services/auth';
import { useGetCurrentUserProfiles } from '../services/profile';
import dayjs from 'dayjs';
import { useGetCurrentUserStories } from '../services/story';

const formatDate = (value: string) => {
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format('MMM DD, YYYY') : value;
}

const sidebarLinks = [
  { label: 'Dashboard', icon: <DashboardOutlined />, href: '#', active: true },
  { label: 'Book Report', icon: <BookOutlined />, href: '#' },
  { label: 'Story Options', icon: <StarOutlined />, href: '#' },
];

const supportLink = { label: 'Help & Support', icon: <QuestionCircleOutlined />, href: '#' };

const quickStartCards = [
  {
    key: 'reports',
    title: 'Book Report Generator',
    description: 'Analyze any book and create a comprehensive report.',
    icon: <BookOutlined />,
    accent: 'primary' as const,
    href: '#',
  },
  {
    key: 'stories',
    title: 'AI Story Generation',
    description: 'Bring your ideas to life with an AI-powered partner.',
    icon: <StarOutlined />,
    accent: 'accent' as const,
    href: '#',
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: currentUser, isLoading: loadingCurrentUser } = useGetCurrentUser();
  const { data: profiles, isLoading: loadingProfiles } = useGetCurrentUserProfiles(currentUser?.username, 0, 3, 'createdAt,desc');
  const { data: stories, isLoading: loadingStories } = useGetCurrentUserStories(currentUser?.username, 0, 5, 'createdAt,desc');

  const logoutMutation = useLogout({
    onSuccess: () => {
      message.success('Signed out successfully.');
      navigate('/');
    },
    onError: () => {
      message.error('Unable to sign out. Please try again.');
    },
  });

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

  if (loadingCurrentUser || loadingProfiles || !currentUser || !profiles || loadingStories || !stories) {
    return <Spin />;
  };

  return (
    <DashboardLayout>
      <Sidebar>
        <SidebarBrand>
          <BrandIcon>
            <BookOutlined />
          </BrandIcon>
          <Title>Story Tailor</Title>
        </SidebarBrand>
        <SidebarNav aria-label="Primary navigation">
          {sidebarLinks.map(({ label, icon, href, active }) => (
            <SidebarLink key={label} $active={active} href={href}>
              {icon}
              <span>{label}</span>
            </SidebarLink>
          ))}
        </SidebarNav>
        <SidebarFooter>
          <SidebarLink href={supportLink.href}>
            {supportLink.icon}
            <span>{supportLink.label}</span>
          </SidebarLink>
        </SidebarFooter>
      </Sidebar>
      <Main>
        <Header>
          <HeaderStart>
            <MobileMenuButton aria-label="Open navigation">
              <MenuOutlined />
            </MobileMenuButton>
            <Title>Welcome, {currentUser?.username ?? 'User'}!</Title>
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
        <Content>
          <SectionStack>
            <Section aria-labelledby="start-creating">
              <SectionHeading>
                <h2 id="start-creating">Start Creating</h2>
                <p>Choose an option below to begin a new project.</p>
              </SectionHeading>
              <QuickStartGrid>
                {quickStartCards.map(({ key, title, description, icon, accent, href }) => (
                  <ActionCard key={key} $accent={accent} href={href}>
                    <CardIcon>{icon}</CardIcon>
                    <CardBody>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </CardBody>
                    <CardFooter>
                      <span>Start Now</span>
                      <ArrowRightOutlined />
                    </CardFooter>
                    <CardWatermark aria-hidden>
                      {icon}
                    </CardWatermark>
                  </ActionCard>
                ))}
              </QuickStartGrid>
            </Section>

            <Section aria-labelledby="recent-reports">
              <SectionHeader>
                <h2 id="recent-reports">Recent Book Reports</h2>
                <SectionLink href="#">
                  <span>View All</span>
                  <ArrowRightOutlined />
                </SectionLink>
              </SectionHeader>
              <ReportsGrid>
                {profiles.map(({ title, author, styleSummary, createdAt }) => (
                  <ReportCard key={title}>
                    <ReportMeta>
                      <h3>{title}</h3>
                      <p>by {author}</p>
                    </ReportMeta>
                    <ReportExcerpt>{styleSummary}</ReportExcerpt>
                    <ReportFooter>
                      <span>{formatDate(createdAt)}</span>
                      <ReportActions>
                        <ReportActionButton aria-label={`Edit ${title}`}>
                          <EditOutlined />
                        </ReportActionButton>
                        <ReportActionButton aria-label={`Delete ${title}`}>
                          <DeleteOutlined />
                        </ReportActionButton>
                      </ReportActions>
                    </ReportFooter>
                  </ReportCard>
                ))}
              </ReportsGrid>
            </Section>

            <Section aria-labelledby="recent-stories">
              <SectionHeader>
                <h2 id="recent-stories">Recent Generated Stories</h2>
                <SectionLink href="#">
                  <span>View All</span>
                  <ArrowRightOutlined />
                </SectionLink>
              </SectionHeader>
              <TableWrapper>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Progress (current/target words)</th>
                      <th scope="col">Last Modified</th>
                      <th scope="col">
                        <VisuallyHidden>Actions</VisuallyHidden>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stories.map(({ title, currentWords, targetWords, createdAt }) => (
                      <tr key={title}>
                        <td>{title}</td>
                        <td>
                          {currentWords} out of {targetWords}
                        </td>
                        <td>{formatDate(createdAt)}</td>
                        <td>
                          <TableAction href={'#'}>{'Edit'}</TableAction>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrapper>
            </Section>
          </SectionStack>
        </Content>
      </Main>
    </DashboardLayout>
  );
};

export default DashboardPage;
