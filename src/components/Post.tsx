import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface Author {
  avatarUrl?: string;
  name: string;
  role: string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author?: Author;
  content?: Content[];
  publishedAt?: Date;
  children?: React.ReactNode;
}

const comments = [
  {
    id: 1,
    authorName: "Devon Lane",
    datePublishedCommentAt: new Date("2023-05-11 08:13"),
    content: "Muito bom Devon, parabéns!!",
    countThumbsUp: 3,
  },
  {
    id: 2,
    authorName: "Esther Howard",
    datePublishedCommentAt: new Date("2023-05-11 08:15"),
    content: "Parabéns pelo projeto. Muito legal!",
    countThumbsUp: 2,
  },
  {
    id: 3,
    authorName: "Jenny Wilson",
    datePublishedCommentAt: new Date("2023-05-11 08:20"),
    content: "Adorei o projeto, muito bem feito!",
    countThumbsUp: 5,
  },
];

export const Post = ({ author, content, publishedAt }: PostProps) => {
  const [commentsList, setCommentsList] = useState(comments);
  const [commentText, setCommentText] = useState("");

  const publishedDateFormatted = publishedAt
    ? format(publishedAt, "dd 'de' MMMM 'às' HH:mm", {
        locale: ptBR,
      })
    : "";

  const publishDateRelativeToNow = publishedAt
    ? formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
      })
    : "";

  const handleCreateNewComment = (event: React.FormEvent) => {
    event.preventDefault();

    setCommentsList([
      ...commentsList,
      {
        id: commentsList.length + 1,
        authorName: "Novo Autor",
        datePublishedCommentAt: new Date(),
        content: commentText,
        countThumbsUp: 0,
      },
    ]);

    setCommentText("");
  };

  const handleNewCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentText(event.currentTarget.value);
  };

  function handleDeleteComment(commentId: number) {

    if (commentId === null) return;

    setCommentsList((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            hasBorder={true}
            src={author?.avatarUrl ? author.avatarUrl : ""}
          />

          <div className={styles.authorInfo}>
            <strong>{author?.name}</strong>
            <span>{author?.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt?.toISOString()}
        >
          {publishDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content?.map((line, index) => {
          if (line.type === "paragraph") {
            return <p key={index}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={index}>
                {" "}
                <a href="#">
                  <span>{line.content}</span>
                </a>
              </p>
            );
          }
          return null;
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          value={commentText}
          onChange={handleNewCommentChange}
          placeholder="Deixe um comentário"
          required
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {commentsList.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            authorName={comment.authorName}
            datePublishedCommentAt={comment.datePublishedCommentAt}
            content={comment.content}
            countThumbsUp={comment.countThumbsUp}
            onDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  );
};
