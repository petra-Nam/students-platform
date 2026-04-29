import type { LikeDoc, LikeableType } from './like.model';

export interface CreateLikeDTO {
  userId: string;
  likeableId: string;
  likeableType: LikeableType;
}

export interface LikeQueryDTO {
  userId?: string;
  likeableId?: string;
  likeableType?: LikeableType;
}

export interface SafeLike {
  id: string;
  user: string;
  likeable: string;
  likeableType: LikeableType;
  createdAt: Date;
}
