import clsx from "clsx";

type PropTypes = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: PropTypes) => {
  return (
    <div className={clsx("w-full h-full p-8 m-auto bg-gray-500", className)}>
      {children}
    </div>
  );
};

export default Card;
