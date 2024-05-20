'use client'

//The Menu component that renders the dynamic components.
export default function Menu({ genres, onGenreSelection } : {genres : string[]; onGenreSelection:(genre:string) => void}){
    
// The starters setting where we choose a genre.
function StartingSetting(){
    return(
        <div >
            <p className="text-white text-center Damfont-mono text-xl md:text-2xl lg:text-3xl xl:text-4xl"> Choose a genre to get started:</p>
            <div className="grid grid-cols-3 gap-4 mt-12">
            {genres.map((genre) => (
                <button className="bg-slate-600 p-4 rounded-sm" key={genre} onClick={()=>onGenreSelection(genre)}>{genre}</button>
            ))}
            </div>
        </div>
    )
}
return <StartingSetting/>

}



