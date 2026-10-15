
const { useState, useEffect, useRef } = React;

enum Action {
  EAT = "EAT",
  PLAY = "PLAY",
  SLEEP = "SLEEP"
}

enum PetMood {
  HAPPY,
  EXCITED,
  CONTENT,
  SAD,
  TIRED,
  SICK,
  HUNGRY
}

const moodEmojis: Record<PetMood, string> = {
  [PetMood.HAPPY]: "😊",
  [PetMood.EXCITED]: "🤩",
  [PetMood.CONTENT]: "😌",
  [PetMood.SAD]: "😢",
  [PetMood.TIRED]: "😴",
  [PetMood.SICK]: "🤒",
  [PetMood.HUNGRY]: "🥺"
};

export function PetGame() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [petName, setPetName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const [hunger, setHunger] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);

  useEffect(() => {
    if (!gameStarted) return;

    const timer = window.setTimeout(() => {
      setHunger(100);
      setEnergy(100);
      setHappiness(0);
    }, 1_200_000);

    return () => window.clearTimeout(timer);
  }, [gameStarted]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = inputRef.current?.value.trim() ?? "";

    if (name.length > 0) {
      setPetName(name);
      setGameStarted(true);
    }
  }

  function handleAction(action: Action) {
    switch (action) {
      case Action.EAT:
        setHunger((value) =>
          value > 0 ? Math.max(0, value - 10) : value
        );
        setEnergy((value) =>
          value < 100 ? Math.min(100, value + 10) : value
        );
        break;

      case Action.PLAY:
        setEnergy((value) =>
          value > 0 ? Math.max(0, value - 10) : value
        );
        setHappiness((value) =>
          value < 100 ? Math.min(100, value + 10) : value
        );
        break;

      case Action.SLEEP:
        setHunger((value) =>
          value < 100 ? Math.min(100, value + 10) : value
        );
        setEnergy((value) =>
          value < 100 ? Math.min(100, value + 10) : value
        );
        break;
    }
  }

  let mood = PetMood.CONTENT;

  if (hunger > 70) {
    mood = PetMood.HUNGRY;
  } else if (energy < 30) {
    mood = PetMood.TIRED;
  } else if (happiness < 30) {
    mood = PetMood.SAD;
  } else if (happiness > 80 && energy > 70) {
    mood = PetMood.EXCITED;
  } else if (happiness > 60) {
    mood = PetMood.HAPPY;
  }

  return (
    <main className="app">
      {!gameStarted ? (
        <form className="panel name-form" onSubmit={handleSubmit}>
          <h1>Digital Pet Game</h1>
          <p>Name your pet to start playing!</p>

          <label htmlFor="pet-name">Pet name</label>
          <input
            id="pet-name"
            type="text"
            ref={inputRef}
            required
          />

          <button type="submit">Start Game</button>
        </form>
      ) : (
        <section className="panel game-view">
          <h1 className="pet-name">{petName}</h1>

          <div className="pet-mood">
            <span>{moodEmojis[mood]}</span>
            <span>{PetMood[mood]}</span>
          </div>

          <div className="stats">
            <div className="stat">
              <span>Hunger</span>
              <span className="stat-value">{hunger}</span>
            </div>

            <div className="stat">
              <span>Happiness</span>
              <span className="stat-value">{happiness}</span>
            </div>

            <div className="stat">
              <span>Energy</span>
              <span className="stat-value">{energy}</span>
            </div>
          </div>

          <div className="actions">
            <button
              id="eat-action"
              type="button"
              onClick={() => handleAction(Action.EAT)}
            >
              Eat
            </button>

            <button
              id="play-action"
              type="button"
              onClick={() => handleAction(Action.PLAY)}
            >
              Play
            </button>

            <button
              id="sleep-action"
              type="button"
              onClick={() => handleAction(Action.SLEEP)}
            >
              Sleep
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
