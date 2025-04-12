
import { ReactNode } from "react";

export interface PlanProps {
  name: string;
  description: string;
  price: string;
  perWhat: string;
  features: string[];
  highlighted?: boolean;
}

export interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: ReactNode;
  image: string;
  plans: PlanProps[];
}

export interface ServicesDataType {
  [key: string]: ServiceData;
}
