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
import { useTransactions } from "@/hooks/useTransactions";
import { formatToBRL } from "@/utils/currency-formatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import { formSchema } from "./form/new-transaction-form";
import { ETransactionType } from "@/types/transaction-type";

type TransactionDialogProps = {
  action: "create" | "edit" | "delete";
  buttonText: string | React.ReactNode;
  transactionId?: number;
};

export const TransactionDialog: React.FC<TransactionDialogProps> = ({
  action,
  buttonText,
  transactionId,
}) => {
  const { deleteTransaction, isDeleteTransactionPending } = useTransactions();

  const [amount, setAmount] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isCreationDialog = action === "create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: isCreationDialog ? "Receita" : "Despesa",
      descricao: isCreationDialog ? "" : "Transação editada",
      valor: isCreationDialog ? 0 : 0,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const handleDeleteTransaction = async () => {
    if (!transactionId) return;
    await deleteTransaction(transactionId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild className="cursor-pointer">
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          {buttonText}
        </Button>
      </DialogTrigger>
      {action !== "delete" ? (
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {isCreationDialog ? "Nova transação" : "Editar transação"}
            </DialogTitle>
            <DialogDescription>
              {isCreationDialog
                ? "Cadastre uma nova transação para que ela apareça na lista."
                : "Altere os dados desta transação para atualizá-la."}
            </DialogDescription>
          </DialogHeader>

          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="tipo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
                      Tipo
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-rhf-complex-billingPeriod"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Selecione o tipo de transação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ETransactionType.RECEITA}>
                          Receita
                        </SelectItem>
                        <SelectItem value={ETransactionType.DESPESA}>
                          Despesa
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="descricao"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Descrição
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Descreva brevemente a transação"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="valor"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Valor</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      value={amount}
                      onChange={({ currentTarget }) => {
                        const formatted = formatToBRL(currentTarget.value);
                        const numeric =
                          Number(currentTarget.value.replace(/\D/g, "")) / 100;
                        setAmount(formatted);
                        field.onChange(numeric);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          <DialogFooter className="flex flex-row">
            <DialogClose asChild>
              <Field>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="max-w-fit self-end cursor-pointer"
                >
                  Cancelar
                </Button>
              </Field>
            </DialogClose>
            {action === "create" && (
              <Button
                type="submit"
                form="form-rhf-demo"
                className="w-fit cursor-pointer"
              >
                Cadastrar
              </Button>
            )}
            {action === "edit" && (
              <Button
                type="submit"
                form="form-rhf-demo"
                className="w-fit cursor-pointer"
              >
                Confirmar edição
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tem certeza que deseja excluir essa transação?
            </DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. Isso irá excluir esta transação
              dos nossos servidores permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="max-w-fit self-end cursor-pointer"
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="button"
              variant="default"
              onClick={handleDeleteTransaction}
              disabled={isDeleteTransactionPending}
              className="max-w-fit self-end cursor-pointer"
            >
              {isDeleteTransactionPending ? (
                <div className="flex items-center gap-1">
                  Excluindo... <Spinner />
                </div>
              ) : (
                "Excluir"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};
