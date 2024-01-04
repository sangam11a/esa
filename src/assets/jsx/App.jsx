import React from 'react';
// import './App.css';
import '../css/App.css';
import Navbar from './Navbar';
import Card from './card';
import FirstImg from './FirstImg';
import ContactUs from './Contact';
import Dynamic from './Dynamic';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
      <Navbar />
      </header>
      <main className="App-container">
        <section>
          <FirstImg/>
        </section>
        <section className='product'>
          <center><h1>Products</h1></center>
          <Card/>
        </section>
        <section className='contact'>
          <center>
            <h1>
              Contact Us
              <i className='fas fa-phone' ></i>
            </h1>
          </center>
          <ContactUs/>
        </section>
        <section>
          <Dynamic/>
        </section>
      </main>
      <footer>
       <center>
       <p>Copyright &copy; {(new Date().getFullYear())} esa. All rights reserved.</p>
       </center>
      </footer>
    </div>
  );
}

export default App;
