import { ThreeDots } from 'react-loader-spinner'
const Loading = () => {
    return (
        <>
            <ThreeDots
                visible={true}
                height="50"
                width="50"
                color="#2564ed"
                radius="50"
                ariaLabel="three-dots-loading"
                wrapperClass="dots-container"
            />
        </>
    );
};

export default Loading;