import './App.css';
import { useState } from 'react';
import Mainmint from './MainMint';
import Navbar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (<div className="App">
    <Navbar accounts={accounts} setAccounts={setAccounts} />
    <Mainmint accounts={accounts} setAccounts={setAccounts} />
  </div>);
}

export default App;
