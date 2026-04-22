// miami-restaurants.js
// Curated dataset of real Miami-Dade & Broward restaurants
// Structured like Yelp data: name, cuisine, neighborhood, rating, price, highlights, warnings
// Used as RAG context for the Miami Local AI chatbot

const MIAMI_RESTAURANTS = [
  // ── CUBAN ───────────────────────────────────────────────────────────────────
  { id: 1,  name: "Versailles Restaurant",         cuisine: "Cuban",          neighborhood: "Little Havana",    city: "Miami",      rating: 4.3, reviews: 8200, price: "$$",  highlights: "iconic Cuban institution since 1971, best Cuban sandwich in Miami, great cortadito, lively atmosphere, celebrity sightings", warnings: "always crowded, waits can be long on weekends", mustOrder: "Cuban sandwich, ropa vieja, croquetas" },
  { id: 2,  name: "El Palacio de los Jugos",        cuisine: "Cuban",          neighborhood: "Little Havana",    city: "Miami",      rating: 4.4, reviews: 3100, price: "$",   highlights: "authentic hole-in-the-wall, best fresh fruit juices in Miami, cheap and filling, real locals eat here", warnings: "cash only, no frills, can get very crowded", mustOrder: "batidos, tamales, lunch specials" },
  { id: 3,  name: "Havana 1957",                    cuisine: "Cuban",          neighborhood: "South Beach",      city: "Miami Beach", rating: 4.2, reviews: 4500, price: "$$",  highlights: "beautiful retro Havana decor, great mojitos, solid Cuban classics, good for first-timers", warnings: "touristy location means higher prices, can feel less authentic than Little Havana", mustOrder: "lechon asado, mojito, tres leches" },
  { id: 4,  name: "La Carreta",                     cuisine: "Cuban",          neighborhood: "Little Havana",    city: "Miami",      rating: 4.1, reviews: 5600, price: "$$",  highlights: "open 24 hours, reliable Cuban comfort food, great for late night, multiple locations", warnings: "nothing special, but always consistent", mustOrder: "Cuban coffee, media noche, picadillo" },
  { id: 5,  name: "Islas Canarias",                 cuisine: "Cuban",          neighborhood: "Little Havana",    city: "Miami",      rating: 4.5, reviews: 2800, price: "$",   highlights: "beloved local institution, homestyle Cuban cooking, best pastelitos in the city, genuinely off the tourist trail", warnings: "limited seating, cash preferred", mustOrder: "pastelitos, caldo gallego, pressed Cuban" },
  { id: 6,  name: "Sergio's",                       cuisine: "Cuban",          neighborhood: "Coral Gables",     city: "Miami",      rating: 4.0, reviews: 1900, price: "$$",  highlights: "family-friendly, great breakfast, solid all-day Cuban menu, locals love it", warnings: "nothing extraordinary, neighborhood staple", mustOrder: "huevos rancheros, Cuban breakfast, cafe con leche" },

  // ── SEAFOOD ─────────────────────────────────────────────────────────────────
  { id: 7,  name: "Joe's Stone Crab",               cuisine: "Seafood",        neighborhood: "South Beach",      city: "Miami Beach", rating: 4.5, reviews: 12000, price: "$$$$", highlights: "Miami's most legendary restaurant since 1913, best stone crabs in the world, must-visit experience, jackets required", warnings: "extremely expensive, long waits without reservation, closed in off-season (May-Oct)", mustOrder: "stone crab claws, key lime pie, hash browns" },
  { id: 8,  name: "Garcia's Seafood Grille",        cuisine: "Seafood",        neighborhood: "Little Havana",    city: "Miami",      rating: 4.4, reviews: 3400, price: "$$$", highlights: "waterfront on Miami River, super fresh fish, hidden gem locals love, great grilled whole fish", warnings: "no reservations, can be long wait, limited parking", mustOrder: "whole fried snapper, stone crab when in season, fish dip" },
  { id: 9,  name: "Shorty's BBQ & Grill",           cuisine: "Seafood/BBQ",    neighborhood: "South Miami",      city: "Miami",      rating: 4.0, reviews: 2100, price: "$$",  highlights: "Miami institution since 1951, great for groups, fun local atmosphere", warnings: "not a seafood spot, BBQ is the focus", mustOrder: "BBQ ribs, coleslaw, corn on the cob" },
  { id: 10, name: "Truluck's",                      cuisine: "Seafood",        neighborhood: "Brickell",         city: "Miami",      rating: 4.6, reviews: 2800, price: "$$$$", highlights: "upscale seafood done right, great stone crab, excellent service, perfect for celebrations", warnings: "very expensive, need reservations", mustOrder: "stone crab, Chilean sea bass, lobster bisque" },
  { id: 11, name: "Casablanca Seafood Bar",         cuisine: "Seafood",        neighborhood: "Overtown",         city: "Miami",      rating: 4.3, reviews: 1800, price: "$$$", highlights: "waterfront on Miami River, super fresh local fish, beautiful views, BYOB friendly", warnings: "limited parking, mostly outdoor seating", mustOrder: "grilled mahi-mahi, fried shrimp, fish tacos" },
  { id: 12, name: "The Fish House Encore",          cuisine: "Seafood",        neighborhood: "Key Biscayne",     city: "Miami",      rating: 4.2, reviews: 900, price: "$$$",  highlights: "casual Key Biscayne waterfront dining, fresh local catch, great after a beach day", warnings: "nothing fancy, service can be slow", mustOrder: "catch of the day, conch fritters, fish sandwich" },

  // ── JAPANESE / SUSHI ────────────────────────────────────────────────────────
  { id: 13, name: "Nobu Miami Beach",               cuisine: "Japanese",       neighborhood: "South Beach",      city: "Miami Beach", rating: 4.4, reviews: 5200, price: "$$$$", highlights: "world-famous Nobu brand, celebrity hotspot, great black cod, stunning beachfront location", warnings: "extremely expensive, noisy, better for the experience than value", mustOrder: "black cod miso, yellowtail jalapeño, omakase" },
  { id: 14, name: "Zuma Miami",                     cuisine: "Japanese",       neighborhood: "Brickell",         city: "Miami",      rating: 4.5, reviews: 4100, price: "$$$$", highlights: "best Japanese in Brickell, stunning bay views, outstanding robata grill, perfect for business dinners", warnings: "very expensive, hard to get reservations", mustOrder: "crispy rice with spicy tuna, robata lamb, black cod" },
  { id: 15, name: "Naoe",                           cuisine: "Japanese",       neighborhood: "Brickell",         city: "Miami",      rating: 4.9, reviews: 820, price: "$$$$",  highlights: "Miami's best omakase, intimate 8-seat experience, chef Kevin Cory is a genius, life-changing meal", warnings: "must book weeks in advance, extremely expensive, no substitutions", mustOrder: "omakase only, trust the chef" },
  { id: 16, name: "Hiyakawa",                       cuisine: "Japanese",       neighborhood: "Brickell",         city: "Miami",      rating: 4.7, reviews: 1400, price: "$$$$", highlights: "beautiful new omakase spot, exceptional quality, great sake selection, sleek modern space", warnings: "pricey, reservations essential", mustOrder: "omakase, A5 wagyu, premium sake pairing" },
  { id: 17, name: "Sushi Garage",                   cuisine: "Japanese",       neighborhood: "Coconut Grove",    city: "Miami",      rating: 4.3, reviews: 2200, price: "$$$",  highlights: "fun Miami take on Japanese, creative rolls, great happy hour, lively atmosphere", warnings: "loud, quality varies, more fun than traditional", mustOrder: "Dragon roll, truffle sashimi, edamame" },
  { id: 18, name: "KYU Miami",                      cuisine: "Japanese/Asian", neighborhood: "Wynwood",          city: "Miami",      rating: 4.6, reviews: 3800, price: "$$$",  highlights: "wood-fired Asian cooking, incredible broccoli dish that went viral, great cocktails, Wynwood's best restaurant", warnings: "always packed, must reserve, not traditional Japanese", mustOrder: "wood-roasted broccoli, pork ribs, Japanese fried chicken" },
  { id: 19, name: "Zhen's Sushi",                   cuisine: "Japanese",       neighborhood: "Coral Gables",     city: "Miami",      rating: 4.4, reviews: 1100, price: "$$$",  highlights: "excellent local sushi spot, fresh fish, great omakase value, neighborhood favorite", warnings: "small, reservations strongly recommended", mustOrder: "omakase, bluefin toro, uni" },

  // ── THAI ────────────────────────────────────────────────────────────────────
  { id: 20, name: "Thaicoon",                       cuisine: "Thai",           neighborhood: "Wynwood",          city: "Miami",      rating: 4.2, reviews: 1600, price: "$$",  highlights: "solid Thai in Wynwood, great pad thai, fun atmosphere for the area", warnings: "can be inconsistent, service slow on busy nights", mustOrder: "pad thai, green curry, mango sticky rice" },
  { id: 21, name: "Komodo",                         cuisine: "Asian Fusion",   neighborhood: "Brickell",         city: "Miami",      rating: 4.1, reviews: 6200, price: "$$$$", highlights: "Miami's hottest see-and-be-seen restaurant, stunning multi-floor space, great dumplings, amazing cocktails", warnings: "more about the scene than the food, very expensive, inconsistent service", mustOrder: "Peking duck, steamed dumplings, lychee martini" },
  { id: 22, name: "Pubbelly Sushi",                 cuisine: "Asian Fusion",   neighborhood: "South Beach",      city: "Miami Beach", rating: 4.3, reviews: 3200, price: "$$$", highlights: "Miami's beloved fusion pioneer, creative rolls, great for groups, fun atmosphere", warnings: "loud, waits on weekends, the original location is best", mustOrder: "hamachi pizza, lotus root chips, wagyu tataki" },
  { id: 23, name: "Lan Pan-Asian Café",             cuisine: "Thai/Vietnamese",neighborhood: "Coral Gables",     city: "Miami",      rating: 4.4, reviews: 1400, price: "$$",  highlights: "excellent value pan-Asian, great pho, fresh spring rolls, neighborhood gem", warnings: "nothing flashy, but consistently good", mustOrder: "pho, pad see ew, spring rolls" },

  // ── VIETNAMESE ──────────────────────────────────────────────────────────────
  { id: 24, name: "Pho 78",                         cuisine: "Vietnamese",     neighborhood: "Westchester",      city: "Miami",      rating: 4.5, reviews: 2100, price: "$",   highlights: "best pho in Miami, huge portions, dirt cheap, locals only know about this one", warnings: "no atmosphere, cash preferred, not in a tourist area", mustOrder: "pho tai, Vietnamese iced coffee, fresh spring rolls" },
  { id: 25, name: "Pho Saigon Noodle & Grill",      cuisine: "Vietnamese",     neighborhood: "Little Havana",    city: "Miami",      rating: 4.3, reviews: 1500, price: "$",   highlights: "authentic Vietnamese in an unlikely location, great banh mi, cheap and fast", warnings: "basic decor, limited seating", mustOrder: "pho, banh mi, bun bo hue" },
  { id: 26, name: "Nguyen's Bistro",                cuisine: "Vietnamese",     neighborhood: "Hialeah",          city: "Miami",      rating: 4.4, reviews: 800, price: "$",    highlights: "hidden gem in Hialeah, incredible Vietnamese food for Miami, very cheap", warnings: "far from tourist areas, no frills", mustOrder: "banh xeo, pho, bun thit nuong" },

  // ── KOREAN ──────────────────────────────────────────────────────────────────
  { id: 27, name: "Hanna Korean Restaurant",        cuisine: "Korean",         neighborhood: "Doral",            city: "Miami",      rating: 4.4, reviews: 1200, price: "$$",  highlights: "best Korean BBQ in Miami, excellent banchan, authentic flavors, large portions", warnings: "far from Miami Beach, in Doral near airport", mustOrder: "galbi, bulgogi, dolsot bibimbap" },
  { id: 28, name: "Korean BBQ Grill",               cuisine: "Korean",         neighborhood: "Doral",            city: "Miami",      rating: 4.2, reviews: 900, price: "$$",   highlights: "fun tabletop grilling, great for groups, solid BBQ meats", warnings: "you smell like BBQ after, parking can be tricky", mustOrder: "samgyeopsal, short ribs, japchae" },
  { id: 29, name: "Swine Southern Table",           cuisine: "Southern/BBQ",   neighborhood: "Coral Gables",     city: "Miami",      rating: 4.3, reviews: 1700, price: "$$$", highlights: "Miami's best BBQ, incredible brisket, craft cocktails, great brunch", warnings: "not Asian food, popular brunch spot", mustOrder: "brisket, burnt ends, mac and cheese" },

  // ── CHINESE ─────────────────────────────────────────────────────────────────
  { id: 30, name: "Tropical Chinese Restaurant",    cuisine: "Chinese",        neighborhood: "Westchester",      city: "Miami",      rating: 4.3, reviews: 2400, price: "$$",  highlights: "Miami's best dim sum, enormous portions, authentic Cantonese, local Chinese community eats here", warnings: "not in a tourist area, service can be brusque, waits on weekend mornings", mustOrder: "dim sum weekend brunch, Peking duck, seafood" },
  { id: 31, name: "Shang Palace",                   cuisine: "Chinese",        neighborhood: "Kendall",          city: "Miami",      rating: 4.1, reviews: 1100, price: "$$",  highlights: "solid Chinese food south of Miami, popular with local Chinese families, good lunch specials", warnings: "far from downtown, suburban location", mustOrder: "dim sum, Hong Kong BBQ duck, fried rice" },
  { id: 32, name: "Sakura Garden",                  cuisine: "Chinese/Japanese",neighborhood: "Coral Gables",    city: "Miami",      rating: 4.0, reviews: 800, price: "$$",  highlights: "neighborhood Chinese-Japanese hybrid, reliable, good for takeout", warnings: "nothing extraordinary, fused menu confuses purists", mustOrder: "lo mein, chicken teriyaki, dumplings" },

  // ── ITALIAN ─────────────────────────────────────────────────────────────────
  { id: 33, name: "Cecconi's Miami Beach",          cuisine: "Italian",        neighborhood: "South Beach",      city: "Miami Beach", rating: 4.4, reviews: 3800, price: "$$$$", highlights: "stunning poolside setting at the Soho Beach House, A-list crowd, excellent pasta, great brunch", warnings: "very expensive, members get priority, can feel exclusive", mustOrder: "black truffle pizza, burrata, tagliatelle Bolognese" },
  { id: 34, name: "Cipriani Downtown Miami",        cuisine: "Italian",        neighborhood: "Brickell",         city: "Miami",      rating: 4.5, reviews: 2200, price: "$$$$", highlights: "legendary New York Italian brand comes to Miami, stunning space, great people-watching, excellent pasta", warnings: "extremely expensive, more about atmosphere", mustOrder: "bellini, beef carpaccio, pasta" },
  { id: 35, name: "Macchialina",                    cuisine: "Italian",        neighborhood: "South Beach",      city: "Miami Beach", rating: 4.6, reviews: 2400, price: "$$$", highlights: "one of South Beach's best kept secrets, incredible handmade pasta, romantic atmosphere, chef Michael Pirolo is brilliant", warnings: "small space, reservations essential", mustOrder: "handmade pasta, arancini, tiramisu" },
  { id: 36, name: "Ghee Indian Kitchen",            cuisine: "Indian",         neighborhood: "Design District",  city: "Miami",      rating: 4.5, reviews: 1800, price: "$$$", highlights: "Miami's best Indian restaurant, modern take on Indian classics, great cocktails, beautiful space", warnings: "pricey for Indian food, can get loud", mustOrder: "butter chicken, lamb biryani, garlic naan" },

  // ── MEXICAN ─────────────────────────────────────────────────────────────────
  { id: 37, name: "Coyo Taco",                      cuisine: "Mexican",        neighborhood: "Wynwood",          city: "Miami",      rating: 4.3, reviews: 4200, price: "$",   highlights: "Wynwood's best tacos, open late, great mezcal selection, hip atmosphere, reasonably priced", warnings: "waits can be very long, loud and crowded", mustOrder: "al pastor tacos, guacamole, margarita" },
  { id: 38, name: "Tacos & Tattoos",                cuisine: "Mexican",        neighborhood: "Wynwood",          city: "Miami",      rating: 4.1, reviews: 1200, price: "$",   highlights: "fun concept, solid street-style tacos, great for late night Wynwood crowd", warnings: "gimmicky concept, quality inconsistent", mustOrder: "carnitas tacos, elotes, horchata" },
  { id: 39, name: "El Toro Taqueria",               cuisine: "Mexican",        neighborhood: "Little Havana",    city: "Miami",      rating: 4.4, reviews: 900, price: "$",    highlights: "authentic Mexican tacos, incredibly cheap, fresh tortillas made in-house, locals love it", warnings: "cash only, no atmosphere, basic setting", mustOrder: "birria tacos, horchata, quesadillas" },

  // ── AMERICAN / BURGERS ──────────────────────────────────────────────────────
  { id: 40, name: "Kush Wynwood",                   cuisine: "American",       neighborhood: "Wynwood",          city: "Miami",      rating: 4.4, reviews: 3600, price: "$$",  highlights: "Miami's best burger, great craft beer selection, very Wynwood vibe, excellent brunch", warnings: "always crowded, waits on weekends", mustOrder: "Kush burger, truffle fries, craft beer flight" },
  { id: 41, name: "Shake Shack",                    cuisine: "American",       neighborhood: "South Beach",      city: "Miami Beach", rating: 4.2, reviews: 5100, price: "$$",  highlights: "reliable quality, great for quick meal on Lincoln Road, outdoor seating, always consistent", warnings: "nothing Miami-specific, just a chain", mustOrder: "ShackBurger, crinkle fries, shake" },
  { id: 42, name: "The Local Craft Food & Drink",   cuisine: "American",       neighborhood: "Coral Gables",     city: "Miami",      rating: 4.3, reviews: 1400, price: "$$",  highlights: "great neighborhood gastropub, solid burgers, excellent happy hour, local craft beers", warnings: "nothing extraordinary, reliable neighborhood spot", mustOrder: "Local burger, sweet potato fries, local IPA" },
  { id: 43, name: "Stubborn Seed",                  cuisine: "American",       neighborhood: "South Beach",      city: "Miami Beach", rating: 4.7, reviews: 1600, price: "$$$$", highlights: "Michelin-starred, Chef Jeremy Ford from Top Chef, stunning tasting menu, one of Miami's finest", warnings: "very expensive, must book ahead, tasting menu only", mustOrder: "tasting menu, wine pairing" },

  // ── BRUNCH ──────────────────────────────────────────────────────────────────
  { id: 44, name: "Yardbird Southern Table & Bar",  cuisine: "Southern",       neighborhood: "South Beach",      city: "Miami Beach", rating: 4.5, reviews: 5800, price: "$$$", highlights: "Miami's best brunch, incredible fried chicken, great cocktails, see-and-be-seen spot", warnings: "very long waits without reservation, expensive", mustOrder: "fried chicken, watermelon and feta salad, biscuits" },
  { id: 45, name: "Panther Coffee",                 cuisine: "Coffee/Café",    neighborhood: "Wynwood",          city: "Miami",      rating: 4.6, reviews: 3200, price: "$",   highlights: "Miami's best coffee roaster, multiple locations, great single-origin brews, Wynwood institution", warnings: "no food menu, just coffee and pastries", mustOrder: "pour-over, cortado, seasonal single origin" },
  { id: 46, name: "db Bistro Moderne",              cuisine: "French",         neighborhood: "Brickell",         city: "Miami",      rating: 4.4, reviews: 1900, price: "$$$", highlights: "Daniel Boulud's Miami spot, outstanding French bistro classics, great happy hour, JW Marriott location", warnings: "hotel restaurant feel, pricey", mustOrder: "db burger, steak frites, crème brûlée" },
  { id: 47, name: "Zak the Baker",                  cuisine: "Bakery/Café",    neighborhood: "Wynwood",          city: "Miami",      rating: 4.7, reviews: 2800, price: "$",   highlights: "Miami's best bakery, incredible sourdough bread, excellent sandwiches, beloved by locals", warnings: "closed on weekends, limited hours", mustOrder: "sourdough loaf, avocado toast, egg sandwich" },

  // ── ROOFTOP / SCENE ─────────────────────────────────────────────────────────
  { id: 48, name: "Sugar at EAST Hotel",            cuisine: "Asian Fusion",   neighborhood: "Brickell",         city: "Miami",      rating: 4.4, reviews: 4200, price: "$$$", highlights: "best rooftop bar in Miami, stunning Brickell skyline views, great cocktails and food, open-air garden setting", warnings: "lines on weekends, dress code enforced, expensive", mustOrder: "cocktails at sunset, dumplings, tuna tartare" },
  { id: 49, name: "Rooftop at 1 Hotel",             cuisine: "American",       neighborhood: "South Beach",      city: "Miami Beach", rating: 4.3, reviews: 2900, price: "$$$$", highlights: "ocean views, stunning pool area, great brunch, see-and-be-seen South Beach crowd", warnings: "extremely expensive, hotel guests get priority", mustOrder: "weekend brunch, cocktails, seafood tower" },
  { id: 50, name: "Baoli Miami",                    cuisine: "Mediterranean",  neighborhood: "South Beach",      city: "Miami Beach", rating: 4.0, reviews: 3100, price: "$$$$", highlights: "top nightlife restaurant, celebrity sightings, great Mediterranean food, transforms into club later", warnings: "very expensive, pretentious, more about the scene", mustOrder: "burrata, lobster pasta, signature cocktails" },

  // ── WYNWOOD AREA ────────────────────────────────────────────────────────────
  { id: 51, name: "Alter",                          cuisine: "Contemporary",   neighborhood: "Wynwood",          city: "Miami",      rating: 4.6, reviews: 1900, price: "$$$$", highlights: "Miami's most creative restaurant, Chef Brad Kilgore, James Beard nominated, farm-to-table excellence", warnings: "expensive, tasting menu format, not for everyone", mustOrder: "chef's tasting menu" },
  { id: 52, name: "Wynwood Diner",                  cuisine: "American",       neighborhood: "Wynwood",          city: "Miami",      rating: 4.2, reviews: 2100, price: "$$",  highlights: "24-hour diner in Wynwood, great after a night out, solid American comfort food, fun atmosphere", warnings: "nothing special food-wise, but great for the area and hours", mustOrder: "classic breakfast, burgers, milkshakes" },
  { id: 53, name: "Enriqueta's Sandwich Shop",      cuisine: "Cuban",          neighborhood: "Wynwood",          city: "Miami",      rating: 4.6, reviews: 2600, price: "$",   highlights: "Miami institution since the 1950s, best breakfast in Wynwood, incredible Cuban sandwich, cash only, arrive early", warnings: "cash only, closes early (2pm), long lines, limited seating", mustOrder: "Cuban sandwich, croquetas, Cuban breakfast" },

  // ── DESIGN DISTRICT ─────────────────────────────────────────────────────────
  { id: 54, name: "Michael's Genuine",              cuisine: "American",       neighborhood: "Design District",  city: "Miami",      rating: 4.5, reviews: 3800, price: "$$$", highlights: "Miami's farm-to-table pioneer, James Beard nominated Chef Michael Schwartz, always excellent, indoor/outdoor", warnings: "popular, book ahead, can be expensive", mustOrder: "wood-roasted vegetables, whole fish, artisanal pizza" },
  { id: 55, name: "L'Atelier de Joël Robuchon",    cuisine: "French",         neighborhood: "Design District",  city: "Miami",      rating: 4.7, reviews: 1200, price: "$$$$", highlights: "legendary French chef's Miami outpost, counter dining watching chefs work, exceptional cuisine, multiple Michelin stars", warnings: "extremely expensive, must reserve, not for casual dining", mustOrder: "le caviar, le poulet, tasting menu" },

  // ── LITTLE HAITI / EDGEWATER ────────────────────────────────────────────────
  { id: 56, name: "Tap Tap Haitian Restaurant",     cuisine: "Haitian",        neighborhood: "South Beach",      city: "Miami Beach", rating: 4.2, reviews: 1400, price: "$$",  highlights: "unique Haitian cuisine in Miami, vibrant art-covered walls, excellent goat and griot, cultural experience", warnings: "service can be slow, not for everyone's palate", mustOrder: "griot, pumpkin soup, plantains" },
  { id: 57, name: "Phuc Yea",                       cuisine: "Vietnamese",     neighborhood: "Miami",            city: "Miami",      rating: 4.4, reviews: 1800, price: "$$",  highlights: "fun Vietnamese-Cajun mashup, great cocktails, creative menu, very Miami concept", warnings: "fusion can be uneven, more style than substance at times", mustOrder: "pho French onion soup, shaking beef, bánh mì" },

  // ── COCONUT GROVE ───────────────────────────────────────────────────────────
  { id: 58, name: "Glass & Vine",                   cuisine: "American",       neighborhood: "Coconut Grove",    city: "Miami",      rating: 4.4, reviews: 2100, price: "$$$", highlights: "stunning location in Peacock Park, incredible Biscayne Bay views, excellent brunch and dinner", warnings: "can be windy outdoors, slow service when busy", mustOrder: "whole fish, brunch cocktails, oysters" },
  { id: 59, name: "Lokal",                          cuisine: "American",       neighborhood: "Coconut Grove",    city: "Miami",      rating: 4.3, reviews: 1700, price: "$$",  highlights: "Grove's best burger and craft beer, chill local atmosphere, great outdoor seating under trees", warnings: "waits on weekends, can be noisy", mustOrder: "Lokal burger, craft IPA, sweet potato fries" },
  { id: 60, name: "GreenStreet Café",               cuisine: "Mediterranean",  neighborhood: "Coconut Grove",    city: "Miami",      rating: 4.2, reviews: 2900, price: "$$",  highlights: "Grove institution since 1992, great people-watching patio, solid food, Miami staple", warnings: "nothing groundbreaking, but always reliable", mustOrder: "Greek salad, salmon, sangria" },

  // ── CORAL GABLES ────────────────────────────────────────────────────────────
  { id: 61, name: "Bulla Gastrobar",                cuisine: "Spanish",        neighborhood: "Coral Gables",     city: "Miami",      rating: 4.4, reviews: 3100, price: "$$",  highlights: "Miami's best Spanish tapas, great patatas bravas, excellent sangria, lively atmosphere", warnings: "loud on weekends, limited reservations", mustOrder: "patatas bravas, croquetas, pan con tomate, sangria" },
  { id: 62, name: "Matsuri",                        cuisine: "Japanese",       neighborhood: "South Miami",      city: "Miami",      rating: 4.5, reviews: 1300, price: "$$$",  highlights: "local favorite for quality sushi, less pretentious than Brickell spots, excellent omakase value, Japanese clientele dines here", warnings: "strip mall location throws people off, must reserve", mustOrder: "omakase, uni, bluefin toro" },
  { id: 63, name: "Seasons 52",                     cuisine: "American",       neighborhood: "Coral Gables",     city: "Miami",      rating: 4.2, reviews: 2400, price: "$$$",  highlights: "healthy seasonal menu, great wine selection, good for business lunch, consistent quality", warnings: "chain restaurant, nothing unique to Miami", mustOrder: "flatbreads, seasonal fish, mini desserts" },

  // ── KEY BISCAYNE ────────────────────────────────────────────────────────────
  { id: 64, name: "Sundays on the Bay",             cuisine: "American",       neighborhood: "Key Biscayne",     city: "Miami",      rating: 4.1, reviews: 3200, price: "$$$",  highlights: "iconic waterfront spot, great Sunday brunch with live music, boat parking available, Miami classic", warnings: "overpriced for quality, better for atmosphere than food", mustOrder: "seafood platter, brunch cocktails, live music on Sundays" },
  { id: 65, name: "Rusty Pelican",                  cuisine: "American",       neighborhood: "Key Biscayne",     city: "Miami",      rating: 4.2, reviews: 4100, price: "$$$",  highlights: "legendary Miami landmark since 1970, spectacular views of Biscayne Bay and Miami skyline, great for sunset", warnings: "food is average for the price, mainly going for the views and atmosphere", mustOrder: "sunset cocktails on the patio, seafood, Miami skyline views" },

  // ── AVENTURA / NORTH MIAMI ──────────────────────────────────────────────────
  { id: 66, name: "Bourbon Steak",                  cuisine: "Steakhouse",     neighborhood: "Aventura",         city: "Aventura",   rating: 4.6, reviews: 2800, price: "$$$$", highlights: "Michael Mina's steakhouse, exceptional USDA prime beef, incredible free truffle fries with every table, top-tier experience", warnings: "extremely expensive, in the JW Marriott Turnberry", mustOrder: "dry-aged ribeye, truffle fries amuse-bouche, lobster pot pie" },
  { id: 67, name: "Thai House South Beach",         cuisine: "Thai",           neighborhood: "South Beach",      city: "Miami Beach", rating: 4.2, reviews: 1600, price: "$$",  highlights: "reliable Thai in South Beach, solid pad thai and curries, BYOB friendly, open late", warnings: "service can be slow, decor is dated", mustOrder: "drunken noodles, green curry, spring rolls" },

  // ── BROWARD COUNTY ──────────────────────────────────────────────────────────
  { id: 68, name: "Gran Forno Bakery",              cuisine: "Italian/Bakery", neighborhood: "Las Olas",         city: "Fort Lauderdale", rating: 4.6, reviews: 3200, price: "$", highlights: "Fort Lauderdale institution, incredible Italian bread and pastries, excellent paninis, always packed with locals", warnings: "cash only, lines out the door, limited seating", mustOrder: "muffuletta, panini, fresh bread, cannoli" },
  { id: 69, name: "Shooters Waterfront",            cuisine: "American",       neighborhood: "Fort Lauderdale",  city: "Fort Lauderdale", rating: 4.0, reviews: 4200, price: "$$$", highlights: "iconic Fort Lauderdale waterfront dining, great for boat-watching, solid food, lively atmosphere", warnings: "touristy, overpriced for quality, go for the atmosphere", mustOrder: "lobster bisque, sunset cocktails, seafood platter" },
  { id: 70, name: "Steak 954",                      cuisine: "Steakhouse",     neighborhood: "Fort Lauderdale",  city: "Fort Lauderdale", rating: 4.5, reviews: 1900, price: "$$$$", highlights: "Fort Lauderdale's best steakhouse, W Hotel location, shark tank in the dining room, excellent dry-aged beef", warnings: "very expensive, hotel pricing", mustOrder: "dry-aged porterhouse, lobster mac and cheese, shark tank viewing" },
  { id: 71, name: "Casablanca Café",                cuisine: "Mediterranean",  neighborhood: "Fort Lauderdale",  city: "Fort Lauderdale", rating: 4.3, reviews: 2100, price: "$$$", highlights: "stunning oceanfront location, beautiful historic building, great brunch, romantic setting", warnings: "service can be inconsistent, go for brunch not dinner", mustOrder: "weekend brunch, ocean views, seafood" },
  { id: 72, name: "Big City Tavern",                cuisine: "American",       neighborhood: "Las Olas",         city: "Fort Lauderdale", rating: 4.2, reviews: 2800, price: "$$",  highlights: "Las Olas staple, great happy hour, solid American food, outdoor seating on the boulevard", warnings: "nothing extraordinary, solid reliable option", mustOrder: "burgers, happy hour drinks, flatbreads" },
  { id: 73, name: "Cafe Martorano",                 cuisine: "Italian",        neighborhood: "Fort Lauderdale",  city: "Fort Lauderdale", rating: 4.5, reviews: 2200, price: "$$$", highlights: "legendary Fort Lauderdale Italian, celebrity chef Steve Martorano, Sunday Gravy is famous, fun energetic vibe", warnings: "cash only, very loud, long waits", mustOrder: "Sunday gravy, veal parmigiana, pasta e fagioli" },
  { id: 74, name: "Truluck's Fort Lauderdale",      cuisine: "Seafood",        neighborhood: "Fort Lauderdale",  city: "Fort Lauderdale", rating: 4.6, reviews: 1700, price: "$$$$", highlights: "consistently excellent stone crab, great service, special occasion dining, top 10 in Broward", warnings: "expensive, reservations required", mustOrder: "stone crab claws, Chilean sea bass, key lime pie" },
  { id: 75, name: "Rocco's Tacos",                  cuisine: "Mexican",        neighborhood: "Fort Lauderdale",  city: "Fort Lauderdale", rating: 4.1, reviews: 3400, price: "$$",  highlights: "fun tableside guacamole, great margaritas, lively atmosphere, good for groups", warnings: "loud, can be chaotic, food is secondary to the fun atmosphere", mustOrder: "tableside guacamole, al pastor tacos, frozen margaritas" },

  // ── HIDDEN GEMS ─────────────────────────────────────────────────────────────
  { id: 76, name: "Jimmy's East Side Diner",        cuisine: "American",       neighborhood: "Miami Beach",      city: "Miami Beach", rating: 4.5, reviews: 1100, price: "$",   highlights: "Miami Beach's best kept secret, incredible diner breakfast, locals only spot, old school Miami charm", warnings: "cash only, closes early, limited parking", mustOrder: "eggs benedict, pancakes, strong coffee" },
  { id: 77, name: "Gramps",                         cuisine: "Bar/Food",       neighborhood: "Wynwood",          city: "Miami",      rating: 4.4, reviews: 2800, price: "$",   highlights: "Wynwood's best outdoor bar, great food too, cold cheap beer, local bands, genuine Miami hipster scene", warnings: "standing room only, can be crowded", mustOrder: "cold beer, bar snacks, live music" },
  { id: 78, name: "Mojo Donuts",                    cuisine: "Dessert",        neighborhood: "Doral",            city: "Miami",      rating: 4.6, reviews: 1900, price: "$",   highlights: "Miami's best donuts, creative flavors, often sells out, local cult favorite", warnings: "sells out fast, cash only, limited hours", mustOrder: "guava cream cheese, tres leches, maple bacon donut" },
  { id: 79, name: "Azucar Ice Cream",               cuisine: "Dessert",        neighborhood: "Little Havana",    city: "Miami",      rating: 4.7, reviews: 2400, price: "$",   highlights: "Miami's best ice cream, Cuban-inspired flavors, family owned, Little Havana gem, TV and press coverage", warnings: "lines on weekends", mustOrder: "abuela maria flavor, Cuban coffee flavor, seasonal specials" },
  { id: 80, name: "La Moon",                        cuisine: "Colombian",      neighborhood: "Brickell",         city: "Miami",      rating: 4.3, reviews: 1600, price: "$$",  highlights: "authentic Colombian food open 24 hours, incredible bandeja paisa, great after a night out, neighborhood secret", warnings: "nothing fancy, pure comfort food", mustOrder: "bandeja paisa, arepas, Colombian hot chocolate" },

  // ── HALLANDALE / HOLLYWOOD (BROWARD) ────────────────────────────────────────
  { id: 81, name: "Billy's Stone Crab",             cuisine: "Seafood",        neighborhood: "Hollywood Beach",  city: "Hollywood",  rating: 4.4, reviews: 2900, price: "$$$", highlights: "legendary South Florida seafood institution since 1930, excellent stone crab, waterfront dining, locals prefer this to Joe's", warnings: "seasonal stone crab only Oct-May, waits can be long", mustOrder: "stone crab claws, key lime pie, fish dip" },
  { id: 82, name: "S3 Restaurant & Bar",            cuisine: "American",       neighborhood: "Hollywood Beach",  city: "Hollywood",  rating: 4.2, reviews: 1800, price: "$$$", highlights: "beach club vibes at the Diplomat Hotel, great ocean views, solid food, beautiful people", warnings: "expensive resort pricing, better for drinks than food", mustOrder: "seafood, poolside cocktails, sunset views" },
  { id: 83, name: "LONA Cocina Tequileria",         cuisine: "Mexican",        neighborhood: "Hollywood Beach",  city: "Hollywood",  rating: 4.3, reviews: 1400, price: "$$$", highlights: "elevated Mexican at the Diplomat Resort, great tequila selection, good tacos and guacamole", warnings: "resort pricing, can be loud", mustOrder: "tableside guacamole, tacos al pastor, premium tequila" },

  // ── DORAL ───────────────────────────────────────────────────────────────────
  { id: 84, name: "Churrascaria Boi na Braza",      cuisine: "Brazilian",      neighborhood: "Doral",            city: "Miami",      rating: 4.5, reviews: 2100, price: "$$$", highlights: "Miami's best Brazilian churrascaria, all-you-can-eat rodizio, excellent meat quality, great salad bar", warnings: "you will overeat, not for vegetarians, noisy", mustOrder: "picanha, lamb chops, all the meat" },
  { id: 85, name: "Doce Provisions",                cuisine: "American",       neighborhood: "Little Havana",    city: "Miami",      rating: 4.4, reviews: 1500, price: "$$",  highlights: "hipster brunch spot in Little Havana, great coffee, excellent farm-to-table dishes, locally sourced", warnings: "brunch only, waits on weekends", mustOrder: "avocado toast, benedicts, local cold brew" },

  // ── LATE NIGHT ──────────────────────────────────────────────────────────────
  { id: 86, name: "Las Vegas Cuban Cuisine",        cuisine: "Cuban",          neighborhood: "Little Havana",    city: "Miami",      rating: 4.2, reviews: 1800, price: "$",   highlights: "open until 4am, real late-night Cuban food, where locals go after clubs, dirt cheap and filling", warnings: "sparse atmosphere, cash only, not for a date", mustOrder: "carne asada, rice and beans, Cuban bread" },
  { id: 87, name: "The Salty Donut",               cuisine: "Dessert",        neighborhood: "Wynwood",          city: "Miami",      rating: 4.5, reviews: 3100, price: "$",   highlights: "Miami's most Instagram-famous donuts, creative artisan flavors, great coffee too", warnings: "sells out fast on weekends, lines can be long", mustOrder: "brown butter and salt, maple bacon, rotating seasonal" },
  { id: 88, name: "Kyu Tokyo",                     cuisine: "Japanese",       neighborhood: "Tokyo/Miami",      city: "Miami",      rating: 4.4, reviews: 1100, price: "$$$",  highlights: "sister restaurant to Wynwood's KYU, same excellent wood-fired cooking, great sake selection", warnings: "hard to get reservations, expensive", mustOrder: "wood-roasted broccoli, pork ribs, black cod" },

  // ── SOUTH MIAMI / PINECREST ─────────────────────────────────────────────────
  { id: 89, name: "Pinecrest Bakery",               cuisine: "Cuban/Bakery",   neighborhood: "South Miami",      city: "Miami",      rating: 4.3, reviews: 2200, price: "$",   highlights: "South Miami institution, excellent Cuban pastries and coffee, great breakfast, locals only vibe", warnings: "cash preferred, nothing fancy", mustOrder: "pastelitos, Cuban coffee, croquetas" },
  { id: 90, name: "Talavera Cocina Mexicana",       cuisine: "Mexican",        neighborhood: "South Miami",      city: "Miami",      rating: 4.4, reviews: 1700, price: "$$$",  highlights: "upscale Mexican in Coral Gables area, excellent tableside guacamole, great margaritas, romantic setting", warnings: "pricey for Mexican food, reservations recommended", mustOrder: "tableside guac, carne asada, churros" },
];

