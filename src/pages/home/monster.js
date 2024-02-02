import React, { useEffect, useState } from "react";
import MonsterRender from "../../components/MonsterRender.js";

const Monster = () => {
  const [spritesData, setSpritesData] = useState([]);
  const [character, setCharacter] = useState(null);
  const [doubleEyes, setDoubleEyes] = useState(null);
  const [characterId, setCharacterId] = useState(0);
  // Modifier pour faire référence au données API
  const [xp, setXp] = useState("Expérimenté");
  // Actuellement si userXp = Xp de l'offre, à voir
  const [animation, setAnimation] = useState(false);

  //**************************************************************! CHARGEMENT DES DONNÉES DES SPRITES
  // Charge les données de spritesheet et stocke dans spritesData. Conversion du xml
  useEffect(() => {
    fetch("/spritesheet_default.xml")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        const json = Array.from(xmlDoc.getElementsByTagName("SubTexture")).map(
          (subTexture) => ({
            name: subTexture.getAttribute("name"),
            x: parseInt(subTexture.getAttribute("x"), 10),
            y: parseInt(subTexture.getAttribute("y"), 10),
            width: parseInt(subTexture.getAttribute("width"), 10),
            height: parseInt(subTexture.getAttribute("height"), 10),
          })
        );
        setSpritesData(json);
      });
  }, []);

  //**************************************************************! FONCTIONS UTILITAIRES
  // Organise les sprites en catégories basées sur leurs noms.
  const categorizeSprites = (sprites, xp) => {
    const categories = {
      arms: [],
      body: [],
      eyes: [],
      doubleEyes: [],
      legs: [],
      mouth: [],
      detail: [],
      nose: [],
    };

    sprites.forEach((sprite) => {
      const { name, width } = sprite;
      if (name.includes("body")) {
        switch (xp) {
          case "Débutant":
            if (name.includes("blue")) {
              categories.body.push(sprite);
            }
            break;
          case "Expérimenté":
            if (name.includes("yellow")) {
              categories.body.push(sprite);
            }
            break;
          case "Sénior":
            if (name.includes("green")) {
              categories.body.push(sprite);
            }
            break;
          default:
            categories.body.push(sprite);
            break;
        }
      } else if (name.includes("arm")) {
        categories.arms.push(sprite);
      } else if (name.includes("eye_") && width > 50) {
        categories.eyes.push(sprite);
      } else if (name.includes("eye_") && width > 30 && width <= 50) {
        categories.doubleEyes.push(sprite);
      } else if (name.includes("leg")) {
        categories.legs.push(sprite);
      } else if (name.includes("mouth")) {
        categories.mouth.push(sprite);
      } else if (name.includes("nose")) {
        categories.nose.push(sprite);
      } else if (
        name.includes("horn") ||
        name.includes("antenna") ||
        name.includes("ear")
      ) {
        categories.detail.push(sprite);
      }
    });
    return categories;
  };

  // Fonction pour sélectionner aléatoirement un sprite d'une catégorie donnée.
  // Détermine aussi aléatoirement si le personnage aura des yeux doubles ou simple.
  const selectRandomSprite = (category) => {
    const randomIndex = Math.floor(Math.random() * category.length);
    const randomBoolean = Math.random() < 0.5;
    setDoubleEyes(randomBoolean);
    return category[randomIndex];
  };

  // Fonction pour construire un personnage en sélectionnant aléatoirement des éléments de chaque catégorie.
  const generateRandomCharacter = (spriteCategories) => ({
    body: selectRandomSprite(spriteCategories.body),
    arms: selectRandomSprite(spriteCategories.arms),
    legs: selectRandomSprite(spriteCategories.legs),
    eyes: selectRandomSprite(spriteCategories.eyes),
    mouth: selectRandomSprite(spriteCategories.mouth),
    detail: selectRandomSprite(spriteCategories.detail),
    doubleEyes: selectRandomSprite(spriteCategories.doubleEyes),
    nose: selectRandomSprite(spriteCategories.nose),
  });

  //**************************************************************! GÉNÉRATION DU PERSONNAGE
  // Génère un personnage aléatoire une fois les données de sprites disponibles.
  // Appelle categorizeSprites pour organiser les sprites, puis génère un personnage.
  useEffect(() => {
    if (spritesData && spritesData.length > 0) {
      const categories = categorizeSprites(spritesData, xp);
      const newCharacter = generateRandomCharacter(categories);
      setCharacter(newCharacter);
      setCharacterId((prevId) => prevId + 1);
    }
  }, [spritesData, xp]);

  // Fonction pour générer un personnage aléatoire
  const createNewCharacter = () => {
    if (spritesData && spritesData.length > 0) {
      const xpLevels = ["Débutant", "Expérimenté", "Sénior"];
      const randomXp = xpLevels[Math.floor(Math.random() * xpLevels.length)];
      setXp(randomXp);
      const categories = categorizeSprites(spritesData, randomXp);
      const newCharacter = generateRandomCharacter(categories);
      setCharacter(newCharacter);
      setCharacterId((prevId) => prevId + 1);
    }
  };

  return (
    <>
      <div className="flex">
        {spritesData && character && doubleEyes !== null && (
          <MonsterRender
            character={character}
            doubleEyes={doubleEyes}
            characterId={characterId}
            animation={animation}
          />
        )}
        <div>
          <button
            onClick={createNewCharacter}
            className="rounded-lg bg-violet-700 p-3 text-white"
          >
            Générer un nouveau monstre
          </button>
        </div>
      </div>
    </>
  );
};

export default Monster;
