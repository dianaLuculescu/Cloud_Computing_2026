import { redirect } from "next/navigation";

export default function Home() {
  // Această funcție va trimite utilizatorul direct la /login 
  // înainte ca pagina de home să fie randată.
  redirect("/login");
}