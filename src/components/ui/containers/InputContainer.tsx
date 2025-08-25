import { ReactNode } from "react";

interface PlayerContainerProps {
  children: ReactNode;
}

export default function PlayerContainer({ children }: PlayerContainerProps) {
  return (
    <div className="mb-6 gap-4 flex flex-col">
      {children}
    </div>
  );
}
