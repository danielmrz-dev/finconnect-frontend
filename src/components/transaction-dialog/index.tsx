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
import { useUsers } from "@/hooks/useUsers";
import type { ICreateTransactionPayload } from "@/types/create-transaction-payload";
import { ETransactionType } from "@/types/transaction-type";
import type { IUpdateTransactionPayload } from "@/types/update-transaction-payload";
import { formatToBRL } from "@/utils/currency-formatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar } from "../ui/calendar";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import { formSchema } from "./form/new-transaction-form";
import { formatDate, isValidDate } from "./utils";

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
  const { user } = useUsers(21);

  const {
    deleteTransaction,
    isDeleteTransactionPending,
    updateTransaction,
    isUpdateTransactionPending,
    createTransaction,
    isCreateTransactionPending,
  } = useTransactions();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const isCreationDialog = action === "create";

  const transactionToEdit = useMemo(() => {
    return transactions.find((transaction) => transaction.id === transactionId);
  }, [transactionId, transactions]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: isCreationDialog
        ? ETransactionType.RECEITA
        : transactionToEdit?.categoria,
      descricao: isCreationDialog ? "" : transactionToEdit?.descricao,
      valor: isCreationDialog ? 0 : transactionToEdit?.valor,
      data: isCreationDialog ? "" : (transactionToEdit?.data ?? ""),
    },
    mode: "onChange",
  });

  const { isDirty, isValid } = form.formState;

  useEffect(() => {
    if (isCreationDialog) {
      form.reset({
        tipo: ETransactionType.RECEITA,
        descricao: "",
        valor: 0,
        data: "",
      });
      return;
    }

    if (transactionToEdit) {
      form.reset({
        tipo: transactionToEdit.categoria,
        descricao: transactionToEdit.descricao,
        valor: transactionToEdit.valor,
        data: transactionToEdit.data ?? "",
      });
    }
  }, [isCreationDialog, transactionToEdit, form]);

  const onSubmit = () => {
    if (action === "create") {
      handleCreateTransaction();
    }
    if (action === "edit") {
      handleUpdateTransaction();
    }
  };

  const handleCreateTransaction = async () => {
    if (!user) throw new Error("User not found");

    const formData = form.getValues();
    const payload = {
      categoria: formData.tipo,
      descricao: formData.descricao,
      valor: formData.valor,
      data: formData.data,
      usuarioId: user.id,
    } satisfies ICreateTransactionPayload;

    await createTransaction(payload);
    setIsOpen(false);
    form.reset();
  };

  const handleUpdateTransaction = async () => {
    if (!transactionId) throw new Error("Transaction ID not provided.");

    const formData = form.getValues();
    const payload = {
      categoria: formData.tipo,
      descricao: formData.descricao,
      valor: formData.valor,
      data: formData.data,
    } satisfies IUpdateTransactionPayload;

    await updateTransaction({
      id: transactionId,
      payload,
    });
    setIsOpen(false);
    form.reset();
  };

  const handleDeleteTransaction = async () => {
    if (!transactionId) return;
    await deleteTransaction(transactionId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild className="cursor-pointer">
        <Button 
          className={action === "create" ? "" : "w-7 h-7"}
          variant={action === "delete" ? "destructive" : "secondary"} 
          onClick={() => setIsOpen(true)}>
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
              <div className="flex items-start gap-3">
                <Controller
                  name="data"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const fieldDate = field.value
                      ? new Date(field.value + "T00:00:00")
                      : undefined;
                    const selectedDate = isValidDate(fieldDate)
                      ? fieldDate
                      : undefined;

                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="date-required">Data</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            id="date-required"
                            value={
                              selectedDate
                                ? formatDate(selectedDate)
                                : (field.value ?? "")
                            }
                            placeholder="Escolha uma data"
                            autoComplete="off"
                            onChange={(e) => {
                              const rawValue = e.target.value;
                              field.onChange(rawValue);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "ArrowDown") {
                                e.preventDefault();
                                setOpen(true);
                              }
                            }}
                          />
                          <InputGroupAddon align="inline-end">
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <InputGroupButton
                                  id="date-picker"
                                  variant="ghost"
                                  size="icon-xs"
                                  aria-label="Select date"
                                >
                                  <CalendarIcon />
                                  <span className="sr-only">Select date</span>
                                </InputGroupButton>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="end"
                                alignOffset={-8}
                                sideOffset={10}
                              >
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={(selectedDate) => {
                                    if (!selectedDate) {
                                      return;
                                    }
                                    field.onChange(
                                      selectedDate.toISOString().split("T")[0],
                                    );
                                    setOpen(false);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
                <Controller
                  name="valor"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const displayValue = field.value
                      ? formatToBRL(field.value)
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
                            const digits = currentTarget.value.replace(
                              /\D/g,
                              "",
                            );
                            const numeric = digits ? Number(digits) / 100 : 0;
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
              </div>
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
                disabled={!isDirty || !isValid || isCreateTransactionPending}
              >
                {isCreateTransactionPending ? (
                  <div className="flex items-center gap-1">
                    Cadastrando... <Spinner />
                  </div>
                ) : (
                  "Cadastrar"
                )}
              </Button>
            )}
            {action === "edit" && (
              <Button
                type="submit"
                form="form-rhf-demo"
                className="w-fit cursor-pointer"
                disabled={!isDirty || !isValid || isUpdateTransactionPending}
                onClick={handleUpdateTransaction}
              >
                {isUpdateTransactionPending ? (
                  <div className="flex items-center gap-1">
                    Editando... <Spinner />
                  </div>
                ) : (
                  "Confirmar edição"
                )}
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
          <DialogFooter className="flex flex-row justify-end">
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
