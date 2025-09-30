import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";

// step 1 : create context
const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    },
    [currentCity.id]
  );

  // here i am insert city in fake api
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating city");
    } finally {
      setIsLoading(false);
    }
  }
  // here i am deleting city from fake api
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting city");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    // step 2 : yha ham return kra rhe h and assign value in context using provider
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
      {children}
      {/* yha hamne children es liye rakha h ki yha jis jis component ko eska value chahiye vo aayenge aur value ko access karenge */}
    </CitiesContext.Provider>
  );
}
// here we are creating custom hook for using context api value
function useCities() {
  //step 3 : here use context
  const context = useContext(CitiesContext);
  return context;
}
/* eslint-disable react-refresh/only-export-components */
export { CitiesProvider, useCities };

CitiesProvider.propTypes = {
  children: PropTypes.object,
};
