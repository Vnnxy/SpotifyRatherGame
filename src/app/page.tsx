import DisplayManager from "./components/DisplayManager";

/**
 * Main page where we render our components.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <DisplayManager/>
    </main>
  );
}