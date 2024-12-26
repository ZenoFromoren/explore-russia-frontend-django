import { FC, SyntheticEvent } from 'react';
import { TComment } from '../../../utils/types';
import styles from './comment.module.css';
import { MapPin } from '../map-pin/map-pin';
import defaultAvatar from '../../../images/defaultAvatar.svg';
import { EditButton } from '../editButton/editButton';
import { Link } from 'react-router-dom';
import { ReplyButton } from '../replyButton/replyButton';

type TCommentProps = {
  commentData: TComment;
  userId: number;
  locationState: { background: Location };
  handleEditComment: (e: SyntheticEvent) => void;
};

export const Comment: FC<TCommentProps> = ({
  commentData,
  userId,
  locationState,
  handleEditComment,
}) => {
  const { id: commentId, text, owner, created_at, updated_at, is_edited } = commentData;
  const { id: ownerId, username, city } = owner;

  return (
    <>
      <article className={styles.comment} data-commentid={commentId}>
        <div className={styles.commentTop}>
          <div className={styles.ownerData}>
            <img
              src={defaultAvatar}
              alt='Аватар автора'
              className={styles.avatar}
            />
            <div className={styles.ownerInfo}>
              <p className={styles.userName}>{username}</p>
              <div className={styles.cityBlock}>
                <MapPin className={styles.mapPin} />
                <p className={styles.city}>{city}</p>
              </div>
            </div>
            <p
              className={styles.date}
            >{`${new Date(created_at).toLocaleDateString()} ${new Date(created_at).toLocaleTimeString()}`}</p>
            {is_edited && (
              <p className={styles.date}>
                {`(ред. ${new Date(updated_at).toLocaleDateString()} ${new Date(updated_at).toLocaleTimeString()})`}
              </p>
            )}
          </div>
          <div className={styles.commentButtons}>
            {userId === ownerId && (
              <Link to={`comments/edit/${commentId}`} state={locationState}>
                <EditButton
                  className={styles.commentButton}
                  onClick={handleEditComment}
                />
              </Link>
            )}
            <Link to={`comments/reply/${commentId}`} state={locationState}>
              <ReplyButton
                className={styles.commentButton}
                onClick={handleEditComment}
              />
            </Link>
          </div>
        </div>
        <p className={styles.text}>{text}</p>
      </article>
      {commentData.replies && (
        <div className={styles.replies}>
          {commentData.replies.map((replyData: TComment) => (
            <Comment
              commentData={replyData}
              userId={userId}
              locationState={locationState}
              handleEditComment={handleEditComment}
              key={replyData.id}
            />
          ))}
        </div>
      )}
    </>
  );
};
