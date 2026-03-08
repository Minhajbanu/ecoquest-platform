// const natural = require("natural");
// const nlp = require("compromise");

// const tokenizer = new natural.WordTokenizer();

// exports.evaluateEssay = (text) => {
//   let score = 0;

//   if (!text || text.length < 20) {
//     return { score: 0, feedback: "Essay too short." };
//   }

//   const words = tokenizer.tokenize(text);
//   const wordCount = words.length;

//   // 1️⃣ Word Count Score (max 30)
//   if (wordCount >= 100) score += 20;
//   if (wordCount >= 200) score += 30;

//   // 2️⃣ Vocabulary Richness (unique words)
//   const uniqueWords = new Set(words.map(w => w.toLowerCase()));
//   const richness = uniqueWords.size / wordCount;

//   if (richness > 0.5) score += 15;
//   else if (richness > 0.3) score += 10;

//   // 3️⃣ Keyword relevance
//   const keywords = [
//     "environment",
//     "climate",
//     "sustainability",
//     "pollution",
//     "conservation",
//     "ecosystem",
//     "biodiversity"
//   ];

//   let keywordMatches = 0;
//   const lowerText = text.toLowerCase();

//   keywords.forEach((kw) => {
//     if (lowerText.includes(kw)) {
//       keywordMatches++;
//     }
//   });

//   score += keywordMatches * 5; // max 35 if all matched

//   // 4️⃣ Sentence count
//   const doc = nlp(text);
//   const sentences = doc.sentences().length;

//   if (sentences >= 5) score += 10;

//   // Cap score at 100
//   if (score > 100) score = 100;

//   return {
//     score,
//     feedback: `Word count: ${wordCount}. Keywords used: ${keywordMatches}.`
//   };
// };
