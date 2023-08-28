import React from "react";

import { Header } from "./Header";

interface Props {
  children: React.ReactNode;
}

export function Layout(props: Props) {
  return (
    <div>
      <Header />
    </div>
  );
}
