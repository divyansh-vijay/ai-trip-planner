import { useState } from "react";
import { X, Plane, Hotel, MapPin, Calendar, DollarSign, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Flight {
  option: string;
  price: number;
  score: number;
}

interface Hotel {
  name: string;
  price: number;
  rating: number;
  score: number;
}

interface Activity {
  name: string;
  price: number;
  type: string;
  score: number;
}

interface ItineraryData {
  agents: {
    optimizer: {
      flight: Flight;
      hotel: Hotel;
      activities: Activity[];
      estimated_total: number;
    };
  };
  itinerary: string;
}

interface ItineraryResultProps {
  destination: string;
  backgroundImage: string;
  accentColor: string;
  data: ItineraryData;
  onClose: () => void;
}

export const ItineraryResult = ({
  destination,
  backgroundImage,
  accentColor,
  data,
  onClose,
}: ItineraryResultProps) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const { flight, hotel, activities, estimated_total } = data.agents.optimizer;

  // Parse itinerary into days
  const parseDays = () => {
    const lines = data.itinerary.split('\n');
    const days: { title: string; content: string[] }[] = [];
    let currentDay: { title: string; content: string[] } | null = null;

    lines.forEach((line) => {
      if (line.startsWith('### Day ')) {
        if (currentDay) days.push(currentDay);
        currentDay = { title: line.replace('### ', ''), content: [] };
      } else if (currentDay && line.trim()) {
        currentDay.content.push(line);
      }
    });

    if (currentDay) days.push(currentDay);
    return days;
  };

  const days = parseDays();

  return (
    <div className="fixed inset-0 z-50 animate-fade-in overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(12px) brightness(0.4)",
        }}
      />

      {/* Content */}
      <div className="relative h-full overflow-y-auto">
        <div className="min-h-full px-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="fixed top-6 right-6 text-primary-foreground hover:bg-primary-foreground/10 z-10"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Header */}
            <div className="text-center mb-12 animate-scale-in">
              <h1 className="text-5xl font-bold text-primary-foreground mb-4">
                Your Perfect Trip to {destination}
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Personalized itinerary crafted just for you
              </p>
            </div>

            {/* Budget Overview */}
            <Card className="bg-card/95 backdrop-blur-sm p-8 mb-8 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <DollarSign className="w-6 h-6" style={{ color: accentColor }} />
                  Total Budget
                </h2>
                <div className="text-3xl font-bold" style={{ color: accentColor }}>
                  ₹{estimated_total.toLocaleString()}
                </div>
              </div>
            </Card>

            {/* Flight, Hotel, Activities Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Flight Card */}
              <Card className="bg-card/95 backdrop-blur-sm p-6 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: `${accentColor}20` }}>
                    <Plane className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Flight</h3>
                    <p className="text-sm text-muted-foreground">{flight.option}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold">₹{flight.price.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">per person</div>
              </Card>

              {/* Hotel Card */}
              <Card className="bg-card/95 backdrop-blur-sm p-6 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: `${accentColor}20` }}>
                    <Hotel className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Hotel</h3>
                    <p className="text-sm text-muted-foreground">{hotel.name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">₹{hotel.price.toLocaleString()}</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" style={{ color: accentColor }} />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">per night</div>
              </Card>

              {/* Activities Card */}
              <Card className="bg-card/95 backdrop-blur-sm p-6 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: `${accentColor}20` }}>
                    <MapPin className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Activities</h3>
                    <p className="text-sm text-muted-foreground">{activities.length} experiences</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="truncate">{activity.name}</span>
                      <span className="font-semibold">₹{activity.price}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Day by Day Itinerary */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}>
              <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-2">
                <Calendar className="w-8 h-8" style={{ color: accentColor }} />
                Day-by-Day Itinerary
              </h2>

              {days.map((day, index) => (
                <Card key={index} className="bg-card/95 backdrop-blur-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedDay(expandedDay === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                        style={{ backgroundColor: accentColor, color: 'white' }}
                      >
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-left">{day.title}</h3>
                    </div>
                    {expandedDay === index ? (
                      <ChevronUp className="w-6 h-6" style={{ color: accentColor }} />
                    ) : (
                      <ChevronDown className="w-6 h-6" style={{ color: accentColor }} />
                    )}
                  </button>

                  {expandedDay === index && (
                    <div className="px-6 pb-6 space-y-3 animate-fade-in">
                      <Separator className="mb-4" />
                      {day.content.map((line, lineIdx) => {
                        const trimmedLine = line.trim();
                        
                        // Time period headers (Morning, Afternoon, Evening)
                        if (trimmedLine.startsWith('- *') && !trimmedLine.startsWith('- **')) {
                          return (
                            <div key={lineIdx} className="mt-4 mb-2">
                              <h4 className="font-semibold text-lg" style={{ color: accentColor }}>
                                {trimmedLine.replace(/- \*/, '').replace(/\*$/, '')}
                              </h4>
                            </div>
                          );
                        }
                        
                        // Section headers with double asterisk (like **Afternoon)
                        if (trimmedLine.startsWith('- **') && !trimmedLine.includes(':')) {
                          return (
                            <div key={lineIdx} className="mt-4 mb-2">
                              <h4 className="font-semibold text-lg" style={{ color: accentColor }}>
                                {trimmedLine.replace(/- \*\*/, '').replace(/\*\*$/, '')}
                              </h4>
                            </div>
                          );
                        }
                        
                        // Activity items with bold labels
                        if (trimmedLine.startsWith('- **') && trimmedLine.includes(':')) {
                          const boldText = trimmedLine.match(/\*\*([^*]+)\*\*/)?.[1] || '';
                          const restText = trimmedLine.replace(/- \*\*[^*]+\*\*:?\s*/, '');
                          return (
                            <div key={lineIdx} className="flex gap-3 ml-6">
                              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accentColor }} />
                              <p className="text-sm">
                                <strong>{boldText}</strong>
                                {restText && `: ${restText}`}
                              </p>
                            </div>
                          );
                        }
                        
                        // Regular text lines
                        if (trimmedLine && !trimmedLine.startsWith('---')) {
                          return (
                            <div key={lineIdx} className="ml-6">
                              <p className="text-sm text-muted-foreground">{trimmedLine}</p>
                            </div>
                          );
                        }
                        
                        return null;
                      })}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Action Button */}
            <div className="mt-12 flex justify-center gap-4 pb-12">
              <Button
                size="lg"
                className="px-8 h-14 text-lg font-semibold"
                style={{ backgroundColor: accentColor }}
              >
                Book This Trip
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 h-14 text-lg font-semibold bg-card/95"
                onClick={onClose}
              >
                Modify Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
