import { ReactNode } from "react";

export interface IColumns {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "inherit" | "left" | "center" | "justify" | undefined;
}

export interface ITable {
  columns: IColumns[];
  rows: Record<string, unknown>[];
  actions?: (id: string | number) => ReactNode;
}
