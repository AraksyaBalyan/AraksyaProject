import './App.css';
import Product from './Product';

function App() {
  return (
    <div className="App">
      <Product name="bananas" price="1$" description="Fresh bananas from Ecuador" />
      <Product name="apples" price="1$" description="Fresh apples from Ecuador" />
      <Product name="orange" price="1$" description="Fresh oranges from Ecuador" />
      <Product name="kiwi" price="1$" description="Fresh kiwis from Ecuador" />
    </div>
  );
}

export default App;
