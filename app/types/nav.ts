import { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  label?: string | undefined;
  icon: LucideIcon;
  variant: "default" | "ghost";
};
