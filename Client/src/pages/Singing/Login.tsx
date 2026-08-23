import iphone from "../../assets/iphone.jpg";
import LoginForm from "../../features/auth/components/LoginForm";

export default function Login() {
  return (
    <div className="w-[1420px] h-[784px] flex gap-[129px] justify-between">
      <img src={iphone} className="w-[905px] h-[784px] object-cover" />

      <LoginForm />
    </div>
  );
}
