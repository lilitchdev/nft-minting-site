import './App.css';
import { useState } from 'react';
import Mainmint from './MainMint';
import Navbar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [totalMintCount, setTotalMintCount] = useState(0);

  return (<div className="App">
    <Navbar accounts={accounts} setAccounts={setAccounts} totalMintCount={totalMintCount} setTotalMintCount={setTotalMintCount}/>
    <Mainmint accounts={accounts} setAccounts={setAccounts} totalMintCount={totalMintCount} setTotalMintCount={setTotalMintCount} />
  </div>);
}

export default App;
