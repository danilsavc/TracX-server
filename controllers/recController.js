import models from "../models/models.js";
import ApiError from "../error/apiError.js";
import * as tf from "@tensorflow/tfjs";
import fs from "fs";
const Roles = models.Roles || "";
const User = models.User || "";
const UserRole = models.UserRole || "";

// const usersData = [
//   { id: 1, prefer_categories: ["security", "cloud"] },
//   { id: 2, prefer_categories: ["web", "mobile"] },
//   // Додайте більше користувачів за необхідності
// ];

// // Приклади даних ІТ-подій та їхніх категорій
// const eventsData = [
//   { id: 101, category_name: "security" },
//   { id: 102, category_name: "web" },
//   // Додайте більше подій за необхідності
// ];

// // Функція для обчислення схожості між користувачами
// function computeUserSimilarity(user1, user2) {
//   const user1Categories = new Set(user1.prefer_categories);
//   const user2Categories = new Set(user2.prefer_categories);
//   const intersection = new Set([...user1Categories].filter((x) => user2Categories.has(x)));
//   const union = new Set([...user1Categories, ...user2Categories]);
//   return intersection.size / union.size;
// }

// // Функція для тренування моделі машинного навчання
// async function trainModel(usersVectors, eventsData) {
//   const usersTensor = tf.tensor2d(usersVectors);
//   const model = tf.sequential();
//   model.add(tf.layers.dense({ units: 10, inputShape: [eventsData.length], activation: "relu" }));
//   model.add(tf.layers.dense({ units: eventsData.length, activation: "softmax" }));
//   model.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });
//   const trainingData = usersTensor;
//   const trainingLabels = usersTensor;
//   await model.fit(trainingData, trainingLabels, { epochs: 10 });
//   return model;
// }

// function createUserVector(prefer_categories) {
//   const vector = new Array(eventsData.length).fill(0);
//   prefer_categories.forEach((category) => {
//     const index = eventsData.findIndex((event) => event.category_name === category);
//     if (index !== -1) {
//       vector[index] = 1;
//     }
//   });
//   return vector;
// }

// async function collaborativeFiltering(userId, usersData, eventsData) {
//   const usersVectors = usersData.map((user) => createUserVector(user.prefer_categories));
//   const model = await trainModel(usersVectors);
//   const userIndex = usersData.findIndex((user) => user.id === userId);
//   if (userIndex === -1) {
//     console.error("User not found");
//     return [];
//   }
//   const userVector = createUserVector(usersData[userIndex].prefer_categories);
//   const userInput = tf.tensor2d([userVector]);
//   const recommendations = await model.predict(userInput).data();
//   const recommendedEvents = [];
//   recommendations.forEach((score, index) => {
//     if (score > 0.5 && userVector[index] !== 1) {
//       // Поріг для рекомендації та перевірка, чи категорія вже є у вподобаннях користувача
//       recommendedEvents.push(eventsData[index].id);
//     }
//   });
//   return recommendedEvents;
// }

// // Функція для колаборативної фільтрації з машинним навчанням
// // async function collaborativeFiltering(userId, usersData, eventsData) {
// //   const usersVectors = usersData.map((user) => createUserVector(user.prefer_categories));
// //   const model = await trainModel(usersVectors, eventsData);
// //   const userIndex = usersData.findIndex((user) => user.id === userId);
// //   if (userIndex === -1) {
// //     console.error("User not found");
// //     return [];
// //   }
// //   const userVector = createUserVector(usersData[userIndex].prefer_categories);
// //   const userInput = tf.tensor2d([userVector]);
// //   const recommendations = await model.predict(userInput).data();
// //   const recommendedEvents = [];
// //   recommendations.forEach((score, index) => {
// //     if (score > 0.5) {
// //       // Порогове значення для рекомендації
// //       recommendedEvents.push(eventsData[index].id);
// //     }
// //   });
// //   return recommendedEvents;
// // }

// // Основна функція для отримання рекомендацій для користувача
// async function getRecommendationsForUser(userId, usersData, eventsData) {
//   const recommendations = await collaborativeFiltering(userId, usersData, eventsData);
//   console.log("Recommended events for user", userId, ":", recommendations);
// }

