import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { Content } from "./DashboardPage.styles";
import {
  ActionRowGroup,
  CollectionWrapper,
  PageHeader,
  PageLayout,
  SearchField,
} from "./BookReportPage.styles";
import EmptyComponent from "../component/emptyContent/EmptyContent";
import { useUser } from "../context/UserContext";
import { ActionRowButton } from "../component/summaryCard/SummaryCard.styles";


type StoryDetailLocationState = {
  story?: {
    id: string;
    title: string;
    currentWords: number;
    targetWords: number;
    stateJson?: {
      storyOutline?: Record<string, string>;
    };
    createdAt: string;
  };
};

const mockOutlineSections = [
  {
    label: "[开端]",
    value:
      "Detective Ren wakes up in a neon-drenched Kyoto alley with a missing memory chip.",
  },
  {
    label: "[发展]",
    value:
      "He discovers a sequence of murders linked to high-profile cybernetic surgeons.",
  },
  {
    label: "[发展]",
    value:
      "Ren meets Mika, a rogue AI specialist who reveals the existence of the Crimson Labyrinth.",
  },
  {
    label: "[转折]",
    value:
      "The very police force Ren works for is revealed to be harvesting souls for the Architect.",
  },
  {
    label: "[高潮]",
    value:
      "Ren infiltrates the Architect's digital core to upload a virus, fighting his own cybernetic hallucinations.",
  },
  {
    label: "[结局]",
    value:
      "The city is freed from the digital ghost, but Ren must sacrifice his remaining humanity to seal the breach.",
  },
];

const mockChapters = [
  {
    id: 1,
    title: "Chapter 1: The Neon Rain",
    wordCount: 2150,
    status: "Completed",
    lastModified: "2023-10-26",
  },
  {
    id: 2,
    title: "Chapter 2: Echoes in the Chrome",
    wordCount: 2310,
    status: "Completed",
    lastModified: "2023-10-28",
  },
  {
    id: 3,
    title: "Chapter 3: The Labyrinth's Heart",
    wordCount: 2500,
    status: "Completed",
    lastModified: "2023-11-02",
  },
  {
    id: 4,
    title: "Chapter 4: Ghost in the Code",
    wordCount: 1980,
    status: "In Progress",
    lastModified: "2023-11-05",
  },
  {
    id: 5,
    title: "Chapter 5: The Memory Broker",
    wordCount: 0,
    status: "Not Started",
    lastModified: "2023-11-05",
  },
];

const getStatusStyle = (status: string) => {
  if (status === "Completed") {
    return {
      color: "#389e0d",
      background: "#f6ffed",
      border: "1px solid #b7eb8f",
    };
  }

  if (status === "In Progress") {
    return {
      color: "#1d39c4",
      background: "#f0f5ff",
      border: "1px solid #adc6ff",
    };
  }

  return {
    color: "#595959",
    background: "#fafafa",
    border: "1px solid #d9d9d9",
  };
};

