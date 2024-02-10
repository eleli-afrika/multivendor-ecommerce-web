import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface ListLoaderProps {
    count: number;
}

const ListLoader: React.FC<ListLoaderProps> = ({ count }) => {
    const elements = Array.from({ length: count }, (_, index) => index);
    return (
        <>
            {elements.map((element) => (
                <Box sx={{ mx: 3 }} key={element}>
                    <Skeleton animation="wave" width={200} height={100} className={'bg-gray-700'} />
                    <Skeleton width="80%" animation="wave" className={'bg-gray-700 mt-2'} />
                </Box>
            ))}
        </>
    );
};

export default ListLoader;
