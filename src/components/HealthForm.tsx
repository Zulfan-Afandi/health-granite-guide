import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Target } from "lucide-react";

export interface HealthData {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  targetWeight: number;
}

interface HealthFormProps {
  onSubmit: (data: HealthData) => void;
  isLoading: boolean;
}

export const HealthForm = ({ onSubmit, isLoading }: HealthFormProps) => {
  const [formData, setFormData] = useState<Partial<HealthData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = "Berat badan harus diisi dengan angka positif";
    }
    if (!formData.height || formData.height <= 0) {
      newErrors.height = "Tinggi badan harus diisi dengan angka positif";
    }
    if (!formData.age || formData.age <= 0 || formData.age > 120) {
      newErrors.age = "Usia harus antara 1-120 tahun";
    }
    if (!formData.gender) {
      newErrors.gender = "Jenis kelamin harus dipilih";
    }
    if (!formData.activityLevel) {
      newErrors.activityLevel = "Tingkat aktivitas harus dipilih";
    }
    if (!formData.targetWeight || formData.targetWeight <= 0) {
      newErrors.targetWeight = "Target berat badan harus diisi dengan angka positif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData as HealthData);
    }
  };

  const updateFormData = (field: keyof HealthData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card shadow-card-health border-0">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-health rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-health bg-clip-text text-transparent">
          Smart Health Recommendation
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Dapatkan rekomendasi makanan dan olahraga yang dipersonalisasi untuk mencapai target kesehatan Anda
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-health-primary" />
                Berat Badan (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="Contoh: 70"
                value={formData.weight || ""}
                onChange={(e) => updateFormData("weight", Number(e.target.value))}
                className={`transition-smooth ${errors.weight ? "border-destructive focus:border-destructive" : "focus:border-health-primary"}`}
              />
              {errors.weight && <p className="text-sm text-destructive">{errors.weight}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-health-primary" />
                Tinggi Badan (cm)
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="Contoh: 170"
                value={formData.height || ""}
                onChange={(e) => updateFormData("height", Number(e.target.value))}
                className={`transition-smooth ${errors.height ? "border-destructive focus:border-destructive" : "focus:border-health-primary"}`}
              />
              {errors.height && <p className="text-sm text-destructive">{errors.height}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">Usia (tahun)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Contoh: 25"
                value={formData.age || ""}
                onChange={(e) => updateFormData("age", Number(e.target.value))}
                className={`transition-smooth ${errors.age ? "border-destructive focus:border-destructive" : "focus:border-health-primary"}`}
              />
              {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium">Jenis Kelamin</Label>
              <Select onValueChange={(value) => updateFormData("gender", value)}>
                <SelectTrigger className={`transition-smooth ${errors.gender ? "border-destructive" : "focus:border-health-primary"}`}>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Laki-laki</SelectItem>
                  <SelectItem value="female">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activityLevel" className="text-sm font-medium">Tingkat Aktivitas</Label>
            <Select onValueChange={(value) => updateFormData("activityLevel", value)}>
              <SelectTrigger className={`transition-smooth ${errors.activityLevel ? "border-destructive" : "focus:border-health-primary"}`}>
                <SelectValue placeholder="Pilih tingkat aktivitas harian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Tidak Aktif (tidak olahraga)</SelectItem>
                <SelectItem value="light">Ringan (olahraga 1-3x/minggu)</SelectItem>
                <SelectItem value="moderate">Sedang (olahraga 3-5x/minggu)</SelectItem>
                <SelectItem value="active">Aktif (olahraga 6-7x/minggu)</SelectItem>
                <SelectItem value="very-active">Sangat Aktif (olahraga 2x/hari)</SelectItem>
              </SelectContent>
            </Select>
            {errors.activityLevel && <p className="text-sm text-destructive">{errors.activityLevel}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetWeight" className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-health-secondary" />
              Target Berat Badan (kg)
            </Label>
            <Input
              id="targetWeight"
              type="number"
              placeholder="Contoh: 65"
              value={formData.targetWeight || ""}
              onChange={(e) => updateFormData("targetWeight", Number(e.target.value))}
              className={`transition-smooth ${errors.targetWeight ? "border-destructive focus:border-destructive" : "focus:border-health-primary"}`}
            />
            {errors.targetWeight && <p className="text-sm text-destructive">{errors.targetWeight}</p>}
          </div>

          <Button 
            type="submit" 
            variant="health"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Menganalisis Data Kesehatan...
              </div>
            ) : (
              "Dapatkan Rekomendasi Kesehatan"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};