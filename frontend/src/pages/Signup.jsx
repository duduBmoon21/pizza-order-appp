import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../components/styleAuth/reg.styles.module.css";

const Signup = () => {
	// State for form data, error message, password visibility
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
        username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false); // Declare showPassword state
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/register";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

    // Function to toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
                        <input
							type="text"
							placeholder="User Name"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
                        <div className={styles.password_container}>
							<input
                            	type={showPassword ? "text" : "password"} // Toggle between text and password
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={data.password}
								required
								className={styles.input}
							/>
							<span onClick={togglePasswordVisibility} className={styles.eye_icon}>
								{showPassword ? '👁️' : '👁️‍🗨️'} {/* Eye icon: change as needed */}
							</span>
						</div>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
