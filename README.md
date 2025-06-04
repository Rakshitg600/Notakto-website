# Notakto

## :question: What is Notakto?

**Notakto** is a [**misère and impartial form of tic-tac-toe**][1]. Also known as reverse tic-tac-toe, this variant turns the normal rules of tic-tac-toe on their head. It uses [misère rules][3], which means if you line up three marks in a row, you _lose_. And it's impartial, so both players use **X** and play on one to more grids, or boards. This turns tic-tac-toe into a **strategic zero-sum game**—like [**misère Nim**][2].

## :gear: Game Mechanics

In this implementation of notakto:

* You can play on one to five boards
* Boards can be between 2x2 and 5x5 cells
* The player that completes a row, a column, or the diagonal _loses_ that board.
* Boards with a complete row, column, or diagonal are inactivated—they become a "dead" board.

For example, to play a game with three 3x3 boards:

1. Player one puts an **X** in any position on any board.
1. Player two puts an **X** in any other position on any board.
1. Each player continues putting **X**s until they complete a row, a column, or the diagonal in a single board. That board is complete—players can't place any more **X**s there.
1. The players continue completing boards. _The player that completes the final board loses_.

 Watch the following GIF to see an example game. In the final screen, Player 1 wins because Player 2 completes the final board.

![A GIF of two players playing a three board notakto game.](./assets/images/notakto-example-ezgif.gif)

## :video_game: Game Modes

You can play the game in three modes:

* **Single Player**: Play against AI with five difficulty levels.
* **Two Player (Local)**: Play with a friend on the same device.
* **Live Multiplayer**: Play against other in real-time matches over WebSocket.

## :brain: AI Engine

* Uses **center-weighted heuristics** and **misère Nim strategy**.
* Implements perfect play logic at level 5.
* Easier difficulties add randomness to mimic mistakes.

### 🛍️ In-Game Economy

* **Coins** – Earned only by winning. Used for power-ups.
* **XP** – Earned by playing, even on losses. Used for leaderboards.

---

### 🪄 Power-ups

* **Undo Move**
* **Skip Move**

---

### 🌐 Multiplayer (Live Mode)

* Built using `socket.io-client` on the client and Socket.IO on the server.
* Server pairs players, manages rooms, synchronizes moves, and handles disconnects.
* Win conditions are checked on the server using classic Tic Tac Toe pattern checks.

---

### 💾 State Management

* Uses **Zustand** for clean separation

---

### 🔒 Authentication & Database

* Initially used Firebase for:

  * Google Auth
  * Cloud Firestore (coin, XP sync)

---

### 💸 Payments

* Coinbase Commerce integration for buying coins with crypto.

---

### 🎨 UI/UX

* **Retro 8-bit theme**
* Nostalgic sound effects
* Mobile-friendly interface
* Game board animation and interaction built for both mouse and touch

---

### 🚀 Future Features (Planned)

1. Global leaderboard (XP-based)
2. Friend list and “Play with Friends” mode
3. Ads integration with remove-ad purchase
4. Crash analytics, logging, and user tracking
5. GitOps-style CI/CD for auto-deploy
6. Automated test scripts

---

### Reference PPT
https://drive.google.com/file/d/1QHrSHDZumgNIxZhbl5kNWiP2y36SjO0U/view

[1]: https://en.wikipedia.org/wiki/Tic-tac-toe_variants
[2]: https://www.hackerrank.com/challenges/misere-nim-1/problem
[3]: https://en.wikipedia.org/wiki/Mis%C3%A8re
