import { useState } from "react";
import { Calendar, DollarSign, Users, ArrowLeft, MapPin, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Destination {
  name: string;
  country: string;
  image: string;
  bestTime: string;
  avgBudget: string;
  topFor: string[];
}

interface TripDetailsProps {
  destination: Destination;
  onSubmit: (data: { budget: string; startDate: string; endDate: string; travelers: number }) => void;
  onBack: () => void;
}

const TripDetails = ({ destination, onSubmit, onBack }: TripDetailsProps) => {
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (budget && startDate && endDate) {
      onSubmit({ budget, startDate, endDate, travelers });
    }
  };

  return (
    <div className="h-full w-full flex bg-background">
      {/* Left Side - Destination Info */}
      <div className="w-1/2 relative overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2 text-white/80">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{destination.country}</span>
              </div>
              <h1 className="text-6xl font-bold mb-6">{destination.name}</h1>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Best Time to Visit</h3>
                </div>
                <p className="text-white/90">{destination.bestTime}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Average Budget</h3>
                </div>
                <p className="text-white/90">{destination.avgBudget}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Top For</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {destination.topFor.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-3">Trip Details</h2>
            <p className="text-muted-foreground">Tell us about your travel plans</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-base font-medium">
                Budget (₹)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter your budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-base font-medium">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-base font-medium">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Number of Travelers</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="h-12 w-12"
                >
                  -
                </Button>
                <div className="flex-1 flex items-center justify-center gap-3 h-12 border rounded-md">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xl font-semibold">{travelers}</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setTravelers(travelers + 1)}
                  className="h-12 w-12"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg"
          >
            Continue to Interests
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TripDetails;
