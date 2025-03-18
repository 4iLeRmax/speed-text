const sentences = {
  "15": [
    "The sun set behind the mountains, painting the sky with shades of orange and pink",
    "The little boy flew his colorful kite high above the beach on a windy afternoon",
    "The old man sat by the fire, telling stories of his youth to his grandchildren.",
    "She carefully planted flowers in the garden, hoping they would bloom beautifully by summer's end.",
    "The dog chased after the ball, running through the park with boundless energy and joy.",
    "The chef prepared a delicious meal, using fresh ingredients to create a flavorful, mouthwatering dish.", //???
    "The children played outside, laughing and running through the sprinkler on a hot summer day.",
    "The teacher explained the lesson clearly, ensuring every student understood the material before moving forward.",
    "They sat under the stars, talking about their dreams and sharing their hopes for tomorrow.",
    "The rain poured heavily, drenching the streets and creating puddles that reflected the city lights.",
  ],
  "30": [
    "After school, my friends and I often gather at my house to play games. We have a lot of fun and enjoy each other's company, laughing until it gets dark",
    "When it rains, I love to watch the drops slide down the window. It creates a peaceful atmosphere, making it perfect for reading or staying cozy indoors with a blanket",
    "Each night, I take a moment to write in my journal before sleeping. It helps me reflect on my day, express my thoughts, and express gratitude for the little things",
    "We plan to visit the museum next week to learn about history together. It will be an exciting experience, and I look forward to discovering new things with my friends",
    "I enjoy listening to music while I work, especially calming melodies that inspire creativity. It helps me to concentrate better and makes the tasks feel less tedious and more enjoyable.",
    "The sun dipped below the horizon, casting a warm, golden glow over the calm ocean, while gentle waves lapped against the shore, creating a peaceful atmosphere that soothed my soul.",
    "After a long day of hiking through the dense forest, we finally reached the mountaintop, where the view of the valley below filled us with a deep sense of accomplishment.",
    "As the big rain poured down, we huddled together under a large umbrella, sharing stories and laughter, feeling the warmth of friendship despite the cold, wet world surrounding us outside",
    "The city lights twinkled like stars as we walked down the street, reminiscing about old memories, feeling the cool evening breeze and appreciating the simple moments that made life beautiful.",
    "The aroma of fresh-baked bread filled the air as we sat in the cozy café, sipping coffee and discussing dreams, while the world outside continued its fast-paced rush without noticing.",
    "The children played in the park, their laughter echoing through the air as parents watched, sharing stories, while the sun began to set, casting a soft golden glow on everything.",
  ],
  "60": [],
  "120": [],
  test: ["drive a car like me"],
};

// export type TDifficulty = "15" | "30" | "60" | "120" | "test";
export const EDifficulty = {
  Short: "15",
  Medium: "30",
  Long: "60",
  VeryLong: "120",
  Test: "test",
} as const;

export type TDifficulty = (typeof EDifficulty)[keyof typeof EDifficulty];

export const getRandomText = (words: TDifficulty) => {
  const selectedArray = sentences[words];

  const randomText =
    selectedArray[Math.floor(Math.random() * (selectedArray.length - 1))];

  return randomText;
  // return "drive like me";
};
