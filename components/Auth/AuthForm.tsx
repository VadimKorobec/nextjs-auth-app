import { useState, useRef } from "react";
import styles from "./AuthForm.module.css";
import { User } from "@/types/user";

const createUser = async (user: User) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSwitchAuthMode = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return;
    }

    const user: User = {
      email,
      password,
    };

    if (!isLogin) {
      //
    } else {
      try {
        const result = await createUser(user);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }

    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={styles.toggle}
            onClick={handleSwitchAuthMode}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
