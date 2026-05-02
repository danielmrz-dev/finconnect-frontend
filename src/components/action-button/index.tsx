type ActionButtonProps = {
  buttonText: string;
};

export const ActionButton: React.FC<ActionButtonProps> = ({ buttonText }) => {
  return (
    <button className="bg-black text-white w-fit self-end py-2 px-4 rounded hover:opacity-60 cursor-pointer transition duration-300">
      {buttonText}
    </button>
  );
};
