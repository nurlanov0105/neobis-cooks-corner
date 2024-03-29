import { useAppDispatch } from '@/app/appStore';
import { getTokensFromLS } from '@/shared/lib/helpers';
import { logout, removeAccessToken, removeUserInfo } from '@/features/authentication';
import { closeModal } from '@/widgets/modal';
import { toast } from 'react-toastify';

import classNames from 'classnames';
import styles from './styles.module.scss';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

const LogoutModal: FC = () => {
   const dispatch = useAppDispatch();
   const { refreshToken } = getTokensFromLS();
   const navigate = useNavigate();

   const { mutate: logoutMutate, isPending } = useMutation({
      mutationFn: logout,
      onSuccess: () => {
         localStorage.removeItem('currentEmail');
         dispatch(removeAccessToken());
         dispatch(removeUserInfo());
         toast.success('Succesfully logout');
         navigate('/');
         location.reload();
         // queryClient.removeQueries();
      },
      onError: (error) => {
         toast.error('Logout error');
         console.log(error);
      },
   });

   const handleLogout = () => {
      logoutMutate(refreshToken);
      dispatch(closeModal());
   };

   const onClickNo = () => {
      dispatch(closeModal());
   };

   return (
      <div className={styles.modal}>
         <h2 className='h2'>Are you sure you wanna leave?</h2>
         <div className={styles.modal__btns}>
            <button
               className={classNames('btn', styles.modal__btn, styles.modal__btn_pink)}
               onClick={handleLogout}>
               {isPending ? <span>Loading...</span> : <span>Yes</span>}
            </button>
            <button className={classNames('btn', styles.modal__btn)} onClick={onClickNo}>
               <span>No</span>
            </button>
         </div>
      </div>
   );
};

export default LogoutModal;
