import { useMemo } from "react";
import { formatToBRL } from "../../utils/currency-formatter";

type BalanceCardProps = {
  title: string;
  amount: string;
  cardBgColor: "light" | "dark";
};

export const BalanceCard: React.FC<BalanceCardProps> = ({
  amount,
  title,
  cardBgColor,
}) => {
  const styles = useMemo(() => {
    return {
      bgColor: cardBgColor === "light" ? "bg-white" : "bg-black",
      cardTextColor: cardBgColor === "light" ? "text-black" : "text-white",
      amountColor: Number(amount) < 0 || title === "Despesas" ? "text-red-500" : "text-green-500",
    };
  }, [cardBgColor, amount]);

  return (
    <div
      className={`flex flex-col gap-1 p-6 rounded-lg shadow ${styles.bgColor}`}
    >
      <p className={`text-xs opacity-80 ${styles.cardTextColor}`}>{title}</p>
      <p className={`text-3xl font-extrabold ${styles.amountColor}`}>
        {formatToBRL(Number(amount))}
      </p>
    </div>
  );
};
