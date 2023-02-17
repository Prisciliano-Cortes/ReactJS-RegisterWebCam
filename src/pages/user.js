import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { getUsers } from '../firebase/provider'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../style/carousel.css';
import { Spinner } from '../components/spinner';

export const User = () => {
    const [user, setUser] = useState(null);

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    
    useEffect(() => {
        const getAllUsers = async() => {
            const users = await getUsers();
            setUser(users)
        }

        getAllUsers();
    }, [])

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
            
                {
                    user === null ? <Spinner /> :
                    user.map( ({id, name, profile}) => (
                        <SwiperSlide key={id}>
                            <div>
                                <p> {name} </p>
                                <img 
                                    src={profile} 
                                    alt='Profile' 
                                    className="rounded-xl w-[94%] min-h-[200px] max-h-[200px] block m-auto"
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
                <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    )
}
