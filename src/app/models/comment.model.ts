export class CommentOutput {
  id: number;
  user_id: number;
  author: string;
  item_id: number;
  text: string;
  created_at: Date;
  updated_at: Date;
}

export class CreateCommentInput {
  item_id: number;
  text: string;
}

export class UpdateCommentInput {
  text: string;
}
