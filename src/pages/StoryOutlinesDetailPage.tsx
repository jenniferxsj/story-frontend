import { useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Spin } from "antd";
import { Content } from "./DashboardPage.styles";
import {
  CollectionWrapper,
  PageLayout,
} from "./BookReportPage.styles";
import {
  BreadcrumbBar,
  BreadcrumbCurrent,
  ButtonRow,
  Card,
  CardContent,
  CardHeader,
  CardHeaderTight,
  CardInner,
  CardTitle,
  DashedButton,
  FieldLabel,
  FieldValue,
  FieldValueMuted,
  FilterInput,
  HeaderActions,
  IconButton,
  InfoColumn,
  InfoGrid,
  InfoItem,
  MutedText,
  OutlineEmpty,
  OutlineFooter,
  OutlineLabel,
  OutlineRow,
  OutlineValue,
  SecondaryButton,
  StoryStack,
  SummaryValue,
  TextButton,
  TitleValue,
} from "./StoryOutlinesPage.styles";
import EmptyComponent from "../component/emptyContent/EmptyContent";
import { useUser } from "../context/UserContext";
import { useGetStoryOutlineById } from "../services/story";

type StoryDetailLocationState = {
  story?: {
    id: number;
    outlineId?: number;
    title: string;
    currentWords: number;
    targetWords: number;
    stateJson?: {
      storyOutline?: Record<string, string>;
    };
    createdAt: string;
  };
};

const parseJson = (value: string | null | undefined) => {
  if (!value) {
    return undefined;
  }
  try {
    return JSON.parse(value) as Record<string, unknown>;
  } catch {
    return undefined;
  }
};

const formatField = (value: unknown) => {
  if (Array.isArray(value)) {
    const items = value.filter(Boolean).map(String);
    return items.length > 0 ? items.join(" / ") : "—";
  }
  if (typeof value === "string") {
    return value.trim() ? value : "—";
  }
  if (value === null || value === undefined) {
    return "—";
  }
  return String(value);
};

const normalizeOutlineItems = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }
  if (typeof value === "string") {
    return [value];
  }
  return [];
};

