import iphone from "../../assets/iphone.jpg";
import RegisterSkeleton from "../../components/Skeletons/RegisterSkeleton";
import { useEffect, useState } from "react";
import RegisterForm from "../../features/auth/components/RegisterForm";

export default function Register() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <RegisterSkeleton />
  ) : (
    <div className="w-[1420px] h-[784px] flex gap-[129px] justify-between">
      <img src={iphone} className="w-[905px] h-[784px] object-cover" />

      <RegisterForm />
    </div>
  );
}
