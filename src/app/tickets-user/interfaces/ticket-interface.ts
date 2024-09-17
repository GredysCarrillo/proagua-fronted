
export interface ticket {

  _id?:string;
  CreatedAt?: Date;
  userId: string | undefined | null;
  problemType: string | undefined | null;
  description: string | undefined | null;
  status: string | undefined | null;

}