const StoryOutlinesDetailPage = () => {
  const { isLoading } = useUser();
  const location = useLocation();
  const { story } = (location.state as StoryDetailLocationState) ?? {};
  const params = useParams();
  const outlineIdFromUrl = params.outlineId ? Number(params.outlineId) : undefined;
  const outlineId = outlineIdFromUrl ?? story?.outlineId ?? story?.id;

  const {
    data: storyOutlineDetail,
    isLoading: loadingOutline,
  } = useGetStoryOutlineById(outlineId);

  const aiOutlineJson = useMemo(
    () => parseJson(storyOutlineDetail?.aiResponseJson),
    [storyOutlineDetail?.aiResponseJson]
  );
  const userOutlineJson = storyOutlineDetail?.userOutlineJson ?? {};
  const outlineJson = aiOutlineJson ?? userOutlineJson;

  if (isLoading || loadingOutline) {
    return (
      <Content>
        <Spin />
      </Content>
    );
  }

  const storyTitle = storyOutlineDetail?.displayTitle ?? story?.title ?? "Untitled Story";
  const coreElements = formatField(outlineJson["主要元素"] ?? userOutlineJson["主要元素"]);
  const storyType = formatField(outlineJson["故事类型"] ?? userOutlineJson["故事类型"]);
  const tone = formatField(outlineJson["基调"] ?? userOutlineJson["基调"]);
  const coreSetting = formatField(outlineJson["核心设定"] ?? userOutlineJson["核心设定"]);
  const userNotes = formatField(storyOutlineDetail?.userNotes);
  const summaryFromOutline = normalizeOutlineItems(
    outlineJson["故事大纲"] ?? userOutlineJson["故事大纲"]
  )[0];
  const storySummary = formatField(
    outlineJson["故事总结"] ??
      userOutlineJson["故事总结"] ??
      outlineJson["核心设定"] ??
      userOutlineJson["核心设定"] ??
      summaryFromOutline
  );
  const outlineSections = normalizeOutlineItems(
    outlineJson["故事大纲"] ?? userOutlineJson["故事大纲"]
  ).map((item) => {
    const match = item.match(/^【([^】]+)】/);
    const label = match ? `[${match[1]}]` : "[段落]";
    const value = item.replace(/^【[^】]+】/, "").trim();
    return { label, value: value || item };
  });

  return (
    <Content>
      <PageLayout>
        <CollectionWrapper>
          {!story && !storyOutlineDetail ? (
            <EmptyComponent />
          ) : (
            <StoryStack>
              <BreadcrumbBar
                items={[
                  { title: <Link to="/">Home</Link> },
                  { title: <Link to="/outlines">Story Outlines</Link> },
                  { title: <BreadcrumbCurrent>{storyTitle}</BreadcrumbCurrent> },
                ]}
              />
              <Card $padding="32px">
                <CardInner>
                  <InfoGrid>
                    <InfoColumn>
                      <InfoItem>
                        <FieldLabel>Title</FieldLabel>
                        <TitleValue>{storyTitle}</TitleValue>
                      </InfoItem>
                      <InfoItem>
                        <FieldLabel>Story Type</FieldLabel>
                        <FieldValue>{storyType}</FieldValue>
                      </InfoItem>
                      <InfoItem>
                        <FieldLabel>基调</FieldLabel>
                        <FieldValue>{tone}</FieldValue>
                      </InfoItem>
                    </InfoColumn>

                    <InfoColumn>
                      <InfoItem>
                        <FieldLabel>Core Elements</FieldLabel>
                        <FieldValueMuted>{coreElements}</FieldValueMuted>
                      </InfoItem>
                      <InfoItem>
                        <FieldLabel>Core Setting</FieldLabel>
                        <FieldValueMuted>{coreSetting}</FieldValueMuted>
                      </InfoItem>
                      <InfoItem>
                        <FieldLabel>User Notes</FieldLabel>
                        <FieldValueMuted>{userNotes}</FieldValueMuted>
                      </InfoItem>
                    </InfoColumn>

                    <InfoItem>
                      <FieldLabel>Story Summary</FieldLabel>
                      <SummaryValue>{storySummary}</SummaryValue>
                    </InfoItem>
                  </InfoGrid>

                  <ButtonRow>
                    <DashedButton type="dashed">+ Add Custom Field</DashedButton>
                  </ButtonRow>
                </CardInner>
              </Card>

              <Card $overflowHidden>
                <CardHeader>
                  <CardTitle>Story Outline (故事大纲)</CardTitle>
                  <SecondaryButton>Save Draft</SecondaryButton>
                </CardHeader>

                <div>
                  {outlineSections.length > 0 ? (
                    outlineSections.map((section) => (
                      <OutlineRow key={`${section.label}-${section.value}`}>
                        <OutlineLabel>{section.label}</OutlineLabel>
                        <OutlineValue>{section.value}</OutlineValue>
                      </OutlineRow>
                    ))
                  ) : (
                    <OutlineEmpty>No outline data available.</OutlineEmpty>
                  )}
                  <OutlineFooter>
                    <TextButton type="text">+ Add Development Item</TextButton>
                  </OutlineFooter>
                </div>
              </Card>

              <Card $overflowHidden>
                <CardHeaderTight>
                  <CardTitle>Chapters (124)</CardTitle>
                  <HeaderActions>
                    <FilterInput placeholder="Filter chapters..." />
                    <IconButton type="default">↑</IconButton>
                    <IconButton type="default">↓</IconButton>
                  </HeaderActions>
                </CardHeaderTight>

                <CardContent>
                  <MutedText>No chapter data available yet.</MutedText>
                </CardContent>
              </Card>
            </StoryStack>
          )}
        </CollectionWrapper>
      </PageLayout>
    </Content>
  );
};

export default StoryOutlinesDetailPage;
