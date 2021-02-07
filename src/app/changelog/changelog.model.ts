/**
 * Admitted values for the changelog comment type.
 */
export type CommentType =
  | 'CONFIG'
  | 'BUGFIX'
  | 'QUALITY'
  | 'DOCUMENTATION'
  | 'FEATURE';

/**
 * Changelog comment model.
 */
export interface Comment {
  build: string;
  date: string;
  text: string;
  type: CommentType;
}

/**
 * Changelog model.
 */
export interface Changelog {
  comments: Comment[];
  version: string;
}
