# :tada: Your First Pull Request

Welcome to **Notakto**! We're glad you're here and interested in contributing.

Whether you're fixing a bug, improving the UI, or adding a new feature—thank you for your time and interest!

## :ladder: Steps to Make Your First PR

This repository uses the [GitHub flow][1] workflow. It uses [forks][2] and [branches][3] for an easy-to-follow collaborating experience.

Follow these steps use the GitHub flow workflow to make your first contribution.

### 1. Fork and Clone the Repository

Fork the repository to your personal GitHub account. Then, clone your forked repository to your computer. This copy is where you make your proposed changes.

1. Go to the [notakto-website][4] repository.
1. Select **Fork**.
1. Select **Create fork**.
1. Open a terminal window and run the following command:

    ```console
    git clone https://github.com/YOUR_USERNAME/notakto-website.git
    ```

    This creates a copy of the repository on your computer.

1. In your terminal, run the following command go to the project's root folder:

    ```console
    cd notakto-website
    ```

### 2. Install Docker Desktop

[Docker Desktop][8] is a desktop application that makes it easy to start and manage Docker containers. This project uses Docker to streamline the build experience. It lets you run the app on your computer without worrying about any extra software infrastructure or prerequisites.

To install Docker Desktop:

1. Go to the [Docker Desktop product page][9].
1. Scroll to the bottom of the screen and select your operating system from the **Install Docker Desktop** box.
1. Follow the instructions to download the Docker Desktop application.

### 3. Create a Branch

Create a new branch for your new feature. A new branch keeps your changes separate from the "main" code in the `main` branch.

To create a new branch, run the following command:

```console
git checkout -b feature/MyNewFeature
```

### 4. Commit Your Changes

Make your changes and [commit][5] them.

To commit all your changes, run the following command:

```console
git commit -ma 'Add my new feature'
```

Commits keep track of the repository's change history. Follow these tips to keep commits clean and useful:

* Keep commits focused and meaningful. Each commit message should describe one change.
* Stick to this repository's coding style. To lint changed files, run the following command:

    ```console
    npm run lint
    ```

* Make sure your changes work with automated tests. To run the automated tests, run the following command:

    ```console
    npm run test
    ```

* See how your changes look in the app. To see your changes in the app:

    1. Start the Docker Desktop application if it's not already started. See [Install Docker Desktop](#install-docker-desktop) to learn more.
    1. In your terminal window, run the following command:

        ```console
        docker compose up --build
        ```

    1. Go to [localhost:3000][7].

    This command builds the web frontend and the socket server container. Then it starts the container service on port `3000` and the server on port `8000`.

    To stop the container service, do one of the following:

    * Go to the terminal where you ran the `docker compose` command and press `Ctrl+C`
    * In another terminal, go to the project's root folder and run the following command:

        ```console
        docker compose down
        ```

### 5. Push Your Branch and Open a Pull Request

Push your updated branch to your forked repository. Then open a pull request from this repository to merge your changes into the main code base.

1. Run the following command to push your branch to your forked repository:

    ```console
    git push -u origin feature/MyNewFeature
    ```

1. Go to the [notakto-website][4] repository.
1. Select **Compare & pull request**.
1. Add a description of your changes. Your description should include:

    * A summary of your changes
    * The problem that your changes aim to solve
    * Any references to existing issues

1. Select **Create pull request**.

A reviewer reviews your pull request. If they approve the request, they merge your changes into the project's `main` branch.

Congratulations, you've made your first contribution!

## :speech_balloon: Don't Hesitate to Ask

Don’t worry if anything seems confusing as you're getting started. If you're stuck on something, just ask!

> [!NOTE]
> We **don't** expect you to understand everything perfectly. In fact, your questions help us improve the project.

You’re always welcome to:

* Open a draft PR early
* Comment on an issue
* Ask for help setting up or fixing something
* Clarify anything technical or non-technical

We’re truly happy to help. Your interest itself means a lot. :blush:

Thanks again—and welcome aboard! :rocket:

[1]: https://docs.github.com/en/get-started/using-github/github-flow
[2]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks
[3]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches
[4]: https://github.com/Rakshitg600/notakto-website
[5]: https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits
[7]: http://localhost:3000
[8]: https://docs.docker.com/get-started/docker-overview/
[9]: https://docs.docker.com/desktop/
