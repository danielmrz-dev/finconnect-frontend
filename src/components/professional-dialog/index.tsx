import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type ProfessionalsDialogProps = {
  trigger: React.ReactNode;
}

export const ProfessionalsDialog: React.FC<ProfessionalsDialogProps> = ({ trigger }) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Informações sobre o profissional</DialogTitle>
            <DialogDescription className="flex flex-col gap-2 pt-2">
              <strong className="flex justify-between">
                Nome:
                <span>
                  Informação
                </span>
              </strong>
              <strong className="flex justify-between">
                Área de atuação:
                <span>
                  Informação
                </span>
              </strong>
              <strong className="flex justify-between">
                Telefone:
                <span>
                  Informação
                </span>
              </strong>
              <strong className="flex justify-between">
                Email:
                <span>
                  Informação
                </span>
              </strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-fit self-end">Fechar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
