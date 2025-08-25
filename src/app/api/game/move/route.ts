import { NextRequest, NextResponse } from 'next/server';
import { isBoardDead, updateBoards, findBestMove } from '@/services/ai';
import { calculateRewards } from '@/services/economyUtils';
import { gameSessions } from '@/lib/game-sessions';
import { db } from './db';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, boardIndex, cellIndex } = await request.json();
    const gameState = gameSessions.get(sessionId);
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const idToken = authHeader.split("Bearer ")[1];
    if (!gameState) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Validate move
    if (gameState.boards[boardIndex][cellIndex] !== '' ||
      isBoardDead(gameState.boards[boardIndex], gameState.boardSize)) {
      return NextResponse.json({ error: 'Invalid move' }, { status: 400 });
    }

    // Update boards
    const newBoards = updateBoards(gameState.boards, { boardIndex, cellIndex });
    gameState.boards = newBoards;
    gameState.gameHistory.push(newBoards);

    // Check for game end
    if (newBoards.every(board => isBoardDead(board, gameState.boardSize))) {
      const loser = gameState.currentPlayer as 1 | 2;
      const winner = loser === 1 ? 2 : 1;
      const isHumanWinner = winner === 1;
      const rewards = calculateRewards(isHumanWinner, gameState.difficulty,
        gameState.numberOfBoards, gameState.boardSize);

      gameState.winner = winner === 1 ? "You" : "Computer";
      const update=db(idToken,rewards.coins,rewards.xp);
      gameSessions.set(sessionId, gameState);
      return NextResponse.json({
        success: true,
        gameState,
        gameOver: true
      });
    }

    // Switch player
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;

    // If it's AI's turn, make AI move
    if (gameState.currentPlayer === 2) {
      const move = findBestMove(
        gameState.boards,
        gameState.difficulty,
        gameState.boardSize,
        gameState.numberOfBoards
      );

      if (move) {
        const aiBoards = updateBoards(gameState.boards, move);
        gameState.boards = aiBoards;
        gameState.gameHistory.push(aiBoards);

        // Check for game end after AI move
        if (aiBoards.every(board => isBoardDead(board, gameState.boardSize))) {
          const loser = gameState.currentPlayer as 1 | 2;
          const winner = loser === 1 ? 2 : 1;
          const isHumanWinner = winner === 1;
          const rewards = calculateRewards(isHumanWinner, gameState.difficulty,
            gameState.numberOfBoards, gameState.boardSize);

          gameState.winner = winner === 1 ? "You" : "Computer";

          gameSessions.set(sessionId, gameState);
          return NextResponse.json({
            success: true,
            gameState,
            gameOver: true
          });
        }
        gameState.currentPlayer = 1;
      }
    }

    gameSessions.set(sessionId, gameState);
    return NextResponse.json({ success: true, gameState });
  } catch (error) {
    console.error('Move error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}