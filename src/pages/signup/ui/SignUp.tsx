import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignUpForm, emailAvailable, register } from '@/features/authentication';
import { useMutation } from '@tanstack/react-query';
import { addEmailToLS } from '@/shared/lib/helpers';
import { SECONDARY_URL } from '@/shared/api/instance';

const SignUp: FC = () => {
   const navigate = useNavigate();
   const [isEmailAvailable, setIsEmailAvailable] = useState(null);

   const registerMutate = useMutation({
      mutationFn: register,
      onSuccess: (data) => {
         if (data) {
            navigate('/verification');
         }
      },
   });

   const emailAvailableMutate = useMutation({
      mutationFn: emailAvailable,
      onSuccess: (data) => {
         setIsEmailAvailable(data?.data);
      },
   });

   const handleRegister = (name: string, email: string, password: string) => {
      const params = { name, email, password, url: `${SECONDARY_URL}/confirm` };

      addEmailToLS(email);
      registerMutate.mutate(params);
   };

   const checkEmailAvailable = (email: string) => {
      emailAvailableMutate.mutate(email);
   };

   return (
      <SignUpForm
         handleRegister={handleRegister}
         checkEmailAvailable={checkEmailAvailable}
         isLoading={registerMutate.isPending}
         emailLoading={emailAvailableMutate.isPending}
         emailSucces={isEmailAvailable}
         emailError={emailAvailableMutate.isError}
      />
   );
};

export default SignUp;
