import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface ImageLoaderProps {
    count: number;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ count }) => {
    const elements = Array.from({ length: count }, (_, index) => index);
    return (
        <>
            {elements.map((element) => (
                <Box sx={{ mx: 3 }} key={element}>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={250}
                        className={'bg-gray-700 w-full'}
                    />
                </Box>
            ))}
        </>
    );
};

export default ImageLoader;
