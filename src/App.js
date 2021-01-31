import React from 'react';

import Layout from './components/Layout/Layout';


const App = () =>  {
  return (
    <div>
      <Layout>
        <p>Does the <code>props.children</code> render?</p> 
      </Layout>
    </div>
  );
};


export default App;