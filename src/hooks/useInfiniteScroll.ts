import { useEffect } from 'react';

interface UseInfiniteScrollProps {
    isFetching: boolean;
    hasNextPage: boolean;
    loadMore: () => void;
}

export const useInfiniteScroll = ({ isFetching, hasNextPage, loadMore }: UseInfiniteScrollProps) => {
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5 && hasNextPage && !isFetching) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching, hasNextPage, loadMore]);
};
