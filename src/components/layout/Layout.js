import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div style={{ minHeight: "700px" }}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
