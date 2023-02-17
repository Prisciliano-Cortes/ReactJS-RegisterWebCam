import React from 'react';
import { Formik } from 'formik'
import { loginApp } from '../firebase/provider';
import { useUserContext } from '../context/userContext';
import { CertificateValidations } from '../validations/certificate';
import { useRedirectActiveUser } from '../hooks/useRedirectActiveUser';

export const Login = () => {

    const { user } = useUserContext();
    
    useRedirectActiveUser(user, "/diploma");

    const onSubmit = async ({email, password}, { setSubmitting, resetForm, setErrors }) => {
        try {
            await loginApp({ email, password });

            resetForm()
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                return setErrors({email: 'User is not registered'})
            }
            if (error.code === "auth/wrong-password") {
                return setErrors({password: "Email/Password is incorrect"})
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className='pt-20 flex items-center justify-center'>
            <div className='mt-6 w-1/3'>
                <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={onSubmit}
                        validationSchema={CertificateValidations}
                    >
                        {
                            ({handleSubmit, handleChange, values, isSubmitting, errors, touched, handleBlur}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder='Email' 
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className='border border-black rounded-lg p-2.5 w-full'
                                        />
                                        {
                                            touched.email && errors.email &&
                                            <div className="p-4 mt-2 text-sm w-full text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                                <span className="font-medium"> {errors.email} </span>
                                            </div>
                                        }
                                    </div>
                                    
                                    <div className='mb-3'>
                                        <input
                                            type="password"
                                            name='password'
                                            placeholder='Password' 
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className='border border-black rounded-lg p-2.5 w-full'
                                        />
                                        {
                                            touched.password && errors.password &&
                                            <div className="p-4 mt-2 mb-4 text-sm w-full text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                                <span className="font-medium"> {errors.password} </span>
                                            </div>
                                        }
                                    </div>
                                    <button 
                                        type='submit'
                                        disabled={isSubmitting}
                                        className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-4 w-full' 
                                    >
                                        Get certificate
                                    </button>
                                </form>
                            )
                        }
                </Formik>
            </div>
        </div>
    )
}
