import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface ProductLoaderProps {
    count: number;
}

const DetailLoader: React.FC<ProductLoaderProps> = ({ count }) => {
    const elements = Array.from({ length: count }, (_, index) => index);
    return (
        <>
            {elements.map((element) => (
                <Box sx={{ mx: 3 }} key={element}>
                    <Skeleton animation="wave" width={200} height={250} className={'bg-gray-700'} />
                    
                    <Skeleton width="60%" animation="wave" className={'bg-gray-700 mt-2'} />
                </Box>
            ))}
        </>
    );
};

export default DetailLoader;
