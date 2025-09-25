const letters = ["A", "B", "C", "D", "E", "F"];
const sizes = [
  "Testing grounds",
  "Small  (2 ships)",
  "Medium (3 ships)",
  "Large  (4 ships)",
];
const victoryText = `========
__   _______ _   _   _    _ _____ _   _
\\ \\ / /  _  | | | | | |  | |_   _| \\ | |
 \\ V /| | | | | | | | |  | | | | |  \\| |
  \\ / | | | | | | | | |/\\| | | | | . ' |
  | | \\ \\_/ / |_| | \\  /\\  /_| |_| |\\  |
  \\_/  \\___/ \\___/   \\/  \\/ \\___/\\_| \\_/
========`;

const trainingStartText =
  "It is indeed wise to want to confirm the accuracy of our weaponry and locational technology.\nThese are the expected ship sizes one would see hidden in the waters.";
const trainingEndText =
  "The targeting system seems to work as intended. Remember these 2 types of ships.\n";

module.exports = {
  letters,
  sizes,
  victoryText,
  trainingStartText,
  trainingEndText,
};
