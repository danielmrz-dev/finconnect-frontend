import { GlassesIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

export const EmptyState: React.FC = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GlassesIcon />
        </EmptyMedia>
        <EmptyTitle>Não há transações cadastradas</EmptyTitle>
        <EmptyDescription>
          Você ainda não cadastrou nenhuma transação.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
