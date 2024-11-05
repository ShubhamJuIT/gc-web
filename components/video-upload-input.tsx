"use client"
import { Loader2 } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'

const VideoUploadInput = (props: {
    loader: boolean,
    videoUrl?: string,
    onRemoveVideo: () => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <div className={` ${props?.loader ? " opacity-45" : ""} flex items-center gap-2`}>

            {props?.loader && <div className="flex h-10 w-full rounded-md border border-input bg-regular px-3 py-2 text-lg">

                <div className=" flex items-center gap-1">
                    <Loader2 className=" h-4 w-4 animate-spin" /> Uploading...
                </div>

            </div>}

            {(!props?.loader && props?.videoUrl) &&
                <div className="flex h-10 w-full rounded-md border border-input bg-regular px-3 py-2 text-base">
                    <div className="flex justify-between items-center gap-3 w-full">
                        <a title='Click to view video' className='hover:text-primary' href={props?.videoUrl} target="_blank" rel="noopener noreferrer">
                            Video-File.mp4
                        </a>


                        <div>
                            <button onClick={props?.onRemoveVideo} type="button" title="remove" className=" bg-primary/10 text-primary border rounded-full">
                                <i className=" icon-cross"></i>
                            </button>

                        </div>
                    </div>
                </div>}

            {(!props?.loader && !props?.videoUrl) &&

                <Input onChange={props?.onChange} type="file" accept="video/mp4, video/webm" className="text-sm " />

            }



        </div>
    )
}

export default VideoUploadInput