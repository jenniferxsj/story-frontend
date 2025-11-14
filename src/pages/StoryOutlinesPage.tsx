import { Content, Section, SectionHeading } from './DashboardPage.styles'
import { PageLayout } from './BookReportPage.styles'
import EmptyComponent from '../component/emptyContent/EmptyContent'

const StoryOutlinesPage = () => {
  return (
    <Content>
      <PageLayout>
        <Section>
          <SectionHeading>
            <h2>Story Outlines</h2>
            <p>Organize outlines and revisit drafts from one place.</p>
          </SectionHeading>
        </Section>
        <EmptyComponent />
      </PageLayout>
    </Content>
  )
}

export default StoryOutlinesPage
