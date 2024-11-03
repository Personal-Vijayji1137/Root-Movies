import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProductTable from './components/ProductTable';
import Styles from "./components/styles.module.css"
export default function Home() {
  return (
    <div className={Styles.dashboard}>
      <Sidebar />
      <div className={Styles.mainContent}>
        <Header />
        <ProductTable />
      </div>
    </div>
  );
}