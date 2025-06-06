# 🤝 Contributing to Notakto

Welcome, and thank you for contributing to **Notakto**. Notakto is a nostalgic, strategy-focused variant of tic-tac-toe with multiplayer, AI, and an in-game economy.

If this is your first time contributing to an open source project, see the [first PR guide][1].

## 🛠️ Pull Request Process

This repository uses the [GitHub flow][2] workflow. It uses [forks][3] and [branches][4] for an easy-to-follow collaborating experience.

1. Make all changes to a `feature` branch in your forked repository.
1. Update the `README.md` file or appropriate files in the `docs` folder with your change's details.
1. Create a pull request with a description of what you changed and why you changed it.
1. After a reviewer approves and merges your pull request, delete the feature branch from this repository.

Always check your changes in the app before you create a pull request.

To check your changes in the app:

1. In this repository's root folder, install the `npm` dependencies from the [`package.json`][5] file.

    ```console
    npm ci
    ```

1. Run the app in the `dev` environment.

    ```console
    npm run dev
    ```

1. Go to [localhost:3000][6] to see the changes.

> [!NOTE]
> To check changes to **Live Match** features, run the `Socket.IO` server separately:
>
> ```bash
> cd notakto-socket-server
> npm ci
> node livematch.js
> ```


## 📦 Project Structure Overview

The project has the following structure:

```text
src/
├── app/                   # Next.js route-based pages (vsComputer, vsPlayer, liveMatch)
├── modals/                # Modal components for UI flows
├── services/              # Core logic, AI engine, Zustand store, Firebase, etc.
├── notakto-socket-server/ # Live Match server package
├── livematch.js/          # Socket.IO live multiplayer server (Node.js)
```

## 🧪 Testing

This project uses [Jest][7] and [React Testing Library][8] for automated testing.

To run all tests:

```bash
npm run test
```

To check the project's test coverage:

```bash
npm run test -- --coverage
```

## 📁 Contribution Ideas

You can help in many ways:

* 📄 Improve documentation
* 🧠 Optimize AI or game logic
* 💬 Enhance UI/UX (modals, layout, gameboard)
* 🧪 Write or improve test coverage
* 🐛 Fix bugs or handle edge cases
* 🐳 Dockerize app and improve deployment setup

Check the [issues][9] tab and milestones for open tasks.

## 🧹 Code Style & Guidelines

Follow these guidelines as you make your changes:

* Format code with **Prettier**
* Check with `npm run lint` before you add a new commit
* Use **TypeScript** only
* Avoid using the `any` type
* Use `camelCase` for variables and `PascalCase` for components
* Favor functional components with hooks
* Keep logic modular and reusable—for example, see the `services/` folder
* Use separate Zustand stores for coins, XP, player, game, modals, etc.
* Reuse logic from `services/logic.ts` and `ai.ts` wherever possible

## 🐳 Docker (WIP)

We're adding Docker support!

To add Docker support, contributors must:

1. Dockerize the Next.js frontend
2. Use `docker-compose` to include both frontend and socket server
3. Update `CONTRIBUTING.md` and related docs

You can track the Docker support progress from the [Dockerize Full Notakto App][10] issue.

## 🙋 We're Happy to Help

Please don’t hesitate to ask questions. Whether you need help setting up, understanding a file, raising an issue, or fixing a bug—you’re absolutely welcome to reach out.

> I (the maintainer) am genuinely flattered that you're here. I don’t expect you to understand everything at once, and I’m more than happy to explain anything, support you, or help you get started.

If something is confusing, that’s a sign we need to improve it—feel free to open a discussion or comment anywhere.

Thanks again for being part of Notakto 🎮

[1]: ./FIRST_PR.md
[2]: https://docs.github.com/en/get-started/using-github/github-flow
[3]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches
[5]: ./package.json
[6]: localhost:3000
[7]: https://jestjs.io/
[8]: https://testing-library.com/docs/react-testing-library/intro/
[9]: https://github.com/rakshitg600/notakto-website/issues
[10]: https://github.com/Rakshitg600/notakto-website/issues/13
