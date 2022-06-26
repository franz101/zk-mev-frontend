import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import Home from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Attack from "./routes/Attack";
import Defense from "./routes/Defense";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <BrowserRouter basename="/zkMEV">
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/attack" element={<Attack />} />
        <Route path="/defense" element={<Defense />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
