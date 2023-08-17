import { useEffect, useState } from "react";
import "./App.css";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    //cleanup:
    //Cuando el componente se desmonsta
    //Cuando cambian las despendencias, antes de ejecutar
    // el efecto nuevo
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  useEffect(() => {
    document.body.classList.toggle("no-cursor", enabled);

    return () => {
      document.body.classList.remove("no-cursor"); // cleanup method
    };
  }),
    [enabled];

    // [] -> Se ejecuta una vez cuando se monta el componente
    // [DEPENDENCIA] -> se ejecuta cada vez que cambia la depend y cuando se monta el compon
    // undefined -> se ejecuta cada vez que se renderiza el componente 
    // Limpiar las suscripciones con cleanup method


  return (
    <>
      {enabled && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "1px solid #fff",
            borderRadius: "50%",
            opacity: 0.8,
            pointerEvents: "none",
            left: -25,
            top: -25,
            width: 50,
            height: 50,
            transform: `translate(${position.x}px,${position.y}px)`,
          }}
        />
      )}
      <button
        onClick={() => {
          setEnabled(!enabled);
        }}
      >
        {enabled ? "Desactivar " : "Activar "}seguir puntero
      </button>
    </>
  );
};

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  );
}

export default App;
