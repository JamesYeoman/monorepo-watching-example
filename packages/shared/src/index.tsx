import { ReactChild } from "react";

const foo = "Hello";

const Bar = ({ children }: { children: ReactChild }) => <h1>{children}</h1>;
export { foo, Bar };
