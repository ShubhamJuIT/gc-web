"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import React, { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "./ui/button";
import { ScrollArea } from './ui/scroll-area';
import DynamicImage from './dynamicImage';
import { Loader2 } from 'lucide-react';
import { set } from 'date-fns';




const UploadProfile = (
    props: {
        thumbnailUrl?: string,
        alt: string,
        onClickUpload: (blob: Blob) => void,
        loading?: boolean,
    }
) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ width: number, height: number, x: number, y: number } | null>(null);
    const [open, setOpen] = useState(false);



    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
        }
    };

    const onCropComplete = (
        croppedArea: { width: number, height: number, x: number, y: number },
        croppedAreaPixels: { width: number, height: number, x: number, y: number }
    ) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const createImageBlob = async (): Promise<Blob | null> => {
        if (!imageSrc || !croppedAreaPixels) return null;

        const image = new window.Image();
        image.src = imageSrc;

        return new Promise<Blob | null>((resolve, reject) => {
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) return reject(null);

                canvas.width = croppedAreaPixels.width;
                canvas.height = croppedAreaPixels.height;

                ctx.drawImage(
                    image,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                canvas.toBlob((blob) => {
                    if (!blob) return reject(null);
                    resolve(blob);
                }, 'image/jpeg', 0.7); // Set quality for JPEG
            };

            image.onerror = () => reject(null);
        });
    };



    const onSave = async () => {
        const blob = await createImageBlob();
        if (blob) {

            props.onClickUpload(blob);
            resetImage();
            setOpen(false);
        }
    };

    const chooseFileRef = useRef<HTMLInputElement | null>(null);
    const triggerChooseFileInput = () => chooseFileRef.current?.click();

    const resetImage = () => {
        setImageSrc(null);
        setCroppedAreaPixels(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });

    }
    return (
        <div>
            <div className=' flex flex-col items-center gap-5'>
                <div className=' w-[170px] h-[170px] flex-none mx-auto rounded-full overflow-hidden bg-regular'>
                    <DynamicImage
                        alt='User Image'
                        src={props?.thumbnailUrl ?? '/svgs/user.svg'}
                        fallbackImage='/svgs/user.svg'
                    />

                </div>

                <Dialog modal={true} open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button disabled={props?.loading} size='lg' variant='outline' onClick={() => setOpen(true)} >
                            {props?.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}    Upload
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Profile</DialogTitle>
                            <DialogDescription>
                                Make changes and click save when you are done.
                            </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className={`${imageSrc ? 'h-[320px]' : " h-auto"} `}>


                            {imageSrc ? (
                                <>
                                    <Cropper
                                        image={imageSrc}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1 / 1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}

                                    />

                                </>
                            ) :

                                <>

                                    <div
                                        onClick={triggerChooseFileInput}
                                        className='border border-dashed border-primary rounded-xl cursor-pointer flex justify-center items-center w-full h-40 mx-auto'
                                    >
                                        <div className='text-black50 text-center w-2/4 mx-auto p-3 border-primary border border-dashed rounded-xl'>
                                            <p>Choose File</p>
                                        </div>
                                    </div>
                                    <input
                                        ref={chooseFileRef}
                                        className='hidden'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageUpload}
                                    />
                                </>
                            }

                        </ScrollArea>


                        <DialogFooter className=' flex md:items-center md:gap-3 gap-5 md:flex-row flex-col '>
                            <Button onClick={resetImage} disabled={!imageSrc} variant='outline' >Reset</Button>
                            <Button onClick={onSave} disabled={!imageSrc}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    );
};

export default UploadProfile;
