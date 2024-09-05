import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateContainer, Header, MainContainer } from './Components';
import { AnimatePresence } from 'framer-motion';
import { StateProvider, useStateValue } from './Context/StateProvider'; // Ensure this import is correct
import { actionType, reducer } from './Context/Reducer'; // Ensure this import is correct
import { initialState } from './Context/initialState'; // Ensure this import is correct
import { getAllFoodItems } from './utils/firebaseFunctions';
import Dashboard from './pages/Dashboard'
import 'bootstrap/dist/js/bootstrap'


// Main App component
function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    try {
      const data = await getAllFoodItems();
      console.log("Fetched data from Firestore in APP JS:", data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    } catch (error) {
      console.error("Error fetching food items: ", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (

    <StateProvider initialState={initialState} reducer={reducer}>
      <AnimatePresence>
        <div className='w-screen h-auto flex flex-col bg-primary'>
          <Header />
          <main className='mt-14 md:mt-20 md:px-16 px-4 py-4 w-full'>
            <Routes>
              <Route path='/*' element={<MainContainer />} />
              <Route path='/createItem' element={<CreateContainer />} />
              <Route path='/dashboard/*' element={<Dashboard/>} />
            </Routes>
          </main>
        </div>
      </AnimatePresence>
    </StateProvider>
  );
}

export default App;