// Search function - finds relevant restaurants based on query
function searchRestaurants(query, limit = 8) {
  const q = query.toLowerCase();
  const scored = MIAMI_RESTAURANTS.map(r => {
    let score = 0;
    const searchText = `${r.name} ${r.cuisine} ${r.neighborhood} ${r.city} ${r.highlights} ${r.mustOrder}`.toLowerCase();
    
    // Direct name match - highest priority
    if (r.name.toLowerCase().includes(q)) score += 10;
    
    // Cuisine match
    const cuisineKeywords = {
      'asian': ['japanese','thai','vietnamese','korean','chinese','asian'],
      'japanese': ['japanese','sushi','omakase'],
      'thai': ['thai'],
      'vietnamese': ['vietnamese'],
      'korean': ['korean'],
      'chinese': ['chinese'],
      'cuban': ['cuban'],
      'seafood': ['seafood','fish','crab','stone crab'],
      'italian': ['italian'],
      'mexican': ['mexican','tacos','taqueria'],
      'american': ['american','burger','brunch'],
      'sushi': ['japanese','sushi'],
      'brunch': ['brunch','breakfast','café'],
      'steak': ['steakhouse','steak'],
      'bbq': ['bbq','barbecue'],
      'dessert': ['dessert','donut','ice cream','bakery'],
      'late night': ['late night','24 hour','open late'],
      'rooftop': ['rooftop','views','skyline'],
    };
    
    for (const [key, terms] of Object.entries(cuisineKeywords)) {
      if (q.includes(key) && terms.some(t => r.cuisine.toLowerCase().includes(t))) {
        score += 5;
      }
    }
    
    // Neighborhood match
    if (q.includes('south beach') && r.neighborhood.toLowerCase().includes('south beach')) score += 5;
    if (q.includes('wynwood') && r.neighborhood.toLowerCase().includes('wynwood')) score += 5;
    if (q.includes('brickell') && r.neighborhood.toLowerCase().includes('brickell')) score += 5;
    if (q.includes('little havana') && r.neighborhood.toLowerCase().includes('little havana')) score += 5;
    if (q.includes('coconut grove') && r.neighborhood.toLowerCase().includes('coconut grove')) score += 5;
    if (q.includes('coral gables') && r.neighborhood.toLowerCase().includes('coral gables')) score += 5;
    if (q.includes('fort lauderdale') && r.city.toLowerCase().includes('fort lauderdale')) score += 5;
    if (q.includes('broward') && ['fort lauderdale','hollywood','aventura'].some(c => r.city.toLowerCase().includes(c))) score += 4;
    
    // General keyword match in searchText
    q.split(' ').forEach(word => {
      if (word.length > 3 && searchText.includes(word)) score += 1;
    });
    
    // Boost high-rated places
    if (r.rating >= 4.5) score += 1;
    
    return { ...r, score };
  });
  
  return scored
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score || b.rating - a.rating)
    .slice(0, limit);
}

// Format restaurants for AI context injection
function formatForContext(restaurants) {
  if (!restaurants.length) return '';
  return restaurants.map(r => 
    `• ${r.name} (${r.cuisine}, ${r.neighborhood}, ${r.city}) — ${r.rating}★ (${r.reviews.toLocaleString()} reviews), ${r.price}. Known for: ${r.highlights}. Must order: ${r.mustOrder}. Watch out: ${r.warnings}.`
  ).join('\n');
}

module.exports = { searchRestaurants, formatForContext, MIAMI_RESTAURANTS };
