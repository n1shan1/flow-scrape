export enum PACK {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type CreditsPack = {
  id: PACK;
  name: string;
  label: string;
  credits: number;
  price: number;
  price_Id: string;
};

export const CreditsPacks: CreditsPack[] = [
  {
    id: PACK.SMALL,
    name: "Small Pack",
    label: "1000 Credits",
    credits: 1000,
    price: 100,
    price_Id: process.env.STRIPE_SMALL_PRICE_ID!,
  },
  {
    id: PACK.MEDIUM,
    name: "Medium Pack",
    label: "5000 Credits",
    credits: 5000,
    price: 500,
    price_Id: process.env.STRIPE_MEDIUM_PRICE_ID!,
  },
  {
    id: PACK.LARGE,
    name: "Medium Pack",
    label: "10000 Credits",
    credits: 10000,
    price: 1000,
    price_Id: process.env.STRIPE_LARGE_PRICE_ID!,
  },
];

export function getCreditsPack(id: PACK) {
  return CreditsPacks.find((pack) => pack.id === id);
}
