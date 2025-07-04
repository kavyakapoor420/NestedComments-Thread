export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  parentId?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
  replies?: Comment[];
  canEdit?: boolean;
  canDelete?: boolean;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  userId: string;
  commentId: string;
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: User;
}