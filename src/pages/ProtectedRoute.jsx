import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  //use effect component ke render ho jane ke bad run hota h agar ham direct "return children" karte h to user
  // component me null ka error aata h "TypeError: Cannot read properties of null (reading 'avatar')  at User"
  // to esliye hame yha conditionally check karna padega

  // ** agar kabh unnecessary eslint error aaye tab :  "// eslint-disable-next-line"
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
