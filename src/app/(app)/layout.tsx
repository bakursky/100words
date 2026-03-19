import { BottomNav } from "../components/BottomNav";
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pb-[60px] md:pb-0 md:pl-64">
        {children}
      </div>
      <BottomNav />
    </>
  );
}