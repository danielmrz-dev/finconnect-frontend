import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Spinner } from "../ui/spinner";

export const Loader: React.FC = () => {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Carregando as transações</EmptyTitle>
        <EmptyDescription>Por favor, aguarde...</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
