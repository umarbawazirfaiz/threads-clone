import { Posts, Likes } from "@prisma/client";

export type Post = Omit<Posts, "createAt"> & {
  createAt: string;
  likes: Like[];
};

export type Like = Omit<Likes, "createAt"> & {
  createAt: string;
};
