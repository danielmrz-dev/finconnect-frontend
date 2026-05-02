import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const CreateTransactionDialog: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Cadastrar nova transação</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Nova transação</DialogTitle>
            <DialogDescription>
              Cadastre uma nova transação para que ela apareça na lista.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="tipo">Tipo</Label>
              <Select onValueChange={() => {}}>
                <SelectTrigger className="w-45 self-end">
                  <SelectValue placeholder="Escolha o tipo da transação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Receitas">Receita</SelectItem>
                    <SelectItem value="Despesas">Despesa</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="name-1">Descrição</Label>
              <Input id="name-1" name="name" />
            </Field>
            <Field>
              <Label htmlFor="valor">Valor</Label>
              <Input
                value={inputValue}
                id="valor"
                name="valor"
                onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Cadastrar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
