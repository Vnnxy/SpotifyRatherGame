import Card from './components/Card' 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className='flex mt-12 w-full justify-center space-x-32'>
        <Card playlistName='Test' imageURL='https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526' artist="Frank ocean" position='left'/>
        <Card playlistName='Test' imageURL='https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5' artist="Seventeen" position='right'/>
      </div>
    </main>
  );
}