//Приклади даних користувачів та їхніх вподобаних категорій
// const usersData = [
//   { id: 1, prefer_categories: ["security", "cloud"] },
//   { id: 2, prefer_categories: ["web", "mobile"] },
//   { id: 3, prefer_categories: ["security", "networking"] },
//   { id: 4, prefer_categories: ["web", "security"] },
//   { id: 5, prefer_categories: ["cloud", "mobile"] },
//   // Додайте більше користувачів за необхідності
// ];

// // Приклади даних ІТ-подій та їхніх категорій
// const eventsData = [
//   { id: 101, category_name: "security" },
//   { id: 102, category_name: "web" },
//   { id: 103, category_name: "cloud" },
//   { id: 104, category_name: "mobile" },
//   { id: 105, category_name: "networking" },
//   // Додайте більше подій за необхідності
// ];

// // Функція для створення векторного представлення користувача на основі їхніх вподобаних категорій
// function createUserVector(prefer_categories, eventsData) {
//   const vector = new Array(eventsData.length).fill(0);
//   prefer_categories.forEach((category) => {
//     const index = eventsData.findIndex((event) => event.category_name === category);
//     if (index !== -1) {
//       vector[index] = 1;
//     }
//   });
//   return vector;
// }

// // Функція для тренування моделі машинного навчання
// async function trainModel(usersVectors, eventsData) {
//   const usersTensor = tf.tensor2d(usersVectors);
//   const model = tf.sequential();
//   model.add(tf.layers.dense({ units: 10, inputShape: [eventsData.length], activation: "relu" }));
//   model.add(tf.layers.dense({ units: eventsData.length, activation: "softmax" }));
//   model.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });
//   const trainingData = usersTensor;
//   const trainingLabels = usersTensor;
//   await model.fit(trainingData, trainingLabels, { epochs: 10 });
//   return model;
// }

// // Функція для колаборативної фільтрації з машинним навчанням
// async function collaborativeFiltering(userId, usersData, eventsData) {
//   const userIndex = usersData.findIndex((user) => user.id === userId);
//   if (userIndex === -1) {
//     console.error("User not found");
//     return [];
//   }

//   const usersVectors = usersData.map((user) =>
//     createUserVector(user.prefer_categories, eventsData)
//   );
//   const model = await trainModel(usersVectors, eventsData);

//   const userVector = createUserVector(usersData[userIndex].prefer_categories, eventsData);
//   const userInput = tf.tensor2d([userVector]);
//   const recommendations = await model.predict(userInput).data();

//   const recommendedEvents = [];
//   recommendations.forEach((score, index) => {
//     console.log(score);
//     if (score > 0.5) {
//       recommendedEvents.push(eventsData[index].id);
//     }
//   });
//   return recommendedEvents;
// }

// // Основна функція для отримання рекомендацій для користувача
// async function getRecommendationsForUser(userId, usersData) {
//   const recommendations = await collaborativeFiltering(userId, usersData, eventsData);
//   console.log("Recommended events for user", userId, ":", recommendations);
// }

// Приклади даних користувачів та їхніх вподобаних подій (замість категорій)
const usersData = [
  { id: 1, prefer_events: [101, 103] },
  { id: 3, prefer_events: [102, 104] },
  { id: 4, prefer_events: [102, 101] },
  { id: 5, prefer_events: [104, 105] },
  { id: 6, prefer_events: [101, 108] },
  { id: 7, prefer_events: [102, 101] },
  { id: 8, prefer_events: [103, 108] },
  { id: 9, prefer_events: [103, 102] },
  { id: 10, prefer_events: [107, 108] },
  { id: 11, prefer_events: [102, 106] },
  { id: 12, prefer_events: [101, 108] },
  // Додайте більше користувачів за необхідності
];

// Приклади даних ІТ-подій та їхніх категорій
const eventsData = [
  { id: 101, category_name: "security" },
  { id: 102, category_name: "web" },
  { id: 103, category_name: "cloud" },
  { id: 104, category_name: "mobile" },
  { id: 105, category_name: "networking" },
  { id: 106, category_name: "zalupa" },
  { id: 107, category_name: "govno" },
  { id: 108, category_name: "penis" },
  // Додайе більше подій за необхідності
];

