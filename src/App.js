import { useState } from 'react';
import './App.css';
import APIDataForm from './components/APIDataForm';
import CommitHistory from './components/CommitHistory';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className='container'>
        {!userData && <APIDataForm setUserData={setUserData}/>}
        {userData && <CommitHistory {...userData} />}
    </div>
  );
}

export default App;