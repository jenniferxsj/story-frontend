import { Empty, Spin } from 'antd'
import styled from 'styled-components'

import { useUser } from '../context/UserContext'

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`

const StoryPage: React.FC = () => {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <Placeholder>
        <Spin />
      </Placeholder>
    )
  }

  const description = user?.username
    ? `Story Options are under construction, ${user.username}. Check back soon!`
    : 'Story Options are under construction. Check back soon!'

  return (
    <Placeholder>
      <Empty description={description} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Placeholder>
  )
}

export default StoryPage
