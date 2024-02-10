export interface ICreatePost {
  userId: number;
  title: string;
  description: string;
  typePost: "normal" | "evento";
  pathImage?: string;
}
