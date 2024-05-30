type SmallCardSelectorProps = {
    onSelect: (choice: 'yes' | 'no') => void;
};

export default function SmallCardSelector({ onSelect }: SmallCardSelectorProps) {
    return (
        <div className="flex mt-12 w-full justify-center space-x-6">
            <div 
                className="flex flex-col justify-center items-center w-1/3 h-auto shadow-lg rounded-xl hover:scale-110 transition-transform duration-300 bg-blue-600 cursor-pointer" 
                style={{ aspectRatio: '1/1' }}
                onClick={() => onSelect('no')}
            >
                No 
            </div>
            <div 
                className="flex flex-col justify-center items-center w-1/3 h-auto shadow-lg rounded-xl hover:scale-110 transition-transform duration-300 bg-rose-600 cursor-pointer" 
                style={{ aspectRatio: '1/1' }}
                onClick={() => onSelect('yes')}
            > 
                Yes
            </div>
        </div>
    );
}
