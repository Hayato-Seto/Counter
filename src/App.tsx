import React from 'react';
import './App.css';
import CounterList from './components/counterList';

const App: React.FC = () => {
  return (
    <div className='App'>
      <div className='counterList'>
        <CounterList />
      </div>
    </div>
  );
}

export default App;
