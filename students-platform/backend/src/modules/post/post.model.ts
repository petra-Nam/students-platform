import {
  Schema,
  model,
  type InferSchemaType,
  type HydratedDocument,
  type Model,
  type Types,
} from 'mongoose';


export type RichText = string | Record<string, unknown>;

const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true } as {
      type: typeof Schema.Types.ObjectId; ref: 'User';
    },
    title: { type: String, required: true, trim: true },
    content: { type: Schema.Types.Mixed as unknown as RichText, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);


export type Post = InferSchemaType<typeof PostSchema>;
export type PostDoc = HydratedDocument<Post>;


PostSchema.index({ createdAt: -1 });
PostSchema.index({ title: 'text' });


export const PostModel: Model<Post> = model<Post>('Post', PostSchema);
