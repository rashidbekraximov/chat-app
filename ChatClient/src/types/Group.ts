import type { User } from "./User";

export interface Group {
  id: string;
  name: string;
  members: Array<User>;
}
