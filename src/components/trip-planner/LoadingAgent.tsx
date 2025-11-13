import { useState, useEffect, useMemo } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import {
  Plane,
  Hotel,
  Calculator,
  FileText,
  CheckCircle2,
  Sparkles,
  PartyPopper,
} from "lucide-react"
import { ItineraryResult } from "./resultPage"

// Generate messages for each “AI Agent”
const getAgentMessages = (destinationName: string) => [
  {
    id: "1",
    agent: "Research Agent",
    message: `Analyzing flights to ${destinationName}...`,
    icon: <Plane className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    duration: 2000,
  },
  {
    id: "2",
    agent: "Hotel Agent",
    message: "Comparing accommodations and pricing...",
    icon: <Hotel className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    duration: 2000,
  },
  {
    id: "3",
    agent: "Optimizer Agent",
    message: "Calculating best routes and timing...",
    icon: <Calculator className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    duration: 2000,
  },
  {
    id: "4",
    agent: "AI Writer",
    message: "Generating personalized itinerary...",
    icon: <FileText className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    duration: 2000,
  },
]

interface TripData {
  destination: {
    name: string
    country: string
  } | null
  budget: string
  startDate: string
  endDate: string
  travelers: number
  interests: string[]
}

const mockResultData = {
  agents: {
    optimizer: {
      flight: { option: "Air France - Economy", price: 45000, score: 92 },
      hotel: { name: "Le Meurice", price: 12000, rating: 4.8, score: 88 },
      activities: [
        { name: "Louvre Museum Tour", price: 3000, type: "Art", score: 85 },
        { name: "Eiffel Tower Dinner", price: 5000, type: "Romance", score: 90 },
        { name: "Seine River Cruise", price: 2500, type: "Relax", score: 80 },
      ],
      estimated_total: 97500,
    },
  },
  itinerary: `### Day 1: Arrival & City Walk
- **Morning**: Arrive in Paris, check into hotel
- **Afternoon**: Walk around Champs-Élysées
- **Evening**: Seine River Cruise

### Day 2: Art & Culture
- **Morning**: Visit Louvre Museum
- **Afternoon**: Explore Montmartre
- **Evening**: Eiffel Tower Dinner
`,
}

const LoadingAgent = ({ tripData }: { tripData: TripData }) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const agentMessages = useMemo(
    () => getAgentMessages(tripData.destination?.name || "your destination"),
    [tripData.destination]
  )

  const planeControls = useAnimation()
  const orb1Controls = useAnimation()
  const orb2Controls = useAnimation()
  const orb3Controls = useAnimation()
  const bottomMessageControls = useAnimation()

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const randomValues = {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2,
        };
        return {
          id: i,
          ...randomValues,
        };
      }),
    []
  )

  useEffect(() => {
    planeControls.start({
      x: ["0%", "100%"],
      transition: { duration: 10, repeat: Infinity, ease: "linear" },
    })
    orb1Controls.start({
      scale: [1, 1.3, 1],
      x: [0, 50, 0],
      y: [0, 30, 0],
      opacity: [0.4, 0.6, 0.4],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    })
    orb2Controls.start({
      scale: [1.2, 1, 1.2],
      x: [0, -40, 0],
      y: [0, -50, 0],
      opacity: [0.5, 0.3, 0.5],
      transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
    })
    orb3Controls.start({
      scale: [1, 1.4, 1],
      rotate: [0, 180, 360],
      transition: { duration: 10, repeat: Infinity, ease: "linear" },
    })
    bottomMessageControls.start({
      opacity: [0.6, 1, 0.6],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    })

    const messageTimer = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev >= agentMessages.length) {
          clearInterval(messageTimer)
          return prev
        }
        return prev + 1
      })
    }, 2000)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          setIsComplete(true)
          return 100
        }
        return prev + 1
      })
    }, 80)

    return () => {
      clearInterval(messageTimer)
      clearInterval(progressTimer)
    }
  }, [
    agentMessages.length,
    planeControls,
    orb1Controls,
    orb2Controls,
    orb3Controls,
    bottomMessageControls,
  ])

  useEffect(() => {
    if (isComplete) {
      planeControls.stop()
      orb1Controls.stop()
      orb2Controls.stop()
      orb3Controls.stop()
      bottomMessageControls.stop()
      const completeTimer = setTimeout(() => {
        setShowResult(true)
      }, 3500)
      return () => clearTimeout(completeTimer)
    }
  }, [isComplete])

  if (showResult) {
    return (
      <motion.div
        key="result"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}>
        <ItineraryResult
          destination={tripData.destination?.name || "Your Destination"}
          backgroundImage="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
          accentColor="#ff4d6d"
          data={mockResultData}
          onClose={() => window.location.reload()}
        />
      </motion.div>
    )
  }

  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl"
          animate={orb1Controls}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full blur-3xl"
          animate={orb2Controls}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-3xl"
          animate={orb3Controls}
        />
      </div>

      {/* Floating Particles */}
      {!isComplete &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Content */}
      <div className="relative z-10 w-full px-8">
        <AnimatePresence>
          {!isComplete ? (
            <motion.div
			className="flex items-center justify-center gap-[200px] h-full w-full"
              key="loading"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}>
              {/* Header */}
              <div className="text-center space-y-4 mb-12 flex items-center justify-center gap-[10px] flex-col">
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
              </div>

              {/* Progress */}
              <div className="h-full w-fit flex items-center justify-between flex-col">
              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between gap-[30px] text-sm">
                  <span className="text-muted-foreground font-medium text-[22px]">
                    Overall Progress
                  </span>
                  <motion.span
                    key={progress}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-primary">
                    {progress}%
                  </motion.span>
                </div>
                <div className="relative h-4 bg-muted rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Agent Messages */}
              <div className="space-y-6">
                {agentMessages.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -80, scale: 0.8 }}
                    animate={{
                      opacity: visibleMessages > index ? 1 : 0,
                      x: visibleMessages > index ? 0 : -80,
                      scale: visibleMessages > index ? 1 : 0.8,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: index * 0.1,
                    }}
                    className="flex items-center gap-6">
                    <motion.div
                      className={`relative p-5 rounded-2xl bg-gradient-to-br ${agent.color} text-white shadow-2xl`}
                      animate={
                        visibleMessages === index + 1
                          ? { scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        repeat: visibleMessages === index + 1 ? Infinity : 0,
                      }}>
                      <div className="relative z-10">{agent.icon}</div>
                    </motion.div>

                    <div className="flex-1 bg-card/80 backdrop-blur-md border-2 border-border rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground text-xl mb-2">
                            {agent.agent}
                          </h3>
                          <p className="text-muted-foreground text-base">
                            {agent.message}
                          </p>
                        </div>
                        {visibleMessages > index + 1 && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            }}>
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
              className="text-center flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: 0.5,
                }}>
                <PartyPopper className="h-32 w-32 text-primary" />
              </motion.div>
              <h1 className="text-6xl font-bold text-foreground mt-8">
                All done!
              </h1>
              <p className="text-2xl text-muted-foreground mt-4">
                Your personalized trip to {tripData.destination?.name} is ready.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LoadingAgent

