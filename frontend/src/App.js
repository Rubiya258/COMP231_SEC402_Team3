import HeaderComponent from "./component/HeaderComponent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateAccount from "./component/CreateAccount";
import LoginComponent from "./component/LoginComponent";
import { getLoggedInUserId, isUserLoggedIn } from "./service/AuthApiService";
import HomePage from "./component/Home";

function App() {
  const activeUserId = getLoggedInUserId();

  function AuthenticatedRoute({ children }) {
    const isAuthenticated = isUserLoggedIn();

    if (isAuthenticated) {
      return children;
    }
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<LoginComponent />} />
          
          {/* Example of how you'll add protected routes later */}
          {/* <Route 
            path="/tasks" 
            element={
              <AuthenticatedRoute>
                <TasksComponent userId={activeUserId} />
              </AuthenticatedRoute>
            } 
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;