import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Paths } from "@/routes";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router";

export const NotFoundPage: React.FC = () => {
  
  const navigateTo = useNavigate();

  return (
    <Empty className="justify-self-center absolute top-[45%] translate-y-[-50%]">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-white w-30 h-20">
          <TbError404 className="min-w-20 min-h-20"/>
        </EmptyMedia>
        <EmptyTitle>Página não encontrada</EmptyTitle>
        <EmptyDescription>
          Infelizmente, a página que você está tentando acessar não existe ou
          está indisponível no momento.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => navigateTo(Paths.Home)}>Voltar para página inicial</Button>
      </EmptyContent>
    </Empty>
  );
};
