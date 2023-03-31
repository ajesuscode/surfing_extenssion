# French Basque Country Surfspots Chrome Extension

This is a Chrome extension that provides surf spots surfing conditions in the French Basque Country. The extension displays a list of hardcoded surf spots. You can hardcode your own spots or contribute to create an open and free surfspots database.

## UPDATE!!! ChatGPT API Call with Futurama Character Responses

In addition to providing surf spots and conditions, this extension now also includes a ChatGPT API call feature with responses from characters of the popular TV show "Futurama".

Please note that this feature is still in beta and responses may not always be accurate or appropriate. We welcome any feedback and suggestions for improvement. Enjoy the waves and the conversation!

![Basque Surf Extension](https://github.com/ajesuscode/surfing_extenssion/blob/main/Screenshot%202023-03-31%20at%2022.17.41.png)

## Installation

To install the extension, follow these steps:

1. Download the code from GitHub and run build command.
2. Open Google Chrome and navigate to chrome://extensions.
3. Turn on Developer Mode by clicking the toggle switch in the top right corner of the screen.
4. Click on "Load unpacked" and select the build folder.
5. The extension should now be installed and ready to use.

Before you can use this extension, you need to go to [World Weather Online](https://www.worldweatheronline.com/) and create an API key. Once you have your API key, create a `.env` file in the root directory of the project and paste your key there.

Example: API_KEY=your_api_key_here

## openai API update

To have a working chatGPT responses:

1. Clone repo
2. Add to .env file an openai API key
3. Change a System Message to your custom response (will work on more user friendlysolution)
4. Run build

## Usage

Once the extension is installed and you have your API key set up, click on the icon in the toolbar to open the list of surf spots. Click on a spot to see the surfing conditions.

## Contributing

Extenssion is personal educational project and still in development.
If you would like to contribute to the development of the extension or leave a feedback, feel free to submit a pull request on GitHub. Any contributions are greatly appreciated!
Surfs Up!
