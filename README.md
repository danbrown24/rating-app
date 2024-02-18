# Cross-platform ratings app (iOS, Android, Web)

Do you find yourself ordering food from that restaurant you tried once only to rediscover why you don't there more often? You remember seeing that film, but can't quite remember if it was good enough for a rewatch? That TV show sounds familiar - was that the one with thingamajig that you loved, or that other one with whochamacallit that you hated?

Sounds like you need a personal ratings app to keep track of what you love, and what you don't!

Having used React Native extensively for iOS and Android development, this was mostly a test of using the `react-native-web` package to extend support to web via the same codebase.

I used [Infinite Red's excellent React Native boilerplate](https://github.com/infinitered/ignite) as a starting point for an Expo Go project. The backend is powered by Firebase.


## Quick Start

```
pnpm install
```

Add your Firebase project config to `.env` (or add a `.env.local`):

```
EXPO_PUBLIC_FIREBASE_CONFIG=<Your stringified Firebase config>
```
Then
```
pnpm start
```

## Tech stack

| Library           | Category                            | Version |
| ----------------- | ----------------------------------- | ------- |
| React Native      | Mobile Framework                    | v0.73   |
| React             | UI Framework                        | v18     |
| TypeScript        | Language                            | v5      |
| React Navigation  | Navigation                          | v6      |
| MobX-State-Tree   | State Management                    | v5      |
| MobX-React-Lite   | React Integration                   | v3      |
| Expo              | SDK                                 | v50     |
| Jest              | Test Runner                         | v26     |
| Firebase JS SDK   | Web client for Firebase backend     | v10     |

## Conclusions

Debugger support in React Native 0.73 appears to be broken, with breakpoints being extremely unreliable. This was somewhat infuriating, and I would downgrade to a working version for a new project, until this gets fixed.

The `react-native-web` package does a pretty good job of adding a web target to the mobile framework. I found it a bit janky at times though, with a few issues:

 - Debugger support doesn't appear to be working here for TS/sourcemaps - only the transpiled full JS bundle is available in the web inspector.
 - Only a subset of RN libraries are supported. Most of the [base RN components are supported](https://necolas.github.io/react-native-web/docs/react-native-compatibility/#components), but third-party libraries with official web support are few and far between.
 - The Native Stack Navigator only has basic support for web; for example full-page modals as part of the navigation flow are out (or at least you'll need to implement a custom modal solution for web).

However if you're willing to make some compromises on design & UX for mobile and web compatibility and are okay living with a less-rich pot of usable UI plugins, then it seems like a good option for code sharing between mobile and web.