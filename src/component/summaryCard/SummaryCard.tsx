import {
  ActionRow,
  ActionRowButton,
  CollectionActions,
  CollectionCard,
  CollectionContent,
  CollectionMeta,
  CollectionSummary,
  CollectionTitle,
} from "./SummaryCard.styles";
import type { ReactNode } from "react";

interface SummaryCardProps {
  id: number | string;
  title: string;
  metadata: string;
  collectionKeyValue: { [key: string]: string };
  handleOnDetail?: (id: number | string) => void;
  handleOnDelete?: (id: number | string) => void;
  extraActions?: ReactNode;
}

const SummaryCard = ({
  id,
  title,
  metadata,
  collectionKeyValue,
  handleOnDetail,
  handleOnDelete,
  extraActions,
}: SummaryCardProps) => {
  return (
    <CollectionCard>
      <CollectionContent>
        <div>
          <CollectionTitle>{title}</CollectionTitle>
          <CollectionMeta>{metadata}</CollectionMeta>
        </div>
        {Object.entries(collectionKeyValue).map(([label, value]) => (
          <CollectionSummary key={label}>
            <strong>{label}:</strong>
            <p>{value}</p>
          </CollectionSummary>
        ))}
      </CollectionContent>
      <CollectionActions>
        <ActionRow>
          {handleOnDetail && (
            <ActionRowButton $variant="link" onClick={() => handleOnDetail(id)}>
              Detail
            </ActionRowButton>
          )}
          {extraActions}
          {handleOnDelete && (
            <ActionRowButton
              $variant="ghost"
              onClick={() => handleOnDelete(id)}
            >
              Delete
            </ActionRowButton>
          )}
        </ActionRow>
      </CollectionActions>
    </CollectionCard>
  );
};

export default SummaryCard;
