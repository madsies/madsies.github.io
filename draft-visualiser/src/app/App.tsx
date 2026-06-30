import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import {Draft} from "../pages/Draft";
import {Create} from "../pages/Create";
import {DataProvider} from "../shared/DataContext"

function App() {

  return (
    <>
    <DataProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Create/>}/>
          <Route path="/draft" element={<Draft/>}/>
        </Routes>
      </Layout>
    </DataProvider>
    </>
  )
}

export default App
