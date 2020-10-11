import React from 'react';
import ReactDOM from 'react-dom';

import Message, { MessageProvider } from 'shared/components/messages';
import './styles.scss';
import Header from './layout/header';
import Form from './pages/form';

function App() {
  return (
    <MessageProvider>
      <>
        <Header />
        <div className="App App-container">
          <Message />
          <Form />
        </div>
      </>
    </MessageProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
