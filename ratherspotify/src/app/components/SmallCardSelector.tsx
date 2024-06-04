interface SmallCardSelectorProps {
    onClick: (value: boolean) => void;
}

const SmallCardSelector: React.FC<SmallCardSelectorProps> = ({ onClick }) => {
    return (
        <div className="flex mt-12 w-full justify-center space-x-6">
            <div 
                className="flex flex-col justify-center items-center w-1/3 h-auto shadow-lg rounded-xl hover:scale-110 transition-transform duration-300 bg-blue-600 cursor-pointer" 
                style={{ aspectRatio: '1/1' }}
                onClick={() => onClick(false)}
            >
                No 
            </div>
            <div 
                className="flex flex-col justify-center items-center w-1/3 h-auto shadow-lg rounded-xl hover:scale-110 transition-transform duration-300 bg-rose-600 cursor-pointer" 
                style={{ aspectRatio: '1/1' }}
                onClick={() => onClick(true)}
            > 
                Yes
            </div>
        </div>
    );
}

export default SmallCardSelector;
