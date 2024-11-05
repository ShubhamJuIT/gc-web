'use client'


import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Input } from './ui/input';

interface PaginationPropsType {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isSticky?: boolean;
}

const Pagination = (props: PaginationPropsType) => {
    const { toast } = useToast()

    const [pageNumber, setPageNumber] = useState<number>(1);
    const onkeydownHandler = (e: any) => {
        if (e.keyCode === 13) {

            if (pageNumber > props.totalPages) {

                toast({
                    title: "Page limit exceeded",
                    description: `Maximum number of pages are ${props.totalPages}`,
                })

                setPageNumber(props.currentPage)
                return;
            }
            props.onPageChange(pageNumber)
        }
    }

    const inputOnChangeHandler = (e: any) => {
        setPageNumber(+e.target.value)
    }

    const pageChangeByNavigation = (actionType: "NEXT" | "PREV" | "JUMP_TO_FIRST" | "JUMP_TO_LAST") => {

        switch (actionType) {
            case 'JUMP_TO_FIRST':

                props.onPageChange(1);
                break;
            case 'PREV':
                props.onPageChange(props.currentPage - 1);
                break;
            case 'NEXT':

                props.onPageChange(props.currentPage + 1);
                break;
            case 'JUMP_TO_LAST':

                props.onPageChange(props.totalPages);
                break;

            default:
                break;
        }


    }

    useEffect(() => {

        if (props?.currentPage) {
            setPageNumber(props?.currentPage)
        }
    }, [props?.currentPage])

    return (
        <div className={` ${props?.isSticky ? 'fixed bottom-0 left-0 right-0 z-40  bg-background border-t border-gray-100/20  px-10 py-4' : ""} `}>

            <div className="flex items-center  md:justify-end justify-center  md:gap-3 gap-2">
                <Button
                    aria-label='Pagination button to navigate to first page'
                    size='icon'
                    variant="outline"
                    className=' rounded-lg md:w-10 md:h-10 w-7 h-7 '
                    disabled={props.currentPage === 1}
                    onClick={() => pageChangeByNavigation('JUMP_TO_FIRST')}
                >
                    <ChevronsLeft />


                </Button>
                <Button
                    aria-label='Pagination button to navigate to previous page'
                    size='icon'
                    variant="outline"
                    className=' rounded-lg md:w-10 md:h-10 w-7 h-7 '
                    disabled={props.currentPage === 1}
                    onClick={() => pageChangeByNavigation('PREV')}
                >
                    <ChevronLeft />
                </Button>
                <div className="gap-3 sm:text-base text-sm flex items-center">
                    <label htmlFor='page'>Page</label>
                    <Input
                        id='page'
                        className="w-16 px-2 py-1 text-center border  rounded-md"
                        value={pageNumber}

                        type="number"


                        onKeyDown={onkeydownHandler}
                        onChange={inputOnChangeHandler}
                    />
                    <span className=' whitespace-nowrap text-foreground'> of {props.totalPages}</span>
                </div>
                <Button
                    aria-label='Pagination button to navigate to next page'
                    size='icon'
                    variant="outline"
                    className=' rounded-lg md:w-10 md:h-10 w-7 h-7 '
                    disabled={props.currentPage >= props.totalPages}
                    onClick={() => pageChangeByNavigation('NEXT')}
                >
                    <ChevronRight />
                </Button>
                <Button
                    aria-label='Pagination button to navigate to last page'
                    size='icon'
                    variant="outline"
                    className=' rounded-lg md:w-10 md:h-10 w-7 h-7 '
                    disabled={props.currentPage >= props.totalPages}
                    onClick={() => pageChangeByNavigation('JUMP_TO_LAST')}
                >
                    <ChevronsRight />
                </Button>
            </div>

        </div>

    );
};

export default Pagination;
