import styled from 'styled-components'
import { Breadcrumb, Button, Input } from 'antd'
import { colors } from './DashboardPage.styles'

export const StoryStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const BreadcrumbBar = styled(Breadcrumb)`
  font-size: 14px;
  color: ${colors.subtleLight};

  .ant-breadcrumb-link,
  .ant-breadcrumb-separator {
    color: ${colors.subtleLight};
  }

  .ant-breadcrumb-link a {
    color: ${colors.subtleLight};
  }
`

export const BreadcrumbCurrent = styled.span`
  color: #595959;
`

export const Card = styled.section<{ $padding?: string; $overflowHidden?: boolean }>`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  padding: ${({ $padding }) => $padding ?? '0'};
  overflow: ${({ $overflowHidden }) => ($overflowHidden ? 'hidden' : 'visible')};
`

export const CardInner = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
`

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`

export const FieldLabel = styled.div`
  font-size: 13px;
  color: ${colors.subtleLight};
  margin-bottom: 8px;
`

export const FieldValue = styled.div`
  font-size: 14px;
  color: ${colors.textLight};
`

export const FieldValueMuted = styled(FieldValue)`
  line-height: 1.7;
`

export const TitleValue = styled.div`
  font-family: 'Newsreader', serif;
  font-size: 22px;
  font-weight: 700;
  color: ${colors.textLight};
`

export const SummaryValue = styled.div`
  font-size: 14px;
  color: ${colors.textLight};
  line-height: 1.8;
`

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const DashedButton = styled(Button)`
  border-radius: 10px;
  border: 1px dashed #6366f1;
  background: #ffffff;
  color: #4f46e5;
  font-weight: 600;
  padding: 0 16px;
  height: 38px;
`

export const CardHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CardHeaderTight = styled(CardHeader)`
  gap: 16px;
`

export const CardTitle = styled.div`
  font-family: 'Newsreader', serif;
  font-size: 20px;
  font-weight: 700;
  color: ${colors.textLight};
`

export const SecondaryButton = styled(Button)`
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background: #ffffff;
  padding: 0 14px;
  height: 34px;
  font-weight: 500;
`

export const OutlineRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 24px;
  padding: 22px 24px;
  border-bottom: 1px solid #f5f5f5;
`

export const OutlineLabel = styled.div`
  color: #4f46e5;
  font-weight: 600;
`

export const OutlineValue = styled.div`
  font-size: 14px;
  color: ${colors.textLight};
  line-height: 1.8;
`

export const OutlineEmpty = styled.div`
  padding: 22px 24px;
  color: #8c8c8c;
`

export const OutlineFooter = styled.div`
  padding: 24px;
  text-align: center;
`

export const TextButton = styled(Button)`
  border: none;
  background: transparent;
  color: #4f46e5;
  font-weight: 600;
  box-shadow: none;
  padding: 0;
  height: auto;
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const FilterInput = styled(Input)`
  width: 240px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 6px 12px;
  outline: none;
`

export const IconButton = styled(Button)`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 0;
`

export const CardContent = styled.div`
  padding: 0 24px 24px;
`

export const MutedText = styled.div`
  padding: 18px 0;
  color: #8c8c8c;
`
