"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = (props: any) => {
    let { asset, src, poster, blurDataURL, ...rest } = props;


    //video path

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // fir for hidration error 
        setIsMounted(true);
    }, []);
    return (
        <div className=" relative">
            {isMounted &&

                <ReactPlayer
                    light={
                        poster ?
                            <figure className=" relative  w-full h-full overflow-hidden flex-none   rounded-lg ">
                                <Image
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    fill
                                    src={poster}
                                    alt='Thumbnail'
                                    className="w-auto h-auto object-cover"
                                />

                            </figure>
                            : false
                    }
                    playing={true}
                    controls={true}
                    volume={1}
                    muted={true}
                    url={src}
                    width='100%'

                    {...rest}

                />

            }

        </div>
    );
};

export default VideoPlayer;
