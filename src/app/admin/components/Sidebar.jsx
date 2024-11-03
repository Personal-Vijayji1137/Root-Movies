import Styles from "./styles.module.css"
export default function Sidebar() {
    return (
      <aside className={Styles.sidebar}>
        <h2 className={Styles.logo}>Root Movies</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li className={Styles.active}>Actors</li>
            <li>Customer</li>
            <li>Employee</li>
            <li>Billing</li>
            <li>Analytics</li>
            <li>Setting</li>
            <li>Help</li>
          </ul>
        </nav>
        <button className={Styles.logout}>Log out</button>
      </aside>
    );
  }
  