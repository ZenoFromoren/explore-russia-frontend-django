import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { PostsList } from '../posts-list/posts-list';
import { useEffect } from 'react';
import { fetchLastPosts } from '../../services/thunks/postsThunks';
import { useDispatch } from '../../services/store';
import { Post } from '../post/post';
import { SearchPage } from '../search-page/search-page';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { Profile } from '../profile/profile';
import { Login } from '../login/login';
import { getUser } from '../../services/thunks/userThunks';
import { Register } from '../register/register';
import { Modal } from '../modal/modal';
import { UpdateProfile } from '../update-profile/update-profile';
import { ConfirmEmail } from '../confirm-email/confirm-email';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { ResetPassword } from '../reset-password/reset-password';
import { NotFoundPage } from '../ui/not-found-page/not-found-page';
import { YandexOAuth } from '../yandexOAuth/yandexOAuth';
import { CommentModal } from '../commentModal/commentModal';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchLastPosts());
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state?.background;

  const onModalClose = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={locationState || location}>
        <Route path='/' element={<PostsList />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/posts/:postId' element={<Post />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/yandex/callback'
          element={
            <ProtectedRoute onlyUnAuth>
              <YandexOAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/confirm-email'
          element={
            <ProtectedRoute onlyUnAuth>
              <ConfirmEmail />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      {locationState && (
        <Routes>
          <Route
            path='/profile/update'
            element={
              <ProtectedRoute>
                <Modal
                  title='Изменить данные профиля'
                  onClose={() => onModalClose()}
                >
                  <UpdateProfile />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/posts/:postId/comments/edit/:id'
            element={
              <ProtectedRoute>
                <Modal
                  title='Редактирование комментария'
                  onClose={() => onModalClose()}
                >
                  <CommentModal />
                </Modal>
              </ProtectedRoute>
            }
          /><Route
          path='/posts/:postId/comments/reply/:id'
          element={
            <ProtectedRoute>
              <Modal
                title='Ответ на комментарий'
                onClose={() => onModalClose()}
              >
                <CommentModal />
              </Modal>
            </ProtectedRoute>
          }
        />
        </Routes>
      )}
    </div>
  );
};

export default App;
