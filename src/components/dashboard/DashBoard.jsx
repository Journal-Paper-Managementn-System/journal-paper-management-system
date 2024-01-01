import React from "react";
function DashBoard({ children }) {
  return (
    <main>
      <section className="container">
       {children}
      </section>
    </main>
  );
}

export default DashBoard;
