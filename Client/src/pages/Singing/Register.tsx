import iphone from "../../assets/iphone.jpg";
import RegisterForm from "../../features/auth/components/RegisterForm";

export default function Register() {
  return (
    <div className="w-[1420px] h-[784px] flex gap-[129px] justify-between">
      <img src={iphone} className="w-[905px] h-[784px] object-cover" />

      <RegisterForm />
    </div>
  );
}
