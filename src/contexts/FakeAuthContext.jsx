import { createContext, useContext, useReducer } from "react";

// step 1 : create context api
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log(user, "isAuthenticated :", isAuthenticated);

  function login(email, password) {
    // console.log(
    //   `user provide email is : '${email}' and fake api email is : '${FAKE_USER.email}'`
    // );
    // console.log(
    //   `user provide password is : '${password}' and fake api password is : '${FAKE_USER.password}'`
    // );

    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
    else console.log("email and password not correct");
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  // here assign value in context api using Provide
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
