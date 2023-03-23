import { Inter } from "next/font/google";
import { useAuth } from "../contexts/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useAuth();
  const email = "pedro@email.com";
  const senha = "pedro";

  return (
    <div>
      <div>Home</div>
    </div>
  );
}
