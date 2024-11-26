export const getZodiacEmoji = (zodiac: string): string => {
    const zodiacMap: Record<string, string> = {
      aries: "♈️",
      taurus: "♉️",
      gemini: "♊️",
      cancer: "♋️",
      leo: "♌️",
      virgo: "♍️",
      libra: "♎️",
      scorpio: "♏️",
      sagittarius: "♐️",
      capricorn: "♑️",
      aquarius: "♒️",
      pisces: "♓️"
    };
  
    return zodiacMap[zodiac.toLowerCase()] || "⭐️";
  };
  
  export const getHoroscopeEmoji = (horoscope: string): string => {
    // Common horoscope themes and their corresponding emojis
    const horoscopeThemes: Record<string, string> = {
      love: "❤️",
      career: "💼",
      health: "🏥",
      money: "💰",
      success: "🌟",
      travel: "✈️",
      friendship: "🤝",
      family: "👨‍👩‍👧‍👦",
      creativity: "🎨",
      spiritual: "🧘‍♀️",
      learning: "📚",
      communication: "💭"
    };
  
    // Check if the horoscope contains any of the theme keywords
    const matchingTheme = Object.keys(horoscopeThemes).find(theme => 
      horoscope.toLowerCase().includes(theme)
    );
  
    return matchingTheme ? horoscopeThemes[matchingTheme] : "🔮";
  };