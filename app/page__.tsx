// "use client";
// import Header from "./components/header/header";
import { useTranslations } from "next-intl";
// export default function Page() {
//   const t = useTranslations("header");
//   return (
//     <>
//       <Header />
//     </>
//   );
// }
import { redirect } from "next/navigation";

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect("/kz");
}
