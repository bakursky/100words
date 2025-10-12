import { BottomNav } from "../components/BottomNav";
import Streaks from "../components/Streaks";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Streaks />
      {children}
      <BottomNav />
    </>
  );
}