"use client"
import { prepareSearchParamString } from '@/app/data/_helpers/text-methods';
import Pagination from './pagination';
import { useRouter } from 'next/navigation';

const CourseListPagination = (props: {
    query: string,
    page: number,
    totalSize: number,
    pageSize: number,
}) => {
    const router = useRouter();
    const handlePageChange = (pageNo: number) => {
        const paramString = prepareSearchParamString({
            q: props?.query,
            p: String(pageNo),

        })
        router.push(`/courses?${paramString}`);

    };

    return (
        <div className=" mt-10">
            <Pagination
                onPageChange={handlePageChange}
                currentPage={props?.page}
                totalPages={Math.ceil(props?.totalSize / props?.pageSize)} />
        </div>
    )
}

export default CourseListPagination;