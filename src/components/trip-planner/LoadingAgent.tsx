import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Plane, Hotel, Calculator, FileText, CheckCircle2, Sparkles } from "lucide-react";

interface TripData {
  destination: {
    name: string;
    country: string;
  } | null;
  budget: string;
  startDate: string;
  endDate: string;
  travelers: number;
  interests: string[];
}

interface LoadingAgentProps {
  tripData: TripData;
}

interface AgentMessage {
  id: string;
  agent: string;
  message: string;
  icon: React.ReactNode;
  color: string;
}

const LoadingAgent = ({ tripData }: LoadingAgentProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const planeControls = useAnimation();
  
  const agentMessages: AgentMessage[] = [
    {
      id: "1",
      agent: "Research Agent",
      message: `Analyzing flights to ${tripData.destination?.name}...`,
      icon: <Plane className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "2",
      agent: "Hotel Agent",
      message: "Comparing accommodations and pricing...",
      icon: <Hotel className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "3",
      agent: "Optimizer Agent",
      message: "Calculating best routes and timing...",
      icon: <Calculator className="h-6 w-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      id: "4",
      agent: "AI Writer",
      message: "Generating personalized itinerary...",
      icon: <FileText className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  useEffect(() => {
    // Animate messages
    const messageTimer = setInterval(() => {
      setVisibleMessages(prev => {
        if (prev >= agentMessages.length) {
          clearInterval(messageTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    // Animate progress
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 80);

    // Animate plane
    planeControls.start({
      x: ["0%", "100%"],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    });

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressTimer);
    };
  }, []);

  // Generate floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -50, 0],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl px-8">
        {/* Top Section - Progress & Plane */}
        <div className="mb-12 space-y-8">
          {/* Destination Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              <h2 className="text-2xl font-semibold text-muted-foreground">
                Planning your trip to
              </h2>
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold text-foreground">
              {tripData.destination?.name}
            </h1>
          </motion.div>

          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">
                Overall Progress
              </span>
              <motion.span
                key={progress}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-primary"
              >
                {progress}%
              </motion.span>
            </div>
            <div className="relative h-4 bg-muted rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </div>

          {/* Plane Animation with Trail */}
          <div className="relative h-24 overflow-hidden">
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              animate={planeControls}
            >
              <div className="relative">
                {/* Plane Icon */}
                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Plane className="h-20 w-20 text-primary drop-shadow-2xl" />
                </motion.div>
                
                {/* Animated Trail */}
                <motion.div
                  className="absolute -left-32 top-1/2 -translate-y-1/2 h-1"
                  style={{
                    background: "linear-gradient(to right, transparent, hsl(var(--primary)), transparent)"
                  }}
                  animate={{
                    width: [0, 120, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Sparkle Effects */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 text-secondary"
                    animate={{
                      x: [-20, -60],
                      opacity: [1, 0],
                      scale: [1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Agent Messages with Enhanced Animations */}
        <div className="space-y-6">
          {agentMessages.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -80, scale: 0.8 }}
              animate={{
                opacity: visibleMessages > index ? 1 : 0,
                x: visibleMessages > index ? 0 : -80,
                scale: visibleMessages > index ? 1 : 0.8
              }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
                delay: index * 0.1
              }}
              className="flex items-center gap-6"
            >
              {/* Icon Container with Pulse */}
              <motion.div
                className={`relative p-5 rounded-2xl bg-gradient-to-br ${agent.color} text-white shadow-2xl`}
                animate={
                  visibleMessages === index + 1
                    ? {
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 10px 30px -10px rgba(0,0,0,0.3)",
                          "0 20px 50px -10px rgba(0,0,0,0.5)",
                          "0 10px 30px -10px rgba(0,0,0,0.3)"
                        ]
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: visibleMessages === index + 1 ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {visibleMessages === index + 1 && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-white"
                    animate={{
                      opacity: [0.3, 0, 0.3],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                <div className="relative z-10">{agent.icon}</div>
              </motion.div>
              
              {/* Message Card */}
              <div className="flex-1 bg-card/80 backdrop-blur-md border-2 border-border rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-xl mb-2">
                      {agent.agent}
                    </h3>
                    <p className="text-muted-foreground text-base">
                      {agent.message}
                    </p>
                    
                    {/* Loading Dots */}
                    {visibleMessages === index + 1 && (
                      <div className="flex gap-1.5 mt-3">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Checkmark Animation */}
                  {visibleMessages > index + 1 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      className="ml-4"
                    >
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 bg-green-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <CheckCircle2 className="h-8 w-8 text-green-500 relative z-10" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          className="text-center mt-12 space-y-4"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p className="text-2xl font-semibold text-foreground">
            Crafting your perfect itinerary...
          </p>
          <p className="text-base text-muted-foreground">
            Analyzing {tripData.travelers} traveler{tripData.travelers > 1 ? "s" : ""} • 
            Budget ₹{tripData.budget} • 
            {tripData.interests.length} interests
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAgent;
