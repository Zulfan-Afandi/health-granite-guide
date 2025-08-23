import { useState } from "react";
import { HealthForm, HealthData } from "@/components/HealthForm";
import { RecommendationDisplay, HealthRecommendation } from "@/components/RecommendationDisplay";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { getHealthRecommendation } from "@/services/graniteApi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<HealthRecommendation | null>(null);
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: HealthData) => {
    setIsLoading(true);
    setError(false);
    
    try {
      const result = await getHealthRecommendation(data);
      setRecommendation(result);
      toast({
        title: "Rekomendasi Berhasil Dibuat!",
        description: "Rekomendasi kesehatan personal Anda telah siap.",
      });
    } catch (err) {
      console.error("Error getting health recommendation:", err);
      setError(true);
      toast({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat mengambil rekomendasi. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(false);
    setRecommendation(null);
  };

  const handleSavePlan = () => {
    if (recommendation) {
      // Save plan logic is handled in RecommendationDisplay component
      console.log("Saving health plan...");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-health-soft">
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <ErrorDisplay onRetry={handleRetry} />
          </div>
        ) : !recommendation ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <HealthForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <button
                onClick={() => setRecommendation(null)}
                className="text-sm text-muted-foreground hover:text-health-primary transition-colors underline"
              >
                ← Kembali ke Form
              </button>
            </div>
            <RecommendationDisplay 
              recommendation={recommendation} 
              onSavePlan={handleSavePlan}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
