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

1. In this repository's root folder, install the `npm` dependencies from the [`package.json`] file.

    ```console
    npm install
    ```

1. Run the app in the `dev` environment.

    ```console
    npm run dev
    ```

> [!NOTE]
> To check changes to **Live Match** features, run the `Socket.IO` server separately:
>
> ```bash
> cd notakto-socket-server
> npm install
> node livematch.js
> ```

---

## 📦 Project Structure Overview

```
src/
├── app/                   # Next.js route-based pages (vsComputer, vsPlayer, liveMatch)
├── modals/                # Modal components for UI flows
├── services/              # Core logic, AI engine, Zustand store, Firebase, etc.
├── notakto-socket-server/
├── livematch.js/          # Socket.IO live multiplayer server (Node.js)
```

---

## 🧪 Testing

We use **Jest** and **React Testing Library**.

Run all tests:

```bash
npm run test
```

Check coverage:

```bash
npm run test -- --coverage
```

---

## 📁 Contribution Ideas

You can help in many ways:

* 📄 Improve documentation
* 🧠 Optimize AI or game logic
* 💬 Enhance UI/UX (modals, layout, gameboard)
* 🧪 Write or improve test coverage
* 🐛 Fix bugs or handle edge cases
* 🐳 Dockerize app and improve deployment setup

Check the [issues](https://github.com/rakshitg600/notakto-website/issues) tab and milestones for open tasks.

---

## 🧹 Code Style & Guidelines

* Format code with **Prettier**
* Check with `npm run lint` before commits
* Use **TypeScript** — avoid `any`
* Use `camelCase` for variables and `PascalCase` for components
* Favor functional components with hooks
* Keep logic modular and reusable (see `services/` folder)

---

## 🔧 Zustand & Services

* Use separate Zustand stores for coins, XP, player, game, modals, etc.
* Try to reuse logic from `services/logic.ts` and `ai.ts` wherever possible

---

## 🐳 Docker (WIP)

We're adding Docker support!

Steps:

1. Dockerize the Next.js frontend
2. Use `docker-compose` to include both frontend and socket server
3. Update `CONTRIBUTING.md` and related docs

Track progress: [#DOCKERIZE](https://github.com/Rakshitg600/notakto-website/issues/13)

---

## 🙋 We're Happy to Help

Please don’t hesitate to ask questions — seriously. Whether you need help setting up, understanding a file, raising an issue, or fixing a bug — you’re absolutely welcome to reach out.

> I (the maintainer) am genuinely flattered that you're here. I don’t expect you to understand everything at once, and I’m more than happy to explain anything, support you, or help you get started.

If something is confusing, that’s a sign we need to improve it — feel free to open a discussion or comment anywhere.

---

Thanks again for being part of Notakto 🎮

[1]: ./FIRST_PR.md
[2]: https://docs.github.com/en/get-started/using-github/github-flow
[3]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches
