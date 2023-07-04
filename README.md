# Daltonize

🌈 Shift RGB values into colorblind-safe colors with ease! 🎨

## About

Daltonize is a library that helps designers and developers create colorblind-friendly designs. It provides a simple method to convert RGB values into colorblind-safe alternatives, ensuring better accessibility for individuals with color vision deficiencies.

## Installation

You can install Daltonize via npm:

```shell
npm install daltonize
```

## Usage
To use Daltonize, simply call the `daltonize` method and provide an array of three components (R, G, and B) representing the original color. The method will return a safer RGB value for use:

```typescript
const daltonize = require('daltonize');

const originalColor = [255, 0, 0]; // Red color
const colorblindSafeColor = daltonize.convert(originalColor);

console.log(`Original Color: ${originalColor}`);
console.log(`Colorblind-Safe Color: ${colorblindSafeColor}`);
```

## Contributing
🤝 Contributions are welcome! If you would like to contribute to Daltonize, please review our Contributing Guidelines for more information.

## License
📄 This project is licensed under the MIT License. For more information, please refer to the LICENSE.txt file in the root directory of this repository.