import { useRef, useState } from "react";

const App = () => {
  const [botatoPlayed,setBotatoPlayed] = useState(false)
  const [countIncrement, setCountIncrement] = useState(1);
  const [increments, setIncrements] = useState<
    {
      id: number;
      y: number;
      left: number;
      top: number;
    }[]
  >([]);
  const [wowPlayed,setWowPlayed] = useState(false)
  const [count, setCount] = useState(
    parseInt(localStorage.getItem("count") ?? "0"),
  );
  const counter = useRef(0);
  // const num = useRef<HTMLSpanElement>(null);
  const potato = useRef<HTMLImageElement>(null);
  const potatoRain = useRef(
    Array.from({ length: 20 }, (_, i) => {
      return {
        id: i,
        x: (i / 20) * 2000 + Math.random() * 8,
      };
    }),
  );
  const click = (e: React.MouseEvent) => {
    const id = counter.current++;
    const randY = -(Math.random() * 80 + 40);
    setCount((prev) => prev + countIncrement);
    localStorage.setItem("count", (count + countIncrement).toString());
    setCountIncrement(Math.ceil(count / 200));
    if (count > 999 && !wowPlayed) {new Audio("./wow.mp3").play(); setWowPlayed(true)}
    if(count > 4999 && !botatoPlayed) {new Audio("./ima_potato.mp3").play(); setBotatoPlayed(true)}
    setIncrements((prev) => {
      return [
        ...prev,
        {
          id,
          y: randY,
          left: e.clientX,
          top: e.clientY,
        },
      ];
    });
    setTimeout(() => {
      setIncrements((prev) => prev.filter((item) => item.id !== id));
    }, 800);

    if (!potato.current) return;
    potato.current.classList.add("bouncy");
    potato.current.addEventListener(
      "animationend",
      () => {
        potato.current?.classList.remove("bouncy");
      },
      { once: true },
    );
  };

  return (
    <div className="w-screen overflow-y-hidden overflow-x-hidden h-screen bg-orange-300 flex justify-center items-center">
      <img
        className="main w-74 z-50 cursor-pointer"
        onClick={(e) => click(e)}
        src={
          count > 9999
            ? "/level3.png"
            : count > 1995
              ? "sweet.png"
              : "potato.svg"
        }
        ref={potato}
        draggable={false}
      />
      {increments.map(({ id, y, left, top }) => (
        <span
          key={id}
          className="float z-100 absolute pointer-events-none"
          style={
            {
              "--x": "0px",
              "--y": `${y}px`,
              left: `${left}px`,
              top: `${top}px`,
            } as React.CSSProperties
          }
        >
          +{countIncrement}
        </span>
      ))}
      {count > 500
        ? potatoRain.current.map(({ id, x }) => (
            <img
              key={id}
              style={
                {
                  left: `${x}px`,
                } as React.CSSProperties
              }
              className="batatis w-[40px] m-10 z-5 absolute"
              src="/rain.svg"
            />
          ))
        : null}
      {count > 1495 ? (
        <iframe
          width="400"
          height="400"
          className="absolute z-1 bottom-1 right-1 vid"
          src="https://www.youtube.com/embed/CYhYSoJrOLg?autoplay=1"
          title="How to Make French Fries At Home ! Crispy Delicious ,  Incredibly Easy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : null}
      <span className="count text-gray-100 text-5xl z-10 absolute bottom-1 overflow-hidden">
        {count}
      </span>
    </div>
  );
};

export default App;
