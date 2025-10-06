import { useEffect, useState, type SetStateAction } from "react";
import "./App.css";

const bankOne = [
  {
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [display, setDisplay] = useState("");

  // Function to play sound and update display
  const playSound = (keyTrigger: string, id: SetStateAction<string>) => {
    const audio = document.getElementById(keyTrigger) as HTMLAudioElement | null;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
    setDisplay(id);
  };

  // Detect key press
  useEffect(() => {
    const handleKeyPress = (e: { key: string; }) => {
      const key = e.key.toUpperCase();
      const sound = bankOne.find((item) => item.keyTrigger === key);
      if (sound) playSound(sound.keyTrigger, sound.id);
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display || "Play a sound"}</div>
      <div className="pads">
        {bankOne.map((sound) => (
          <div
            key={sound.keyTrigger}
            className="drum-pad"
            id={sound.id}
            onClick={() => playSound(sound.keyTrigger, sound.id)}
          >
            {sound.keyTrigger}
            <audio
              className="clip"
              id={sound.keyTrigger}
              src={sound.url}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
