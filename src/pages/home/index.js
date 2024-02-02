// Home.js
import React, { useEffect, useState } from "react";
import Monster from "../../components/data-components/Monster";
import OfferData from "../../components/data-components/OfferData";
import Layout from "../../components/layout/Layout";
import BtnRefresh from "../../components/ui/BtnRefresh";
import { getData } from "../../services/api/getData";
import { useRefresh } from "../../services/context/RefreshContext";

const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refresh = useRefresh();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getData();
      setApiData(data);
    } catch (error) {
      setError(error.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);


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

  //**************************************************************! Rendu
  return (
    <Layout>
      <main className="home-page">
        {loading && <div className="loading"><p>Loading ...</p></div>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="monster-data flex">
            <Monster data={apiData && apiData[0]} />
            <OfferData data={apiData && apiData[0]} />
          </div>
        )}
        <div className="btn-refresh flex">
          <BtnRefresh />
        </div>
      </main>
    </Layout>
  );
};

export default Home;
