// import Leaderboard from "./pages/Leaderboard";

// function App() {
//   return (
//     <div>
//       <Leaderboard />
//     </div>
//   );
// }

// export default App;



import Leaderboard from "./pages/Leaderboard";
import "./App.css";

function App() {
  return (
    <div className="App fade-in">
      {/* Main Leaderboard Page */}
      <main className="w-full max-w-7xl mx-auto px-2 sm:px-4">
        <Leaderboard />
      </main>

      {/* Footer */}
      <footer className="mt-10 text-sm text-[#5B3926]/80 pb-4 text-center">
        <p>© {new Date().getFullYear()} LitSoc | Crafted with ❤️ | Keep Writing • Keep Dreaming
 </p>
      </footer>
    </div>
  );
}

export default App;
