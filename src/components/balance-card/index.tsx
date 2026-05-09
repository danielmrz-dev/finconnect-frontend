import { useMemo } from "react";
import { formatToBRL } from "../../utils/currency-formatter";
import { Skeleton } from "../ui/skeleton";

type BalanceCardProps = {
  title: string;
  amount: string;
  cardBgColor: "light" | "dark";
  isLoading: boolean;
};

export const BalanceCard: React.FC<BalanceCardProps> = ({
  amount,
  title,
  cardBgColor,
  isLoading,
}) => {
  const styles = useMemo(() => {
    return {
      bgColor: cardBgColor === "light" ? "bg-white" : "bg-black",
      cardTextColor: cardBgColor === "light" ? "text-black" : "text-white",
      amountColor: cardBgColor === "light" ? "text-black" : "text-white",
    };
  }, [cardBgColor]);

  return (
    <div
      className={`flex flex-col gap-1 p-6 rounded-lg shadow ${styles.bgColor}`}
    >
      <p className={`text-xs opacity-80 ${styles.cardTextColor}`}>{title}</p>
      <p className={`text-3xl font-extrabold ${styles.amountColor}`}>
        {isLoading ? (
          <Skeleton className="h-9 w-full rounded-sm bg-gray-300" />
        ) : title === "Despesas" ? (
          `- ${formatToBRL(Number(amount))}`
        ) : (
          formatToBRL(Number(amount))
        )}
      </p>
    </div>
  );
};
