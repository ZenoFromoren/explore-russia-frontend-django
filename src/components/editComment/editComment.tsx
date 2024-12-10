import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { EditCommentUI } from '../ui/editComment/editComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchPostById } from '../../services/thunks/postsThunks';
import { postsSelectors } from '../../services/slices/postsSlice';
import { editComment } from '../../services/thunks/commentsThunks';

export const EditComment: FC = () => {
  const params = useParams();
  const postId = Number(params.postId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, text } = useSelector(postsSelectors.selectEditCommentData)!;

  const [newText, setNewText] = useState<string>(text); 

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(editComment({id, text: newText!}));
    navigate(-1);
  }

  return <EditCommentUI newText={newText} setNewText={setNewText} handleSubmit={handleSubmit}/>
}