function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((acc, cur, index) => acc + cur * vec2[index], 0);
  const magnitudeVec1 = Math.sqrt(vec1.reduce((acc, cur) => acc + Math.pow(cur, 2), 0));
  const magnitudeVec2 = Math.sqrt(vec2.reduce((acc, cur) => acc + Math.pow(cur, 2), 0));
  return dotProduct / (magnitudeVec1 * magnitudeVec2);
}

// Функция для создания векторного представления пользователя на основе их предпочтений событий
function createUserVector(prefer_events, eventsData) {
  const vector = new Array(eventsData.length).fill(0);
  prefer_events.forEach((eventId) => {
    const index = eventsData.findIndex((event) => event.id === eventId);
    if (index !== -1) {
      vector[index] = 1;
    }
  });
  return vector;
}

// Функция для сравнения пользователей по их предпочтениям
function compareUsersByPreference(user1, user2, eventsData) {
  const user1Vector = createUserVector(user1.prefer_events, eventsData);
  const user2Vector = createUserVector(user2.prefer_events, eventsData);
  return cosineSimilarity(user1Vector, user2Vector);
}

// Функция для коллаборативной фильтрации с машинным обучением и функцией схожести
async function collaborativeFiltering(userId, usersData, eventsData) {
  const userIndex = usersData.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    console.error("User not found");
    return [];
  }

  // Создание векторов предпочтений событий для всех пользователей
  const usersVectors = usersData.map((user) => createUserVector(user.prefer_events, eventsData));

  // Оценка схожести между пользователем и всеми другими пользователями
  const userSimilarities = usersVectors.map((userVector, index) => ({
    userId: usersData[index].id,
    similarity:
      userId !== usersData[index].id
        ? compareUsersByPreference(usersData[userIndex], usersData[index], eventsData)
        : -1,
  }));

  // Сортировка пользователей по схожести
  const sortedSimilarities = userSimilarities.sort((a, b) => b.similarity - a.similarity);

  // Выбор наиболее похожего пользователя
  const mostSimilarUser = sortedSimilarities[0];
  // Рекомендация событий для наиболее похожего пользователя
  const recommendationsFromSimilarity = mostSimilarUser
    ? usersData.find((user) => user.id === mostSimilarUser.userId).prefer_events
    : [];
  console.log(recommendationsFromSimilarity);
  // Обучение модели машинного обучения
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, inputShape: [eventsData.length], activation: "relu" }));
  model.add(tf.layers.dense({ units: eventsData.length, activation: "softmax" }));
  model.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });

  const usersTensor = tf.tensor2d(usersVectors);
  const trainingData = usersTensor;
  const trainingLabels = usersTensor;
  await model.fit(trainingData, trainingLabels, { epochs: 100 });

  // Прогнозирование с использованием обученной модели
  const userVector = createUserVector(usersData[userIndex].prefer_events, eventsData);
  const userInput = tf.tensor2d([userVector]);
  const predictions = await model.predict(userInput).data();

  // Рекомендация событий на основе предсказаний модели
  const recommendationsFromML = [];
  // console.log(predictions);
  predictions.forEach((score, index) => {
    if (score > 0.19) {
      recommendationsFromML.push(eventsData[index].id);
    }
  });
  // Объединение рекомендаций
  const combinedRecommendations = [
    ...new Set([...recommendationsFromSimilarity, ...recommendationsFromML]),
  ];

  console.log("Recommended events for user", userId, ":", combinedRecommendations);
  return combinedRecommendations;
}

// Основная функция для получения рекомендаций для пользователя
async function getRecommendationsForUser(userId, usersData, eventsData) {
  const recommendations = await collaborativeFiltering(userId, usersData, eventsData);
  return recommendations;
}

class RecController {
  recommendEventsForUser(req, res, next) {
    try {
      const { userName } = req.body;
      const recomendation = getRecommendationsForUser(3, usersData, eventsData);
      res.json(recomendation);
    } catch (error) {
      next(ApiError.badRequest(error));
    }
  }
}

export default new RecController();
