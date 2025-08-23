import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Sun, Moon, Sandwich, Dumbbell, Clock, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface MealRecommendation {
  time: string;
  name: string;
  foods: string[];
  calories: number;
  icon: React.ReactNode;
}

export interface ExerciseRecommendation {
  name: string;
  duration: string;
  calories: number;
  description: string;
}

export interface HealthRecommendation {
  meals: MealRecommendation[];
  exercises: ExerciseRecommendation[];
  totalCalories: number;
  bmi: number;
  bmiCategory: string;
}

interface RecommendationDisplayProps {
  recommendation: HealthRecommendation;
  onSavePlan?: () => void;
}

export const RecommendationDisplay = ({ recommendation, onSavePlan }: RecommendationDisplayProps) => {
  const { toast } = useToast();

  const handleSavePlan = () => {
    if (onSavePlan) {
      onSavePlan();
    }
    // Save to localStorage
    localStorage.setItem('healthPlan', JSON.stringify(recommendation));
    toast({
      title: "Rencana Kesehatan Disimpan!",
      description: "Rencana makanan dan olahraga Anda telah tersimpan di perangkat ini.",
    });
  };

  const getBMIColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'normal': return 'text-health-primary';
      case 'underweight': return 'text-blue-600';
      case 'overweight': return 'text-orange-500';
      case 'obese': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const mealIcons: Record<string, React.ReactNode> = {
    'sarapan': <Coffee className="w-5 h-5 text-amber-500" />,
    'siang': <Sun className="w-5 h-5 text-orange-500" />,
    'malam': <Moon className="w-5 h-5 text-blue-500" />,
    'snack': <Sandwich className="w-5 h-5 text-green-500" />
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header with BMI Info */}
      <Card className="bg-gradient-health text-white border-0 shadow-health">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Rekomendasi Kesehatan Personal Anda
          </CardTitle>
          <CardDescription className="text-white/90 text-lg">
            Berdasarkan analisis AI menggunakan IBM Granite
          </CardDescription>
          <div className="flex justify-center items-center gap-8 mt-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{recommendation.bmi}</p>
              <p className="text-white/90">BMI</p>
            </div>
            <div className="text-center">
              <p className={`text-xl font-semibold ${getBMIColor(recommendation.bmiCategory)}`}>
                {recommendation.bmiCategory}
              </p>
              <p className="text-white/90">Kategori</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{recommendation.totalCalories}</p>
              <p className="text-white/90">Kalori/Hari</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Meal Recommendations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Coffee className="w-6 h-6 text-health-primary" />
          Jadwal Makan Harian
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendation.meals.map((meal, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-card-health hover:shadow-health transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {mealIcons[meal.time.toLowerCase()] || <Coffee className="w-5 h-5" />}
                  {meal.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-health-primary font-medium">
                  <Clock className="w-4 h-4" />
                  {meal.calories} kalori
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {meal.foods.map((food, foodIndex) => (
                    <li key={foodIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-health-secondary flex-shrink-0 mt-2"></span>
                      {food}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Exercise Recommendations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-health-secondary" />
          Rekomendasi Olahraga
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendation.exercises.map((exercise, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-card-health hover:shadow-health transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Dumbbell className="w-5 h-5 text-health-secondary" />
                  {exercise.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {exercise.duration}
                  </span>
                  <span className="text-health-secondary font-medium">
                    {exercise.calories} kalori terbakar
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exercise.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Save Plan Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleSavePlan}
          variant="health"
          size="lg"
          className="text-lg px-8"
        >
          <Save className="w-5 h-5 mr-2" />
          Simpan Rencana Kesehatan
        </Button>
      </div>
    </div>
  );
};