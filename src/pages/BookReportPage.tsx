import { Empty } from 'antd'
import styled from 'styled-components'

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`

export function BookReportPage() {
  return (
    <Placeholder>
      <Empty
        description="Book Report workspace coming soon. Stay tuned!"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </Placeholder>
  )
}
