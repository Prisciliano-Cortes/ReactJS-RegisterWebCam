import { useState, useRef, useCallback } from 'react';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import emailjs from '@emailjs/browser';
import { WebcamComponent } from './webcam';
import { RegisterValidations } from '../validations/register';
import { EditUrlImg, registerUser, uploadProfileStorage, validateRepeatData } from '../firebase/provider';

export const Register = () => {

    const webcamRef = useRef(null);

    const [imgSrc, setImgSrc] = useState(null);

    const [startCam, setStartCam] = useState(false);

    const onCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const startCamera = () => {
        setStartCam(true);
    };

    const stopCamera = () => {
        setStartCam(false);
        setImgSrc(null);
    };

    const random = Math.random().toString(36).slice(2);

    const onSubmit = async ({name, email, password}, { setSubmitting, resetForm }) => {
        if (imgSrc) {
            try {
                const newUser = {
                    name,
                    email,
                    password,
                    create: new Date().toISOString()
                }

                const generatePdf = {
                    name,
                    email,
                    password,
                    pdf: 'https://alivio-bayer.netlify.app/certificate',
                    create: new Date().toISOString(),
                }

                const rptRepeat = await validateRepeatData(newUser);

                if (rptRepeat === 0) {
                    const id = await registerUser(newUser);
            
                    const respUrl = await uploadProfileStorage(id, imgSrc);
                    await EditUrlImg(id, respUrl);  
                    
                    setTimeout(() => {
                        emailjs.send('service_gmitppu', 'template_lu377l7', generatePdf, '8wNwXKB1yjWkI-Se5')
                        .then((result) => {
                        console.log(result.text);
                        }, (error) => {
                            console.log(error.text);
                        });
                    }, 120000);
                
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully',
                        text: 'User registered',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Email is already exist',
                    })
                }

                resetForm();
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        } 
    };

    const sendMessage = () => {
        // 1 m is 60 s is 60000 ml
        // 60 m is 3600000 ml
        // 6 h is 21600000 ml
        // 8 h is 28800000 ml

        setTimeout(() => {
            console.log("Message received")
        }, 60000);
    }

    return (
        <div className='pt-4 pl-4 flex items-center justify-center'>
            <div>
                <WebcamComponent 
                    startCam={startCam} 
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    stopCamera={stopCamera}
                    startCamera={startCamera}
                    onCapture={onCapture}
                    webcamRef={webcamRef}
                />
                <br />

                <Formik
                    initialValues={{ email: '', password: random, name: '' }}
                    onSubmit={onSubmit}
                    validationSchema={RegisterValidations}
                >
                    {
                        ({handleSubmit, handleChange, values, isSubmitting, errors, touched, handleBlur}) => (
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <input 
                                        type="text" 
                                        name='name'
                                        placeholder='Name' 
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className='border border-black rounded-lg p-2.5 w-full'
                                    />
                                    {
                                        touched.name && errors.name &&
                                        <div className="p-4 mt-2 text-sm w-full text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                            <span className="font-medium"> {errors.name} </span>
                                        </div>
                                    }
                                </div>
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
                                {/* <div className='mb-3'>
                                    <div
                                        onClick={openProfile}
                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2 w-1/4"
                                    >
                                        Upload profile
                                    </div>
                                    <input
                                        ref={ref}
                                        type='file'
                                        accept='image/*'
                                        onChange={(e)=>profileUpload(e, setUrlFile, setFile)}
                                        className="hidden"
                                    />
                                    { urlFile && <img src={urlFile} alt='Profile' className='max-w-[50%] max-h-[50%]' /> }
                                    {
                                        statusImg &&
                                        <div className="p-4 mb-4 text-sm w-1/4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                            <span className="font-medium">Select image</span>
                                        </div>
                                    }
                                </div> */}
                                <div className='mb-3'>
                                    <input
                                        type="hidden"
                                        disabled
                                        name='password'
                                        placeholder='Password' 
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className='border border-black rounded-lg p-2.5 w-full'
                                    />
                                    {
                                        touched.password && errors.password &&
                                        <div className="p-4 mb-4 text-sm w-full text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                            <span className="font-medium"> {errors.password} </span>
                                        </div>
                                    }
                                </div>
                                <button 
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-4 w-full' 
                                >
                                    Register
                                </button>
                            </form>
                        )
                    }
                </Formik>

                <br /><br />
                <button onClick={sendMessage}>Send message</button>
            </div>


        </div>
    )
}
