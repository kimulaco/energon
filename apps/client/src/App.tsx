import React from "react";

const checkHealth = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  const token = import.meta.env.VITE_X_ENERGON_API_TOKEN || "";

  try {
    const response = await fetch(`${baseUrl}/api/health`, {
      mode: "cors",
      headers: {
        "X-ENERGON-API-TOKEN": token,
      },
    });
    if (!response.ok) {
      if (!response.body) {
        throw null;
      }
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const App = () => {
  return (
    <div className="App">
      <button type="button" onClick={checkHealth}>
        Check server health
      </button>
    </div>
  );
};

export default App;
