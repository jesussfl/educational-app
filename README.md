![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

### Finex - Financial Education App

[![Expo Version](https://img.shields.io/badge/expo-v49.0.5-blue)](https://expo.dev)
[![Alpha Release](https://img.shields.io/badge/release-alpha-yellow)](https://github.com/yourusername/finex)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)](https://github.com/yourusername/finex)

## Tech Stack

**Client:** Expo, React Native, Zustand, Tanstack Query

**Server:** NodeJS, Strapi, Graphql

# Makes financial education fun and engaging for kids and teens.

## FAQ

### What is Finex?

Finex is an innovative mobile application designed to provide a unique educational experience in financial education aimed at children and adolescents.

Inspired by the success of educational platforms like Duolingo, Mimo, Busuu, and others, this app adopts a playful and gamified approach to teach essential financial concepts in a fun and accessible way.

### How does Finex work?

Finex operates as a mobile application designed to provide a fun and educational experience in financial literacy for children and adolescents. All content within the app is managed and loaded exclusively through the Strapi client. You can find the Strapi client repository [here](link-to-strapi-client-repo).

### What is the goal of Finex?

With an attractive visual design, quality educational content, and a captivating user experience, Finex aims to become the ultimate tool for teaching financial education effectively and engagingly to younger generations.

### Who is the target audience for Finex?

The app is targeted at an audience aged 8 to 16.

### How is Finex structured?

Finex is structured in the form of worlds, sections, and levels, with each level presenting a variety of interactive exercises such as completing simple selections, card memory games, and matching pairs.

### What are the interactive exercises like?

These activities are specifically designed to encourage active learning and knowledge retention while promoting a gaming environment that motivates users to keep progressing.

## Features

- **User Login Module**
- **User Registration Module**
- **Thematic Worlds**
- **World Sections**
- **Lessons**
- - **Exercises**: Various types of exercises to evaluate user learning, including:
  - **Theory**: A voice assistant reads a pre-placed text supported by images. Other exercises are based on this theory.
  - **Completion**: Fill in the blanks with the correct words.
  - **Simple Selection**: Choose the correct answer from several options.
  - **Pairing**: Select related or identical options, which can be images or texts.
  - **Memory**: Memorize card positions and select pairs after 5 seconds.
- **User Profile**
- **Life Regeneration**
- **Streak System**
- **Coins for Unlocking Lessons**
- **Shop**
- **Maximum Streak Protectors**

## Getting Started

The following sections provide instructions to build and run the app for development purposes.

### Prerequisites

#### NodeJS

To run the project you need to install the correct version of NodeJS.
We recommend the use of a virtual environment of your choice. For ease of use, this guide adopts [nodenv](https://github.com/nodenv/nodenv) for NodeJS,

The node version used in this project is stored in [.node-version](.node-version).

### Expo

Follow the [official tutorial](https://docs.expo.dev/get-started/introduction/) for installing the `Expo CLI` for your operating system.

If you have a macOS system, you can follow both the tutorial for iOS and for Android. If you have a Linux or Windows system, you need only to install the development environment for Android.

```bash

```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Environment Variables

The project utilizes environment variables to configure various aspects of its operation. Below are explanations for each of these variables:

- `EXPO_PUBLIC_API_URL`: Defines the URL of the public Strapi API used in the application. Make sure to configure this variable with the correct URL of your Strapi instance.

- `EXPO_PUBLIC_STRAPI_API_KEY`: This is the authorization token (Bearer token) required to authenticate with the Strapi API. Ensure this token is valid and up-to-date to make requests to the Strapi API from the application.

- `EXPO_PUBLIC_AUTH_TOKEN`: Authentication token used to authorize access to certain functionalities or services within the application.

- `EXPO_PUBLIC_RESEND_API_KEY`: API key used for performing certain operations related to send emails with Resend.

## Run the app

### Android Emulator

An Android Emulator must be [created and launched manually](https://developer.android.com/studio/run/managing-avds).
Then, from your command line, run these commands:

```bash
# Perform the port forwarding
$ adb reverse tcp:8081 tcp:8081;adb reverse tcp:3000 tcp:3000;adb reverse tcp:9090 tcp:9090

# Run Android build
$ yarn run-android
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

For support, email jesussflr@gmail.com.
