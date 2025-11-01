import { Empty } from 'antd'
import styled from 'styled-components'

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`

export function StoryPage() {
  return (
    <Placeholder>
      <Empty
        description="Story Options are under construction. Check back soon!"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </Placeholder>
  )
}
