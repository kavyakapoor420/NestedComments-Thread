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


  export  interface AuthContextType {
      token: string | null;
      user: User | null;
      login: (token: string, user: User) => void;
      logout: () => void;
      loading: boolean;
    }

  //  export  interface Comment {
  //     id: number;
  //     content: string;
  //     username: string;
  //     user_id: number;
  //     created_at: string;
  //     updated_at: string;
  //     is_deleted: boolean;
  //     deleted_at?: string | null;
  //     replies?: Comment[];
  //   }

