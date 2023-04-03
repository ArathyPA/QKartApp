import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks"

export const config = {
  endpoint: `https://eqkart-frontend.onrender.com/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}

      
     
      <Switch>
        <Route exact path="/" component={Products} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/thanks"  component={Thanks}/>
          
      </Switch>
   
          {/*<Register /> */}
        
    </div>
  );
}

export default App;
