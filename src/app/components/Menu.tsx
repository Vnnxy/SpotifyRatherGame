'use client'

/**
 * Menu component that displays the genres.
 * @param genres The genres the user will be able to choose from.
 * @param onGenreSelection Handler for the selection of a genre.
 * @returns void 
 */
export default function Menu({ genres, onGenreSelection } : {genres : string[]; onGenreSelection:(genre:string) => void}){
    
// The starters setting where we choose a genre.
function StartingSetting(){
    return(
        <div >
            <p className="text-white text-center tracking-widest Damfont-mono uppercase font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl"> Choose a genre to get started:</p>
            <div className="grid grid-cols-3 gap-4 mt-12">
            {genres.map((genre) => (
                <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200" key={genre} onClick={()=>onGenreSelection(genre)}>{genre}</button>
                
                
            ))}
            </div>
        </div>
    )
}
return <StartingSetting/>

}




