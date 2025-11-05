import { FilterOutlined, PlusOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import {
  ActionRow,
  ActionRowButton,
  ActionRowGroup,
  CollectionActions,
  CollectionCard,
  CollectionContent,
  CollectionGrid,
  CollectionMeta,
  CollectionSummary,
  CollectionTitle,
  CollectionWrapper,
  PageHeader,
  PageLayout,
  PageTitle,
  SearchField,
} from './BookReportPage.styles'
import { Content } from './DashboardPage.styles'
import { useUser } from '../context/UserContext'

const sampleReports = [
  {
    title: "Analysis of 'Dune'",
    author: 'Frank Herbert',
    note: 'Focus on the political intrigue and the Fremen culture.',
    styleSummary:
      'In the vast, arid expanse of Arrakis, a prophecy unfolds. A young duke, Paul Atreides, must navigate treacherous political currents and embrace a destiny intertwined with the planet’s enigmatic spice and its fierce inhabitants, the Fremen. Power, betrayal, and revolution brew beneath the desert sands.',
    appealSummary:
      'Perfect for readers who enjoy epic science fiction with deep world-building, complex political systems, and messianic character arcs.',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    note: 'Examine the character development of Scout and Jem.',
    styleSummary:
      'Through the innocent eyes of a young girl named Scout, the sleepy Southern town of Maycomb awakens to the harsh realities of prejudice and injustice. Her father, the principled lawyer Atticus Finch, defends a black man falsely accused, teaching his children—and the town—a profound lesson in moral courage.',
    appealSummary:
      'A timeless classic for those who appreciate coming-of-age stories that tackle significant social issues with grace and empathy.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    note: 'Compare themes of surveillance with modern technology.',
    styleSummary:
      'In a totalitarian superstate where Big Brother is always watching, Winston Smith works as a state clerk, altering historical records. He secretly yearns for truth and freedom, embarking on a forbidden love affair that marks him as an enemy of the all-powerful Party in a chilling vision of a world stripped of individuality.',
    appealSummary:
      'A must-read for fans of dystopian fiction and political commentary that remains shockingly relevant today.',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    note: 'Analyze the symbolism of the green light.',
    styleSummary:
      'Amidst the dazzling decadence of the Roaring Twenties, the enigmatic millionaire Jay Gatsby throws lavish parties, all in pursuit of a dream tied to the beautiful Daisy Buchanan. Narrated by his neighbor, Nick Carraway, the story is a poignant critique of the American Dream, love, and loss.',
    appealSummary:
      'A powerful novel for readers interested in classic American literature, themes of wealth, and tragic romance.',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    note: 'Focus on the social commentary of the era.',
    styleSummary:
      'In a spirited dance of manners, matrimony, and misjudgment, the headstrong Elizabeth Bennet clashes with the proud Mr. Darcy. This witty and romantic novel explores the societal pressures of 19th-century England, ultimately championing love that transcends class and first impressions.',
    appealSummary:
      'An essential read for lovers of classic romance, sharp wit, and insightful social satire.',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    note: "Describe the journey of Bilbo's character arc.",
    styleSummary:
      'A comfortable hobbit, Bilbo Baggins, is whisked away from his quiet life on an unexpected adventure with a company of dwarves and the wizard Gandalf. Their quest: to reclaim a stolen treasure from the fearsome dragon Smaug. It’s a tale of courage, friendship, and discovering the hero within.',
    appealSummary:
      'A charming entry point into high fantasy, perfect for all ages who enjoy grand adventures and whimsical worlds.',
  },
]

const BookReportPage: React.FC = () => {
  const { user, isLoading } = useUser()
  const searchPlaceholder = user?.username
    ? `Search ${user.username}'s reports...`
    : 'Search reports...'

  if (isLoading) {
    return (
      <Content>
        <Spin />
      </Content>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Content>
      <PageLayout>
        <PageHeader>
          <PageTitle>Book Reports</PageTitle>
            <SearchField placeholder={searchPlaceholder} type="search" />
            <ActionRowGroup>
              <ActionRowButton $variant="subtle">
                <FilterOutlined />
                Filter
              </ActionRowButton>
              <ActionRowButton $variant="primary">
                <PlusOutlined />
                New Report
              </ActionRowButton>
            </ActionRowGroup>
        </PageHeader>

        <CollectionWrapper>
          <CollectionGrid>
            {sampleReports.map(({ title, author, note, styleSummary, appealSummary }) => (
              <CollectionCard key={title}>
                <CollectionContent>
                  <div>
                    <CollectionTitle>{title}</CollectionTitle>
                    <CollectionMeta>by {author}</CollectionMeta>
                  </div>
                  <CollectionSummary>
                    <strong>User Note:</strong>
                    <p>{note}</p>
                  </CollectionSummary>
                  <CollectionSummary>
                    <strong>Styled Summary:</strong>
                    <p>{styleSummary}</p>
                  </CollectionSummary>
                  <CollectionSummary>
                    <strong>Appeal Summary:</strong>
                    <p>{appealSummary}</p>
                  </CollectionSummary>
                </CollectionContent>
                <CollectionActions>
                  <ActionRow>
                    <ActionRowButton $variant="link">Detail</ActionRowButton>
                    <ActionRowButton $variant="ghost">Delete</ActionRowButton>
                  </ActionRow>
                </CollectionActions>
              </CollectionCard>
            ))}
          </CollectionGrid>
        </CollectionWrapper>
      </PageLayout>
    </Content>
  )
}

export default BookReportPage
