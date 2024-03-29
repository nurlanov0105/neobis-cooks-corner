import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsBackground } from '@/widgets/detailsBackground';
import { DetailsRecipeInfo } from '@/widgets/detailsRecipeInfo';
import { getDetailRecipe } from '@/entities/recipes';
import { useQuery } from '@tanstack/react-query';
import { Tags } from '@/shared/api';
import { Comments } from '@/widgets/comments';
import { getUserInfoFomLS } from '@/shared/lib/helpers/getUserInfoFomLS';
import { addProfileImg, getUser } from '@/entities/user';
import { useAppDispatch } from '@/app/appStore';
import { useAuth } from '@/shared/lib/hooks';

import styles from './styles.module.scss';

const DetailsRecipe: FC = () => {
   const { id } = useParams();
   const { isAuth } = useAuth();
   const { userId } = getUserInfoFomLS();
   const dispatch = useAppDispatch();

   const { data, isLoading, isError } = useQuery({
      queryKey: [Tags.RECIPES, id],
      queryFn: () => getDetailRecipe(id!),
   });

   if (isAuth) {
      const { data: profileData, isSuccess } = useQuery({
         queryKey: [Tags.USERS, userId],
         queryFn: () => getUser(userId),
      });

      isSuccess && dispatch(addProfileImg(profileData.imageUrl));
   }

   return isError ? (
      <h1 className='h1'>Error</h1>
   ) : isLoading ? (
      <h1 className='h1'>Loading...</h1>
   ) : (
      <>
         <DetailsBackground imageUrl={data.imageUrl} />
         <div className={styles.container}>
            <DetailsRecipeInfo {...data} isLoading={isLoading} id={id} />
            <Comments recipeId={Number(id)} />
         </div>
      </>
   );
};

export default DetailsRecipe;
