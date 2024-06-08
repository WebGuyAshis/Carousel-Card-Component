import React, { useState, useRef } from 'react';
import './carouselcard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function CarouselCard({ cardData }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardHovered, setCardHovered] = useState(true);

    const videoRefs = useRef([]);

    const [mediaArr, setMediaArr] = useState([])

    useState(() => {
        if (cardData) {
            setMediaArr(cardData.media_arr)
        }
    }, [cardData])

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? mediaArr.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === mediaArr.length - 1 ? 0 : prevIndex + 1));
    };

    const handleMouseEntered = () => {
        setCardHovered(true);
    };

    const handleMouseLeave = () => {
        setCardHovered(false);
    };

    const onVideoHover = (index) => {
        if (videoRefs.current[index] && videoRefs.current[index].currentSrc) {
            const promise = videoRefs.current[index].play();
            if (promise !== undefined) {
                promise.catch(error => {
                    // Auto-play was prevented, show some UI element to let the user start playback
                    console.error('Video playback prevented:', error);
                }).then(() => {
                    // Video playback started
                });
            }
        }
    };

    const onVideoUnHovered = (index) => {
        if (videoRefs.current[index]) {
            videoRefs.current[index].pause();
        }
    };

    return (
        <div className='carouselCard' onMouseEnter={handleMouseEntered} onMouseLeave={handleMouseLeave}>
            <div className="media">
                <div className="carouselContainer" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {
                        mediaArr.map((media, index) => (
                            <div key={index} className="mediaFile">
                                {
                                    media.type === 'Video' ?
                                        <video
                                            className='media'
                                            src={media.media}
                                            ref={el => videoRefs.current[index] = el}
                                            onMouseEnter={() => onVideoHover(index)}
                                            onMouseLeave={() => onVideoUnHovered(index)}
                                            muted
                                            loop
                                            playsInline
                                        ></video>
                                        : <img className='media' src={media.media} alt={`Slide ${index}`} />
                                }
                            </div>
                        ))
                    }
                </div>

                {
                    cardHovered &&
                    <>
                        <div className="prevBtnCont">
                            {currentIndex > 0 && (
                                <button onClick={prevSlide} className="prev">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                            )}
                        </div>
                        <div className="nextBtnCont">
                            {currentIndex < mediaArr.length - 1 && (
                                <button onClick={nextSlide} className="next">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            )}
                        </div>
                    </>
                }

                <div className="carouselShowBtns">
                    {mediaArr.map((media, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`carouselBtn ${currentIndex === index ? 'activeIndex' : ''}`}
                        ></div>
                    ))}
                </div>
            </div>
            <div className="content">
                <h3>{cardData.title}</h3>
                <p>
                    {cardData.description}
                </p>
            </div>
        </div>
    );
}

export default CarouselCard;
