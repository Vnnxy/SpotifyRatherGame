/**
 * Interface for the SmallCardSelector props
 */
interface SmallCardSelectorProps {
    onClick: (value: boolean) => void;
}

/**
 * A small version of the cards component, used for choosing between two options.
 * @param onClick The method that will be called when a card is clicked.  
 * @returns void.
 */
const SmallCardSelector: React.FC<SmallCardSelectorProps> = ({ onClick }) => {

    return (
        <div className="flex mt-12 w-full justify-center space-x-12">
            <button 
                className={`flex flex-col justify-center items-center w-1/3 h-auto shadow-lg rounded-xl hover:scale-125 focus:scale-110 transition-transform duration-300 bg-blue-600 cursor-pointer`} 
                style={{ aspectRatio: '1/1' }}
                onClick={() => onClick(false)}
            >
                No 
            </button>
            <button 
                className="flex flex-col justify-center items-center w-1/3 h-auto shadow-lg rounded-xl hover:scale-125 focus:scale-110 transition-transform duration-300 bg-rose-600 cursor-pointer" 
                style={{ aspectRatio: '1/1' }}
                onClick={() => onClick(true)}
            > 
                Yes
            </button>
        </div>
    );
}

export default SmallCardSelector;
