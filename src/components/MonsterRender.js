import React from "react";

const Monster = ({ character, doubleEyes, characterId, animation }) => {
  // Vérifications pour s'assurer que character et ses sous-objets sont définis
  const hasCharacterDetails =
    character &&
    character.detail &&
    character.arms &&
    character.legs &&
    character.body &&
    character.mouth &&
    character.eyes &&
    (doubleEyes ? character.doubleEyes : true);
  const shouldShowNose =
    character && character.body && character.body.height > 200;

  return hasCharacterDetails ? (
    <div
      className="relative"
      style={{
        paddingLeft: `${character.arms.width - 30}px`,
        width: character.arms.width * 2 + character.body.width - 60,
        marginTop: character.arms.height / 1.8,
        marginBottom: character.legs.height,
      }}
    >
      {/* Corp */}
      <img
        src={`Default/${character.body.name}`}
        alt=""
        className="relative z-20"
        style={{
          animation: "breathing 3s ease-in-out infinite",
        }}
      />
      {/* Détail (oreille, corne, ...) *doublé */}
      <img
        src={`Default/${character.detail.name}`}
        alt=""
        style={{
          left: `${character.arms.width - character.detail.width / 2}px`,
        }}
        className={`absolute ${
          character.detail.name.includes("ear") ? "z-10" : "z-30"
        }
        ${character.detail.name.includes("horn") ? "top-[10px]" : "top-0"}
        scale-x-[-1]`}
      />
      <img
        src={`Default/${character.detail.name}`}
        alt=""
        style={{
          left: `${
            character.body.width +
            character.arms.width -
            60 -
            character.detail.width / 2
          }px`,
        }}
        className={`absolute ${
          character.detail.name.includes("ear") ? "z-10" : "z-30"
        } 
        ${character.detail.name.includes("horn") ? "top-[10px]" : "top-0"}`}
      />
      {/* Bras *doublé */}
      <img
        src={`Default/${character.arms.name}`}
        alt=""
        style={{ top: `${character.body.height / 2}px` }}
        className="absolute left-0 z-10 scale-x-[-1]"
      />
      <img
        key={characterId}
        src={`Default/${character.arms.name}`}
        alt=""
        className="wave absolute z-10"
        style={{
          left: `${character.body.width + character.arms.width - 60}px`,
          top: `${character.body.height / 2}px`,
          animation: animation ? "waveHand 2s" : "none",
          transformOrigin: "top left",
        }}
      />
      {/* Bouche */}
      <img
        src={`Default/${character.mouth.name}`}
        alt=""
        className="absolute z-30"
        style={{
          left: `${
            character.body.width / 2 +
            (character.arms.width - 30) -
            character.mouth.width / 2
          }px`,
          top: `${character.body.height * 0.6}px`,
        }}
      />
      {/* Yeux : si doubleEyes false alors 1 œil, sinon 2 */}
      {!doubleEyes ? (
        <img
          src={`Default/${character.eyes.name}`}
          alt=""
          className="absolute z-30"
          style={{
            left: `${
              character.body.width / 2 +
              (character.arms.width - 30) -
              character.eyes.width / 2
            }px`,
            top: `${character.body.height * 0.2}px`,
          }}
        />
      ) : (
        <>
          <img
            src={`Default/${character.doubleEyes.name}`}
            alt=""
            className="absolute z-30 scale-x-[-1]"
            style={{
              left: `${
                character.body.width / 2 +
                (character.arms.width - 30) -
                character.doubleEyes.width
              }px`,
              top: `${character.body.height * 0.3}px`,
            }}
          />
          <img
            src={`Default/${character.doubleEyes.name}`}
            alt=""
            className="absolute z-30"
            style={{
              left: `${
                character.body.width / 2 + (character.arms.width - 30)
              }px`,
              top: `${character.body.height * 0.3}px`,
            }}
          />
        </>
      )}
      {/* Nez si le corps a une hauteur supérieure à 200px */}
      {shouldShowNose && (
        <img
          src={`Default/${character.nose.name}`}
          alt=""
          className="absolute z-30"
          style={{
            left: `${
              character.body.width / 2 +
              (character.arms.width - 30) -
              character.nose.width / 2
            }px`,
            top: `${character.body.height * 0.45}px`,
          }}
        />
      )}
      {/* Jambes *doublé */}
      <img
        src={`Default/${character.legs.name}`}
        alt=""
        className="absolute z-0 scale-x-[-1]"
        style={{
          left: `${character.arms.width - character.legs.width / 2}px`,
          top: `${character.body.height - character.legs.width * 0.4}px`,
        }}
      />
      <img
        src={`Default/${character.legs.name}`}
        alt=""
        className="absolute z-0"
        style={{
          left: `${
            character.body.width +
            character.arms.width -
            60 -
            character.legs.width / 2
          }px`,
          top: `${character.body.height - character.legs.width * 0.4}px`,
        }}
      />
    </div>
  ) : null;
};

export default Monster;
