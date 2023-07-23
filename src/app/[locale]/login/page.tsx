'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Input, Spin, notification } from 'antd';
import { useRouter } from "next/navigation";
import { UserOutlined } from '@ant-design/icons';
import styles from "@/app/[locale]/login/login.module.css";
import { useTranslations } from 'next-intl';

const Login = () => {
  console.log("v1.0.0");
  const t = useTranslations('loginPage');

  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", user);
      console.log("Login success", response.data);
      notification.success({ message: "Login success", duration: 1 });
      router.push("/");
    } catch (error: any) {
      console.log("Login failed", error.message);
      notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={styles?.root}>
      <UserOutlined style={{ fontSize: "2rem" }} />
      <div>
        <Input
          id="username"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })} />
      </div>
      <div>
        <Input
          placeholder="Password"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>

      <div>
        <Button disabled={buttonDisabled || loading} onClick={onLogin} type="primary" className='bg-[#1677ff]'>
          {t("login_btn_label")}
          {loading && <i className='pl-4'><Spin size="small" /></i>}
        </Button>
      </div>
    </div>
  )
}

export default Login