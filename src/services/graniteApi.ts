import { HealthData } from "@/components/HealthForm";
import { HealthRecommendation } from "@/components/RecommendationDisplay";

// Mock data for demonstration - replace with actual Granite API integration
const generateMockRecommendation = (data: HealthData): HealthRecommendation => {
  const bmi = data.weight / Math.pow(data.height / 100, 2);
  let bmiCategory = "";
  
  if (bmi < 18.5) bmiCategory = "Underweight";
  else if (bmi < 25) bmiCategory = "Normal";
  else if (bmi < 30) bmiCategory = "Overweight";
  else bmiCategory = "Obese";

  // Calculate base calorie needs
  let bmr = 0;
  if (data.gender === 'male') {
    bmr = 88.362 + (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age);
  } else {
    bmr = 447.593 + (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age);
  }

  const activityMultiplier = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  };

  const totalCalories = Math.round(bmr * activityMultiplier[data.activityLevel]);

  // Generate personalized meals and exercises based on goals
  const isWeightLoss = data.targetWeight < data.weight;
  const calorieAdjustment = isWeightLoss ? -500 : (data.targetWeight > data.weight ? 300 : 0);
  const adjustedCalories = totalCalories + calorieAdjustment;

  return {
    meals: [
      {
        time: "sarapan",
        name: "Sarapan Sehat",
        foods: [
          "2 slice roti gandum + 1 sdm selai kacang",
          "1 pisang sedang",
          "1 gelas susu rendah lemak",
          "1 butir telur rebus"
        ],
        calories: Math.round(adjustedCalories * 0.25),
        icon: null
      },
      {
        time: "siang",
        name: "Makan Siang",
        foods: [
          isWeightLoss ? "100g dada ayam panggang" : "150g dada ayam panggang",
          "1 mangkuk nasi merah",
          "Sayur bayam tumis",
          "1 buah jeruk",
          "Air putih 2 gelas"
        ],
        calories: Math.round(adjustedCalories * 0.4),
        icon: null
      },
      {
        time: "snack",
        name: "Camilan Sehat",
        foods: [
          "1 buah apel + 10 kacang almond",
          "Yogurt plain 150ml",
          "Green tea 1 cangkir"
        ],
        calories: Math.round(adjustedCalories * 0.1),
        icon: null
      },
      {
        time: "malam",
        name: "Makan Malam",
        foods: [
          isWeightLoss ? "100g ikan salmon" : "120g ikan salmon",
          "Sayur brokoli kukus",
          "1/2 mangkuk quinoa",
          "Salad hijau dengan olive oil"
        ],
        calories: Math.round(adjustedCalories * 0.25),
        icon: null
      }
    ],
    exercises: [
      {
        name: data.activityLevel === 'sedentary' ? "Jalan Kaki Ringan" : "Cardio Interval",
        duration: data.activityLevel === 'sedentary' ? "20-30 menit" : "30-45 menit",
        calories: data.activityLevel === 'sedentary' ? 150 : 300,
        description: data.activityLevel === 'sedentary' 
          ? "Mulai dengan jalan kaki santai di sekitar rumah atau taman terdekat. Lakukan secara konsisten setiap hari."
          : "Kombinasi lari ringan 2 menit dan jalan cepat 1 menit. Ulangi siklus ini selama 30-45 menit."
      },
      {
        name: isWeightLoss ? "Strength Training" : "Resistance Training",
        duration: "20-30 menit",
        calories: 200,
        description: isWeightLoss 
          ? "Latihan beban ringan untuk mempertahankan massa otot selama penurunan berat badan. Focus pada compound movements."
          : "Latihan beban untuk membangun massa otot. Tingkatkan beban secara bertahap setiap minggu."
      }
    ],
    totalCalories: adjustedCalories,
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory
  };
};

export const getHealthRecommendation = async (data: HealthData): Promise<HealthRecommendation> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // For now, return mock data
  // In production, replace this with actual Granite API call:
  /*
  const response = await fetch('https://granite-api-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GRANITE_API_KEY}`
    },
    body: JSON.stringify({
      prompt: `Generate health recommendations for: ${JSON.stringify(data)}`,
      model: 'granite-3.0-8b-instruct'
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to get recommendations from Granite API');
  }
  
  const result = await response.json();
  return parseGraniteResponse(result);
  */

  return generateMockRecommendation(data);
};