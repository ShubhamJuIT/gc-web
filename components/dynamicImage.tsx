'use client'
import Image from "next/image";
import { useState } from "react";

interface DynamicImageProps {
    src: string | undefined;
    alt?: string;
    fallbackImage: string;
    className?: string;
    wrapperClassName?: string;
    quality?: number;
}

const DynamicImage = (props: DynamicImageProps) => {
    const [imgError, setImgError] = useState(false);

    const handleImageError = () => {
        setImgError(true);
    };

    const imageSrc = !imgError ? (props.src ? props.src : props.fallbackImage) : props.fallbackImage;
    const altText = props?.alt ?? "image";
    const imgClass = `w-auto h-auto object-cover ${props.className}`;

    return (
        <figure className={`${props?.wrapperClassName ? props?.wrapperClassName : "relative pb-[100%]"}`}>
            <Image
                quality={props?.quality}
                src={imageSrc}
                alt={altText}
                onError={handleImageError}
                className={imgClass}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
            />
        </figure>
    );
};

export default DynamicImage;
