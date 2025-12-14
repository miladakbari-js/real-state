"use client";

import { useState } from "react";
import styles from "@template/SignupPage.module.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const signupHandler = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      return toast.error("تکرار رمز عبور صحیح نیست");
    }
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" },
    });

    const data = await res.json();
    if (res.status === 201) {
      toast.success(`خوش آمدید - ${data.message}`);
      setLoading(false);
      router.push("/signin");
    } else {
      toast.error(data.error);
    }
  };
  return (
    <div className={styles.form}>
      <h4>ثبت نام</h4>
      <form>
        <label>ایمیل</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>رمز عبور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>تکرار رمز عبور</label>
        <input
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        {loading ? (
          <ThreeDots
            color="#304ffe"
            height={45}
            ariaLabel="three-donts-loading"
            wrapperStyle={{ margin: "auto" }}
          />
        ) : (
          <button onClick={signupHandler}>ثبت نام</button>
        )}
      </form>
      <p>
        حساب کاربری دارید؟ <Link href="/signin">ورود</Link>
      </p>
      <Toaster />
    </div>
  );
}

export default SignupPage;
