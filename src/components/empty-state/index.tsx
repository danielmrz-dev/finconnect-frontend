import { GlassesIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

type EmptyStateProps = {
  title: string;
  description: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GlassesIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
