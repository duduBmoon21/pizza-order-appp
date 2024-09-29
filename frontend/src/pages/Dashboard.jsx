import React from 'react'
import styles from "../components/styleAuth/main.styles.module.css";

function Dashboard() {
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
   
    <div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>fakebook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
      <h2>Dashboard</h2>
      <p>Welcome to the pizza dashboard! Choose your pizza ingredients here.</p>
		</div>

  )
}

export default Dashboard