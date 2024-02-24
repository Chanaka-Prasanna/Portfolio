export function lightenHexColor(hexColor: string, percentage: number): string {
  // Remove '#' symbol if present
  const sanitizedHexColor = hexColor.replace(/^#/, "");

  // Ensure the percentage is within the valid range (0 to 100)
  const validPercentage = Math.min(100, Math.max(0, percentage));

  // Convert hex to RGB
  const bigint = parseInt(sanitizedHexColor, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;

  // Calculate the lightened color
  const newRed = red + (255 - red) * (validPercentage / 100);
  const newGreen = green + (255 - green) * (validPercentage / 100);
  const newBlue = blue + (255 - blue) * (validPercentage / 100);

  // Convert the new RGB values back to hex
  const newHexColor =
    "#" +
    Math.round(newRed).toString(16).padStart(2, "0") +
    Math.round(newGreen).toString(16).padStart(2, "0") +
    Math.round(newBlue).toString(16).padStart(2, "0");

  return newHexColor;
}
