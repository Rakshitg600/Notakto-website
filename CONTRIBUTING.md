# :handshake: Contributing to Notakto

Welcome, and thank you for contributing to **Notakto**. Notakto is a nostalgic, strategy-focused variant of tic-tac-toe with multiplayer, AI, and an in-game economy.

If this is your first time contributing to an open source project, see [Your First Pull Request][1].

## :hammer_and_wrench: Pull Request Process

This repository uses the [GitHub flow][2] workflow. It uses [forks][3] and [branches][4] for an easy-to-follow collaborating experience.

1. Ask a repository maintainer to assign you to an issue. The issue can be an existing one, or you can create a new issue to address your proposed changes.
1. Make all changes to a `feature` branch in your forked repository.
1. Update the `README.md` file or appropriate files in the `docs` folder with your change's details.
1. Create a pull request with a description of what you changed and why you changed it.
1. After a reviewer approves and merges your pull request, delete the feature branch from this repository.

Always run the project's automated tests and check your changes in the app before you create a pull request.

### Run Automated Tests

To run the project's automated tests, run the following command:

```console
npm run test
```

All tests must pass before you create a pull request.

### Check Your Changes in the App

To check your changes in the app:

1. Download [Docker Desktop][11] and run the program to start Docker Engine.
1. Open a terminal window in the project's root folder.
1. Run the following command to build the app:

    ```console
    docker compose up --build
    ```

This command builds the web frontend and the socket server. Then it starts the app service on port `3000` and the server on port `8000`. To access the app, go to [http://localhost:3000][6].

## :package: Project Structure Overview

The project has the following structure:

```text
src/
├── app/                   # Next.js route-based pages (vsComputer, vsPlayer, liveMatch)
├── modals/                # Modal components for UI flows
├── services/              # Core logic, AI engine, Zustand store, Firebase, etc.
notakto-socket-server/
├── livematch.js/          # Socket.IO live multiplayer server (Node.js)
```

## :test_tube: Automated tests

This project uses [Jest][7] and [React Testing Library][8] for automated testing.

To run all the project's tests:

```bash
npm run test
```

To check the project's test coverage:

```bash
npm run test -- --coverage
```

## :bulb: Contribution Ideas

You can help in many ways:

* :books: Improve documentation
* :brain: Optimize AI or game logic
* :speech_balloon: Enhance UI/UX (modals, layout, gameboard)
* :test_tube: Write or improve test coverage
* :bug: Fix bugs or handle edge cases

Check the [issues][9] tab and milestones for open tasks.

## :broom: Code Style & Guidelines

Follow these guidelines as you make your changes:

* Format your code with **Prettier**
* Check your formatting with `npm run lint` before you add a new commit
* Use **TypeScript** code only
* Avoid using the `any` type
* Use `camelCase` for variables and `PascalCase` for components
* Favor functional components with hooks
* Keep logic modular and reusable—for example, see the `services/` folder
* Use separate Zustand stores for coins, XP, player, game, and modals
* Reuse logic from `services/logic.ts` and `ai.ts` wherever possible

## :raising_hand: We're Happy to Help

Don’t hesitate to ask questions, whether you need help setting up, understanding a file, raising an issue, or fixing a bug. You’re absolutely welcome to reach out.

> I (the maintainer) am genuinely flattered that you're here. I don’t expect you to understand everything at once, and I’m more than happy to explain anything, support you, or help you get started.

If something is confusing, that’s a sign we need to improve it—feel free to open a discussion or comment anywhere.

Thanks again for being part of Notakto! :video_game:

[1]: ./FIRST_PR.md
[2]: https://docs.github.com/en/get-started/using-github/github-flow
[3]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches
[5]: ./package.json
[6]: https://localhost:3000
[7]: https://jestjs.io/
[8]: https://testing-library.com/docs/react-testing-library/intro/
[9]: https://github.com/rakshitg600/notakto-website/issues
[10]: https://github.com/Rakshitg600/notakto-website/issues/13
[11]: https://docs.docker.com/desktop/

