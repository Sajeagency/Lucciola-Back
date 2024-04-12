export interface ICreatePost {
  userId: number;
  title: string;
  description: string;
  typePost: "normal" | "evento";
  pathImage?: string;
}

export interface IUpdatePost {
  title: string;
  description: string;
  typePost: "normal" | "evento";
  pathImage?: string;
}
