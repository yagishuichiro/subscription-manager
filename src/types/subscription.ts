export type Subscription = {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  next_update: Date;
  update_cycle_number: number;
  update_cycle_unit: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Subscriptions = { subscriptions: Subscription[] };
