
"use client"
import UploadProfile from "@/components/upload-profile"
import UpdateProfileForm from "@/components/forms/update-profile-form";
import { useEffect, useState } from "react";
import { AuthService } from "@/app/_services/auth/auth.service";
import { showErrorToast } from "@/app/data/error.manager";
import { User } from "@/app/data/_models/user";
import SimpleLoader from "@/components/simple-loader";
import { useUserContext } from "@/app/contexts/userContext";
import { MyProfileModel } from "@/app/data/_models/my.profile.model";
import { Loader2 } from "lucide-react";
import AlertDialogWrapper from "@/components/alert-dialog-wrapper";


const MyProfile = () => {
    const { setUserData } = useUserContext()
    const [thumbnailLoader, setThumbnailLoader] = useState<boolean>(false);
    const [data, setData] = useState<MyProfileModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [removeThumnailLoader, setRemoveThumnailLoader] = useState<boolean>(false);
    const onUpdateMyProfile = (newData: any) => {
        const val = {
            name: newData?.name,
            emailId: newData?.emailId,
            contactNumber: newData?.contactNumber,
            profileImage: newData?.profileImageUrl,
            userName: newData?.userName
        }

        setUserData((prev: any) => {
            return {
                ...prev,
                ...val

            }
        })
        setData(newData)
        User.updateLocalProfileData(val);
    }


    const removeThumnail = async () => {
        const userId = User.getUserId();
        if (!userId) {
            return
        }
        setRemoveThumnailLoader(true);
        try {
            await AuthService.deleteAccountImage(userId);
            setUserData((prev: any) => {
                return {
                    ...prev,
                    profileImage: null
                }
            })
            setData((prev: any) => {
                return {
                    ...prev,
                    profileImageUrl: null
                }
            })

            User.updateLocalProfileData({
                profileImage: null
            });

            setRemoveThumnailLoader(false);

        } catch (error) {
            showErrorToast(error);
            setRemoveThumnailLoader(false);
        }


    }

    const onUploadThumbnail = async (blob: Blob) => {
        const userId = User.getUserId();
        if (!userId) {
            return
        }

        setThumbnailLoader(true);
        try {
            const val = await AuthService.updateAccountImage(userId, blob);

            setUserData((prev: any) => {
                return {
                    ...prev,
                    profileImage: val?.profileImageUrl
                }
            });
            setData(val);
            User.updateLocalProfileData({ profileImage: val?.profileImageUrl });
            setThumbnailLoader(false);

        } catch (error) {
            showErrorToast(error);
            setThumbnailLoader(false);
        }

    }


    const fetchMyProfile = async () => {
        setLoading(true)
        try {
            const res = await AuthService.getMyProfile();
            setData(res)
            setLoading(false)


        } catch (error) {
            showErrorToast(error)
            setLoading(false)

        }
    }

    useEffect(() => {
        if (User.isLoggedIn()) {
            fetchMyProfile()
        }
    }, [])



    return (
        <section>
            <h1 className='mb-3 lg:text-5xl text-4xl text-primary  font-bold  -tracking-[2.5px]'>My Profile</h1>
            <p className=" lg:mb-10 mb-8  lg:text-2xl text-xl font-light">Manage your details, and change your password.</p>
            {loading && <SimpleLoader />}
            {(!loading && !data) && <div className=" no-data">
                No information available
            </div>}

            {(!loading && data) && <>
                <div className=" relative md:max-w-[300px] border  border-secondary  border-dashed lg:p-9 md:p-8 p-7  rounded-2xl mb-7   ">

                    <UploadProfile
                        loading={thumbnailLoader} onClickUpload={onUploadThumbnail} thumbnailUrl={data?.profileImageUrl} alt={data?.name ?? 'Placeholer'} />
                    {data?.profileImageUrl && <div className=' absolute top-3 right-3'>
                        <AlertDialogWrapper
                            actionText="Remove"
                            onAction={removeThumnail}
                            title="Are you sure about deleting this profile image?"

                        >
                            <button disabled={removeThumnailLoader} type='button' title='remove' className='w-8 h-8 text-2xl flex justify-center items-center bg-black text-primary border rounded-full'>
                                {removeThumnailLoader ? <Loader2 className=" h-4 w-4 animate-spin" /> :
                                    <span className=' icon-md'>
                                        <i className=' icon-cross'></i>
                                    </span>}

                            </button>
                        </AlertDialogWrapper>

                    </div>}

                </div>
                <div className="  border  border-secondary  border-dashed lg:p-9 md:p-8 p-7  rounded-2xl">

                    <UpdateProfileForm isMyProfile={true} onSuccess={onUpdateMyProfile} userData={data} />
                </div>

            </>}

        </section>
    )
}

export default MyProfile