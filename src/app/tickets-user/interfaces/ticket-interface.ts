
export interface ticket {

  _id?:string | undefined | null;
  CreatedAt?: Date | undefined;
  userId: string | undefined | null;
  problemType: string | undefined | null;
  description: string | undefined | null;
  status: string | undefined | null;

}
