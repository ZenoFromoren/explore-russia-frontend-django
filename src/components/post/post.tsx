import { FC, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useLocation, useParams } from 'react-router-dom';
import { fetchPostById } from '../../services/thunks/postsThunks';
import { useDispatch, useSelector } from '../../services/store';
import { postsActions, postsSelectors } from '../../services/slices/postsSlice';
import { userSelectors } from '../../services/slices/userSlice';
import styles from './post.module.css';
import { LeaveACommentButton } from '../ui/leave-a-comment-button/leave-a-comment-button';
import { Link } from 'react-router-dom';
import {
  getComments,
  leaveAComment,
} from '../../services/thunks/commentsThunks';
import { TComment } from '../../utils/types';
import { Comment } from '../ui/comment/comment';
import { PostSkeleton } from './post-skeleton';

export const Post: FC = () => {
  const params = useParams();
  const postId = Number(params.postId);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/posts')) {
      dispatch(fetchPostById(postId));
      dispatch(getComments(postId));
    }

    dispatch(postsActions.clearCurrentPost());
  }, [location]);

  const post = useSelector(postsSelectors.selectCurrentPost);
  let comments = useSelector(postsSelectors.selectComments);

  if (comments) {
    comments = [...comments!]
      .filter((comment) => comment.parentId === null)
      .sort(function (comment1, comment2) {
        return (
          new Date(comment2.createdAt).getTime() -
          new Date(comment1.createdAt).getTime()
        );
      });
  }

  const isAuth = useSelector(userSelectors.selsectIsAuthenticated);
  const userId = useSelector(userSelectors.selectUserData)!?.id;

  const [commentText, setCommentText] = useState('');

  const textarea = document.querySelector<HTMLTextAreaElement>('textarea');

  const minHeight = 20;
  const maxHeight = 260;

  const postBody = post?.text!;

  const htmlText = `
    <body>
      ${postBody}
    </body>
  `;

  const sanitizedHtml = DOMPurify.sanitize(htmlText);

  const handleGalleryButtonClick = (e: any) => {
    e.stopImmediatePropagation();
    const gallery = e.target.closest('.gallery');

    const galleryList = gallery.querySelector('.gallery__list');

    e.target
      .closest('.gallery__button')
      .classList.contains('gallery__button-left')
      ? scroll(galleryList, -galleryList.clientWidth)
      : scroll(galleryList, galleryList.clientWidth);

    if (galleryList.scrollLeft === 0) {
      gallery.querySelector('.gallery__button-left').style.display = 'none';
    } else if (
      galleryList.scrollLeft ===
      galleryList.clientWidth * (galleryList.childElementCount - 1)
    ) {
      gallery.querySelector('.gallery__button-right').style.display = 'none';
    } else {
      gallery.querySelector('.gallery__button-left').style.display = 'flex';
      gallery.querySelector('.gallery__button-right').style.display = 'flex';
    }
  };

  const scroll = (galleryList: any, length: any) => {
    galleryList.scrollBy({ left: length });
  };

  const constrain = (n: number, low: number, high: number) => {
    return Math.max(Math.min(n, high), low);
  };

  const handleLeaveAComment = () => {
    dispatch(leaveAComment({ text: commentText, userId, postId }));
    dispatch(fetchPostById(postId));
    setCommentText('');
  };

  const handleEditComment = (e: any) => {
    let comment = e.target.closest('article');
    let commentId = Number(comment.getAttribute('data-commentid'));
    let text =
      comment.querySelectorAll('p')[comment.querySelectorAll('p').length - 1]
        .textContent;

    dispatch(postsActions.setEditCommentData({ id: commentId, text }));
  };

  Array.from(
    document.getElementsByClassName(
      'gallery__button'
    ) as HTMLCollectionOf<HTMLElement>
  ).forEach((button) => {
    button.addEventListener('click', handleGalleryButtonClick);

    if (button.classList.contains('gallery__button-left')) {
      button.style.display = 'none';
    }
  });

  if (textarea !== null) {
    textarea.addEventListener('input', () => {
      textarea.style.setProperty('height', '0');
      textarea.style.setProperty(
        'height',
        constrain(textarea.scrollHeight, minHeight, maxHeight) + 'px'
      );
    });
  }

  if (!post) {
    return <PostSkeleton />;
  }

  return (
    <main className={styles.main}>
      {post ? (
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
          <div className={styles.comments}>
            {isAuth ? (
              <div className={styles.textareaBlock}>
                <textarea
                  placeholder='Написать комментарий'
                  className={styles.textarea}
                  onChange={(e) => setCommentText(e.target.value)}
                  value={commentText}
                />
                <LeaveACommentButton
                  className={styles.leaveACommentButton}
                  onClick={handleLeaveAComment}
                />
              </div>
            ) : (
              <div className={styles.authBlock}>
                <p className={styles.authBlock__text}>
                  Оставлять комментарии могут только авторизованные пользователи
                </p>
                <div className={styles.authBlock__buttons}>
                  <Link to='/login'>
                    <button type='button' className={styles.loginButton}>
                      Войти
                    </button>
                  </Link>
                  <Link to='/register'>
                    <button type='button' className={styles.registerButton}>
                      Зарегистрироваться
                    </button>
                  </Link>
                </div>
              </div>
            )}
            {comments!.length ? (
              <>
                <h3 className={styles.comments__title}>
                  Комментарии: {comments!.length}
                </h3>
                <section className={styles.comments__block}>
                  {comments?.map((commentData: TComment) => (
                    <Comment
                      commentData={commentData}
                      userId={userId}
                      locationState={{ background: location as any }}
                      handleEditComment={handleEditComment}
                      key={commentData.id}
                    />
                  ))}
                </section>
              </>
            ) : (
              <p className={styles.comments__title}>Нет комментариев</p>
            )}
          </div>
        </div>
      ) : (
        <PostSkeleton />
      )}
    </main>
  );
};
