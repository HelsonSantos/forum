import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

export interface CommentProps {
  id?: number | null;
  authorName?: string;
  datePublishedCommentAt?: Date;
  content?: string;
  countThumbsUp?: number;
  onDeleteComment: (commentId: number) => void;
}

export const Comment = ({
  id,
  authorName,
  datePublishedCommentAt,
  content,
  countThumbsUp,
  onDeleteComment,
}: CommentProps) => {
  const [countLike, setLike] = useState(countThumbsUp || 0);

  const publishDateRelativeToNow = datePublishedCommentAt
    ? formatDistanceToNow(datePublishedCommentAt, {
        locale: ptBR,
        addSuffix: true,
      })
    : "";

  const handleLikeClick = (commentId: number | null) => () => {
    if (commentId === null) return;
    setLike((prevLike) => prevLike + 1);
  };

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://avatars.githubusercontent.com/u/62641213?v=4"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{authorName}</strong>
              <time title="11 de Maio às 08:13" dateTime="2025-05-11 08:13:30">
                {publishDateRelativeToNow}
              </time>
            </div>

            <button
              onClick={() => {
                if (typeof id === "number") {
                  onDeleteComment(id);
                }
              }}
              title="Deletar comentário"
            >
              <Trash size={20} />
            </button>
          </header>
          {content && <p>{content}</p>}
        </div>
        <footer>
          <button onClick={handleLikeClick(id)} type="button">
            <ThumbsUp />
            Aplaudir <span>{countLike}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
