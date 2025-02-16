import { FC, PropsWithChildren } from "react";

export const HeaderCell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};
