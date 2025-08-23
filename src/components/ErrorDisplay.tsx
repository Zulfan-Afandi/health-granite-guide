import { AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  onRetry: () => void;
}

export const ErrorDisplay = ({ onRetry }: ErrorDisplayProps) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-card border border-destructive/20 shadow-card-health">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <CardTitle className="text-xl font-bold text-destructive">
          Gagal Mendapatkan Rekomendasi
        </CardTitle>
        <CardDescription className="text-center">
          Rekomendasi tidak dapat diambil dari server. Silakan coba lagi dalam beberapa saat.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center">
        <Button 
          onClick={onRetry}
          variant="outline"
          className="transition-smooth hover:border-health-primary hover:text-health-primary"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Coba Lagi
        </Button>
      </CardContent>
    </Card>
  );
};