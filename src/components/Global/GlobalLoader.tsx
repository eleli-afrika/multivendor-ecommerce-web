const GlobalLoader = () => {
    const loaderStyles = {
        width: '50px',
        height: '50px',
        backgroundColor: '#ff3d00',
        borderRadius: '50%',
        position: 'relative' as 'relative',
        boxShadow: '0 0 30px 4px rgba(0, 0, 0, 0.5) inset, 0 5px 12px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        display: 'inline-block',
    };

    const waveStyles = {
        content: '""',
        position: 'absolute' as 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '45%',
        top: '-40%',
        backgroundColor: '#fff',
        animation: 'wave 5s ease-in-out infinite', // Added ease-in-out for smoother animation
    };

    const beforeStyles = {
        ...waveStyles,
        borderRadius: '30%',
        background: 'rgba(255, 255, 255, 0.6)', // Adjusted background color for more visibility
    };

    return (
        <div className="flex gap-2">
            <span style={loaderStyles} className="animate-bounce">
                <span style={waveStyles}></span>
                <span style={beforeStyles}></span>
            </span>
            <span style={loaderStyles} className="animate-bounce">
                <span style={waveStyles}></span>
                <span style={beforeStyles}></span>
            </span>
            <span style={loaderStyles} className="animate-bounce">
                <span style={waveStyles}></span>
                <span style={beforeStyles}></span>
            </span>
        </div>
    );
};

export default GlobalLoader;
