import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { CommentModalUI } from '../ui/commentModal/commentModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchPostById } from '../../services/thunks/postsThunks';
import { postsSelectors } from '../../services/slices/postsSlice';
import { editComment, leaveAComment } from '../../services/thunks/commentsThunks';

export const CommentModal: FC = () => {
  const params = useParams();
  const postId = Number(params.postId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { id, text } = useSelector(postsSelectors.selectCommentData)!;

  const edit = location.pathname.includes('/edit')
  const reply = location.pathname.includes('/reply')

  const [commentText, setCommentText] = useState(edit ? text! : ''); 

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, []);

  const handleEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(editComment({id, text: commentText!, postId}));
    navigate(-1);
  }

  const handleReply = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(leaveAComment({text: commentText!, post: postId, parent: id}));
    navigate(-1);
  }

  if (edit) {
    return <CommentModalUI commentText={commentText} setCommentText={setCommentText} handleSubmit={handleEdit}/>
  }

  if (reply) {
    return <CommentModalUI commentText={commentText} setCommentText={setCommentText} handleSubmit={handleReply}/>
  }
}
