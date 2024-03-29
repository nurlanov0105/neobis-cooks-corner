import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerValidationSchema } from '../model/validation';
import { getInputClassNames } from '../model/getInputClassNames';
import ErrorMessage from './ErrorMessage';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';

import styles from './styles.module.scss';
import userIcon from '@/shared/assets/imgs/auth/user.svg';
import dogIcon from '@/shared/assets/imgs/auth/dog.svg';
import eyeClosedIcon from '@/shared/assets/imgs/auth/eye-closed.svg';
import eyeOpenedIcon from '@/shared/assets/imgs/auth/eye-opened.svg';
import classNames from 'classnames';

interface Props {
   handleRegister: (name: string, email: string, password: string) => void;
   checkEmailAvailable: (email: string) => void;
   isLoading: boolean;
   emailLoading: boolean;
   emailSucces: any;
   emailError: any;
}

const SignUpForm: FC<Props> = ({
   handleRegister,
   checkEmailAvailable,
   isLoading,
   emailLoading,
   emailSucces,
   emailError,
}) => {
   const [email, setEmail] = useState('');
   const debouncedEmail = useDebounce(email, 700);

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const handlePasswordShow = () => setShowPassword(!showPassword);
   const handleConfirmPasswordShow = () => setShowConfirmPassword(!showConfirmPassword);

   const formik = useFormik({
      initialValues: {
         name: '',
         email: '',
         password: '',
         passwordConfirm: '',
      },

      validationSchema: registerValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const { name, email, password } = values;
         handleRegister(name, email, password);
      },
      validateOnMount: true,
   });

   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const email = event.target.value;
      formik.handleChange(event);
      formik.validateField('email');

      const isEmailValid = formik.errors.email;

      if (isEmailValid) {
         setEmail(email);
      }
   };

   useEffect(() => {
      if (debouncedEmail) {
         checkEmailAvailable(debouncedEmail);
      }
   }, [debouncedEmail]);

   const nameClassNames = getInputClassNames(formik, 'name');
   const emailClassNames = getInputClassNames(formik, 'email');
   const pswClassNames = getInputClassNames(formik, 'password');
   const passwordConfirmClassNames = getInputClassNames(formik, 'passwordConfirm');

   return (
      <div className={styles.wrapper}>
         <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.form__col}>
               <label className={styles.form__label}>
                  <span className={styles.form__title}>Name</span>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type='name'
                           className={classNames(
                              nameClassNames,
                              formik.values.name && styles.form__input_active
                           )}
                           placeholder='Enter your name'
                           name='name'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.name}
                        />
                        <img src={userIcon} alt='user icon' className={styles.form__icon} />
                     </div>
                     <ErrorMessage formik={formik} name='name' />
                  </div>
               </label>
               <label className={styles.form__label}>
                  <span className={styles.form__title}>Gmail</span>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type='email'
                           className={classNames(
                              emailClassNames,
                              formik.values.email && styles.form__input_active
                           )}
                           placeholder='Enter your Gmail'
                           name='email'
                           onChange={handleEmailChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.email}
                        />
                        {emailLoading ? (
                           <div className={styles.form__emailAnswer}>
                              <div className='loader'></div>
                           </div>
                        ) : emailSucces === false ? (
                           <div className={styles.form__emailAnswer}>
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 width='50'
                                 height='50'
                                 viewBox='0 0 50 50'>
                                 <line
                                    x1='10'
                                    y1='10'
                                    x2='40'
                                    y2='40'
                                    stroke='red'
                                    strokeWidth='4'
                                 />
                                 <line
                                    x1='40'
                                    y1='10'
                                    x2='10'
                                    y2='40'
                                    stroke='red'
                                    strokeWidth='4'
                                 />
                              </svg>
                           </div>
                        ) : emailSucces && !formik.errors.email ? (
                           <div className={styles.form__emailAnswer}>
                              <svg viewBox='0 0 50 50'>
                                 <polyline
                                    points='10,25 20,35 40,15'
                                    stroke='#009900'
                                    strokeWidth='4'
                                    fill='none'
                                 />
                              </svg>
                           </div>
                        ) : (
                           <img src={dogIcon} alt='dog icon' className={styles.form__icon} />
                        )}
                     </div>
                     <ErrorMessage formik={formik} name='email' />
                  </div>
               </label>
               <label className={styles.form__label}>
                  <span className={styles.form__title}>Password</span>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type={showPassword ? 'text' : 'password'}
                           className={classNames(
                              pswClassNames,
                              formik.values.password && styles.form__input_active
                           )}
                           placeholder='Enter your Password'
                           name='password'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.password}
                        />
                        <img
                           src={showPassword ? eyeClosedIcon : eyeOpenedIcon}
                           alt='eye opened'
                           className={styles.form__icon}
                           onClick={handlePasswordShow}
                        />
                     </div>
                     <ErrorMessage formik={formik} name='password' />
                  </div>
               </label>
               <label className={styles.form__label}>
                  <span className={styles.form__title}>Re-Password</span>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type={showConfirmPassword ? 'text' : 'password'}
                           className={classNames(
                              passwordConfirmClassNames,
                              formik.values.passwordConfirm && styles.form__input_active
                           )}
                           placeholder='Re-Enter your Password'
                           name='passwordConfirm'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.passwordConfirm}
                        />
                        <img
                           src={showConfirmPassword ? eyeClosedIcon : eyeOpenedIcon}
                           alt='eye icon'
                           className={styles.form__icon}
                           onClick={handleConfirmPasswordShow}
                        />
                     </div>
                     <ErrorMessage formik={formik} name='passwordConfirm' />
                  </div>
               </label>
            </div>
            <button
               className='btn'
               type='submit'
               disabled={!!Object.keys(formik.errors).length || isLoading || emailError}>
               {isLoading ? <span>Loading...</span> : <span>Sign In</span>}
            </button>
         </form>
         <div className={styles.wrapper__bottom}>
            Already have an account?{' '}
            <Link to='/signin' className='accent-color'>
               Sign In Now
            </Link>
         </div>
      </div>
   );
};

export default SignUpForm;
