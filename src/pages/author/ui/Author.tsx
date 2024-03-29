import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthorInfo } from '@/widgets/authorInfo';
import { CardsSection } from '@/widgets/cardsSection';
import { BackArrow } from '@/entities/backArrow';

import styles from './styles.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getUser, getUserRecipes } from '@/entities/user';
import { Tags } from '@/shared/api';
import { getUserInfoFomLS } from '@/shared/lib/helpers/getUserInfoFomLS';
import { useAuth } from '@/shared/lib/hooks';
import classNames from 'classnames';

const Author: FC = () => {
   const { id } = useParams();
   const { isAuth } = useAuth();
   const { userId } = getUserInfoFomLS();
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuth && userId === Number(id)) {
         navigate('/profile');
         return;
      }
   }, [isAuth, id, userId]);

   const {
      data: userData,
      isLoading: userLoading,
      isError: userError,
   } = useQuery({
      queryKey: [Tags.USERS, id],
      queryFn: () => getUser(id!),
   });

   const {
      data: userRecipes,
      isLoading: recipesLoading,
      isError: recipesError,
   } = useQuery({
      queryKey: [Tags.RECIPES, id],
      queryFn: () => getUserRecipes(id!),
   });

   const preparedRecipes = recipesLoading ? [...Array(12)] : userRecipes?.content || [];

   return (
      <div className={classNames('container', styles.container)}>
         <BackArrow />
         <AuthorInfo {...userData} userId={id} isLoading={userLoading} isError={userError} />
         <div className={styles.row}>
            {recipesError ? (
               'Error'
            ) : (
               <CardsSection cards={preparedRecipes} isLoading={recipesLoading} isCenter={true} />
            )}
         </div>
      </div>
   );
};

export default Author;
