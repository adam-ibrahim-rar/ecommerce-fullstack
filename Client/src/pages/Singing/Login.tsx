import iphone from "../../assets/iphone.jpg";
import { useEffect, useState } from "react";
import LoginSkeleton from "../../components/Skeletons/LoginSkeleton";
import LoginForm from "../../features/auth/components/LoginForm";

export default function Login() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <LoginSkeleton />
  ) : (
     <div className="w-[1420px] h-[784px] flex gap-[129px] justify-between">
      <img
        src={iphone}
        className="w-[905px] h-[784px] object-cover"
      />

      <LoginForm />
    </div>
  );
}