const StoryOutlinesPage = () => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  const { story } = (location.state as StoryDetailLocationState) ?? {};

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Content>
        <Spin />
      </Content>
    );
  }

  const storyTitle = story?.title ?? "The Crimson Labyrinth";
  const storyOutline = story?.stateJson?.storyOutline;
  const coreElements = storyOutline?.["核心元素"] ?? "Cyberpunk, Noir, Mystery, Artificial Intelligence";
  const storySummary =
    storyOutline?.["故事总结"] ??
    "In the rain-slicked streets of Neo-Kyoto, a jaded detective hunts a digital ghost, a killer who erases victims from existence.";
  const storyType = storyOutline?.["故事类型"] ?? "AI Generated Novel";
  const setting = storyOutline?.["故事背景"] ?? "Neo-Kyoto, 2242";
  const coreSetting =
    storyOutline?.["核心设定"] ??
    "A futuristic city shrouded in perpetual twilight, governed by arcane technologies.";
  const userNotes =
    storyOutline?.["用户备注"] ??
    "Focus on the psychological toll of cybernetic enhancement. Keep the tone melancholic.";
  const customFields = [
    {
      key: "Protagonist's Flaw",
      value: storyOutline?.["主角缺陷"] ?? "Over-reliance on tech",
    },
    {
      key: "Main Antagonist",
      value: storyOutline?.["主要反派"] ?? "The Architect (Rogue AI)",
    },
  ];

  return (
    <Content>
      <PageLayout>
        <CollectionWrapper>
          {!story ? (
            <EmptyComponent />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #f0f0f0",
                  borderRadius: 16,
                  padding: 32,
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    color: "#8c8c8c",
                    marginBottom: 16,
                  }}
                >
                  <Link
                    to="/"
                    style={{ color: "#8c8c8c", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                  <span>/</span>
                  <Link
                    to="/stories"
                    style={{ color: "#8c8c8c", textDecoration: "none" }}
                  >
                    Stories
                  </Link>
                  <span>/</span>
                  <span style={{ color: "#595959" }}>{storyTitle}</span>
                </div>

                <h1
                  style={{
                    margin: 0,
                    fontSize: 40,
                    lineHeight: 1.15,
                    fontWeight: 700,
                    color: "#141414",
                  }}
                >
                  Story Details
                </h1>

                <div
                  style={{
                    marginTop: 24,
                    border: "1px solid #f0f0f0",
                    borderRadius: 16,
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      gap: 24,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 13, color: "#8c8c8c", marginBottom: 8 }}>Title</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: "#141414" }}>{storyTitle}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: "#8c8c8c", marginBottom: 8 }}>Story Type</div>
                        <div style={{ color: "#262626" }}>{storyType}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: "#8c8c8c", marginBottom: 8 }}>Setting</div>
                        <div style={{ color: "#262626" }}>{setting}</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 13, color: "#8c8c8c", marginBottom: 8 }}>Core Elements</div>
                        <div style={{ color: "#262626", lineHeight: 1.7 }}>{coreElements}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: "#8c8c8c", marginBottom: 8 }}>Core Setting</div>
                        <div style={{ color: "#262626", lineHeight: 1.7 }}>{coreSetting}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: "#8c8c8c", marginBottom: 8 }}>User Notes</div>
                        <div style={{ color: "#262626", lineHeight: 1.7 }}>{userNotes}</div>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: 13, color: "#8c8c8c", marginBottom: 8 }}>Story Summary</div>
                      <div style={{ color: "#262626", lineHeight: 1.8 }}>{storySummary}</div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 24 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#141414", marginBottom: 16 }}>
                      Custom Fields
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: 16,
                      }}
                    >
                      {customFields.map((field) => (
                        <div
                          key={field.key}
                          style={{
                            border: "1px solid #f0f0f0",
                            borderRadius: 12,
                            padding: 16,
                            minHeight: 92,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: 8,
                          }}
                        >
                          <div style={{ fontSize: 13, color: "#8c8c8c" }}>{field.key}</div>
                          <div style={{ color: "#262626", fontWeight: 500 }}>{field.value}</div>
                        </div>
                      ))}
                      <button
                        type="button"
                        style={{
                          minHeight: 92,
                          borderRadius: 12,
                          border: "1px dashed #6366f1",
                          background: "#ffffff",
                          color: "#4f46e5",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        + Add Custom Field
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #f0f0f0",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
                }}
              >
                <div
                  style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#141414" }}>
                    Story Outline (故事大纲)
                  </div>
                  <button
                    type="button"
                    style={{
                      borderRadius: 10,
                      border: "1px solid #d9d9d9",
                      background: "#ffffff",
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Save Draft
                  </button>
                </div>

                <div>
                  {mockOutlineSections.map((section) => (
                    <div
                      key={`${section.label}-${section.value}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        gap: 24,
                        padding: "22px 24px",
                        borderBottom: "1px solid #f5f5f5",
                      }}
                    >
                      <div style={{ color: "#4f46e5", fontWeight: 600 }}>{section.label}</div>
                      <div style={{ color: "#262626", lineHeight: 1.8 }}>{section.value}</div>
                    </div>
                  ))}
                  <div style={{ padding: 24, textAlign: "center" }}>
                    <button
                      type="button"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#4f46e5",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      + Add Development Item
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #f0f0f0",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
                }}
              >
                <div
                  style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#141414" }}>
                    Chapters (124)
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <input
                      placeholder="Filter chapters..."
                      style={{
                        width: 240,
                        border: "1px solid #e5e7eb",
                        borderRadius: 10,
                        padding: "10px 14px",
                        outline: "none",
                      }}
                    />
                    <button
                      type="button"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        border: "1px solid #e5e7eb",
                        background: "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        border: "1px solid #e5e7eb",
                        background: "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      ↓
                    </button>
                  </div>
                </div>

                <div style={{ padding: "0 24px 24px" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: "18px 0", color: "#8c8c8c", fontWeight: 600 }}>
                          Chapter Title
                        </th>
                        <th style={{ textAlign: "left", padding: "18px 0", color: "#8c8c8c", fontWeight: 600 }}>
                          Word Count
                        </th>
                        <th style={{ textAlign: "left", padding: "18px 0", color: "#8c8c8c", fontWeight: 600 }}>
                          Status
                        </th>
                        <th style={{ textAlign: "left", padding: "18px 0", color: "#8c8c8c", fontWeight: 600 }}>
                          Last Modified
                        </th>
                        <th style={{ textAlign: "right", padding: "18px 0", color: "#8c8c8c", fontWeight: 600 }}>
                          
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockChapters.map((chapter) => (
                        <tr key={chapter.id} style={{ borderTop: "1px solid #f5f5f5" }}>
                          <td style={{ padding: "18px 0", color: "#262626", fontWeight: 500 }}>
                            {chapter.title}
                          </td>
                          <td style={{ padding: "18px 0", color: "#4f46e5" }}>
                            {chapter.wordCount.toLocaleString()}
                          </td>
                          <td style={{ padding: "18px 0" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "4px 10px",
                                borderRadius: 999,
                                fontSize: 12,
                                fontWeight: 600,
                                ...getStatusStyle(chapter.status),
                              }}
                            >
                              {chapter.status}
                            </span>
                          </td>
                          <td style={{ padding: "18px 0", color: "#595959" }}>
                            {dayjs(chapter.lastModified).format("YYYY-MM-DD")}
                          </td>
                          <td style={{ padding: "18px 0", textAlign: "right" }}>
                            <button
                              type="button"
                              style={{
                                border: "none",
                                background: "transparent",
                                color: "#4f46e5",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "#8c8c8c",
                      fontSize: 14,
                    }}
                  >
                    <div>Showing 1 to 5 of 124 chapters</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button
                        type="button"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          border: "1px solid #e5e7eb",
                          background: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          border: "none",
                          background: "#4f46e5",
                          color: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        1
                      </button>
                      <button
                        type="button"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          border: "1px solid #e5e7eb",
                          background: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        2
                      </button>
                      <button
                        type="button"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          border: "1px solid #e5e7eb",
                          background: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        3
                      </button>
                      <span>...</span>
                      <button
                        type="button"
                        style={{
                          minWidth: 42,
                          height: 32,
                          borderRadius: 8,
                          border: "1px solid #e5e7eb",
                          background: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        25
                      </button>
                      <button
                        type="button"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          border: "1px solid #e5e7eb",
                          background: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CollectionWrapper>
      </PageLayout>
    </Content>
  );
};

export default StoryOutlinesPage;
