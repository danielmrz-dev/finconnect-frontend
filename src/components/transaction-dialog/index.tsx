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
import { useTransactionsContext } from "@/contexts/transactions-context";
import { useTransactions } from "@/hooks/useTransactions";
import { ETransactionType } from "@/types/transaction-type";
import { formatToBRL } from "@/utils/currency-formatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
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
  const { transactions } = useTransactionsContext();
  const { deleteTransaction, isDeleteTransactionPending } = useTransactions();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isCreationDialog = action === "create";

  const transactionToEdit = useMemo(() => {
    return transactions.find((transaction) => transaction.id === transactionId);
  }, [transactionId, transactions]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: isCreationDialog ? "Receita" : transactionToEdit?.categoria,
      descricao: isCreationDialog ? "" : transactionToEdit?.descricao,
      valor: isCreationDialog ? 0 : transactionToEdit?.valor,
    },
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    if (isCreationDialog) {
      form.reset({
        tipo: "Receita",
        descricao: "",
        valor: 0,
      });
      return;
    }

    if (transactionToEdit) {
      form.reset({
        tipo: transactionToEdit.categoria,
        descricao: transactionToEdit.descricao,
        valor: transactionToEdit.valor,
      });
    }
  }, [isCreationDialog, transactionToEdit, form]);

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
                render={({ field, fieldState }) => {
                  const displayValue = field.value
                    ? formatToBRL(field.value.toString())
                    : "";

                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Valor
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        value={displayValue}
                        onChange={({ currentTarget }) => {
                          const numeric =
                            Number(currentTarget.value.replace(/\D/g, "")) /
                            100;
                          field.onChange(numeric);
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
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
                disabled={!isDirty}
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
