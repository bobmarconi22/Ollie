import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoSitter = async (e) => {
    e.preventDefault();
    setEmail("demo.sitter@aa.io");
    setPassword("password");
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo.sitter@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };


  const handleDemo = async (e) => {
    e.preventDefault();
    setEmail("demo@aa.io");
    setPassword("password");
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1 className="form-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <input
            type="text"
            value={email}
            id={'email'}
            className="form__input"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label for={'email'} className="form__label">Email</label>
        </div>
        {errors.email && <p>{errors.email}</p>}
        <div className="form">
          <input
            type="password"
            value={password}
            id={'password'}
            className="form__input"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <label for={'password'} className="form__label">Password</label>
        </div>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
        <button onClick={handleDemo}>Demo User</button>
        <button onClick={handleDemoSitter}>Demo Sitter</button>
      </form>
    </>
  );
}

export default LoginFormModal;
