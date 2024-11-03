import RootGetCustomImagesURL from "@/app/CommonFunctions";
import Styles from "./styles.module.css"
import Link from "next/link";
export default async function Header() {
    return (
      <header className={Styles.header}>
        <input type="text" className={Styles.search} placeholder="Search" />
        <div className={Styles.actions}>
          <button className={Styles.filterBtn}>Filter</button>
          <button className={Styles.exportBtn}>Export</button>
          <Link href="/admin/add-movies" className={Styles.addBtn}>+ Add New Movie</Link>
        </div>
        <div className={Styles.profile}>
          <span>Root Admin</span>
          <img src={await RootGetCustomImagesURL('20241103055702901.jpg',100)} alt="Profile" className={Styles.avatar} />
        </div>
      </header>
    );
  }
  