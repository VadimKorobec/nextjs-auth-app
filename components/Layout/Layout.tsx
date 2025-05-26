import MainNavigation from "./MainNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main>
        <MainNavigation />
        {children}
      </main>
    </>
  );
};

export default Layout;
