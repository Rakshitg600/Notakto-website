'use client'
import { useState, useEffect } from 'react';

// Components
import Menu from './components/Menu';
import Game from './components/Game';
import TutorialModal from './components/modals/TutorialModal';
import PlayerNamesModal from './components/modals/PlayerNamesModal';
import WinnerModal from './components/modals/WinnerModal';
import BoardConfigModal from './components/modals/BoardConfigModal';
import DifficultyModal from './components/modals/DifficultyModal';

// Services, styles, etc.
import { findBestMove } from '../services/ai';
import { calculateRewards } from '../services/economyUtils';
import type { BoardState, GameMode, DifficultyLevel, BoardSize } from '../services/types';
import { useCoins, useXP } from '../services/store';
import { playMoveSound, playWinSound, initBackgroundMusic, toggleBackgroundMusic, stopBackgroundMusic } from '../services/sounds';

// Firebase module
import { signInWithGoogle, signOutUser, onAuthStateChangedListener, saveEconomyToFirestore, loadEconomyFromFirestore } from '../services/firebase';

export default function Home() {
  // Game State
  const [boards, setBoards] = useState<BoardState[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [gameHistory, setGameHistory] = useState<BoardState[][]>([]);
  const [numberOfBoards, setNumberOfBoards] = useState(3);
  const [boardSize, setBoardSize] = useState<BoardSize>(3);
  const [showBoardConfig, setShowBoardConfig] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(1);
  const [showDifficultyModal, setShowDifficultyModal] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Economy State
  const { coins, setCoins } = useCoins();
  const { XP, setXP } = useXP();

  // Player State
  const [player1Name, setPlayer1Name] = useState<string>('Player 1');
  const [player2Name, setPlayer2Name] = useState<string>('Player 2');

  // Modal States
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');

  // Auth user
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    initBackgroundMusic(mute);
  
    return () => {
      stopBackgroundMusic();
    };
  }, []);
  
  useEffect(() => {
    toggleBackgroundMusic(mute);
  }, [mute]);
  
  // Reset game when board configuration changes
  useEffect(() => {
    resetGame(numberOfBoards, boardSize);
  }, [numberOfBoards, boardSize]);


  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (usr) => {
      setUser(usr);
      if (usr) {
        const cloudData = await loadEconomyFromFirestore(usr.uid) as { coins?: number; XP?: number };
        if (cloudData) {
          setCoins(cloudData.coins ?? 1000);
          setXP(cloudData.XP ?? 0);
        } else {
          setCoins(1000);
          setXP(0);
        }
        setDataLoaded(true); // Mark data as loaded
      } else {
        setCoins(1000);
        setXP(0);
        setDataLoaded(false); // Reset when user signs out
      }
    });
    return () => unsubscribe();
  }, []);
  
  // Save economy data only if data is loaded and user is signed in
  useEffect(() => {
    if (user && dataLoaded) {
      saveEconomyToFirestore(user.uid, coins, XP);
    }
  }, [coins, XP, user, dataLoaded]);

  // AI Move Handler
  useEffect(() => {
    if (gameMode === 'vsComputer' && currentPlayer === 2) {
      const timeout = setTimeout(() => {
        try {
          const move = findBestMove(boards, difficulty, boardSize, numberOfBoards);
          if (move) {
            handleMove(move.boardIndex, move.cellIndex);
          }
        } catch (error) {
          console.error("Error finding the best move:", error);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, gameMode, boards, difficulty, boardSize, numberOfBoards]);


  // Game logic functions (unchanged)
  const isBoardDead = (board: BoardState) => {
    const size = boardSize;
    for (let i = 0; i < size; i++) {
      const row = board.slice(i * size, (i + 1) * size);
      const col = Array.from({ length: size }, (_, j) => board[i + j * size]);
      if (row.every(c => c === 'X') || col.every(c => c === 'X')) return true;
    }
    const diag1 = Array.from({ length: size }, (_, i) => board[i * (size + 1)]);
    const diag2 = Array.from({ length: size }, (_, i) => board[(i + 1) * (size - 1)]);
    return diag1.every(c => c === 'X') || diag2.every(c => c === 'X');
  };

  const handleMove = (boardIndex: number, cellIndex: number) => {
    if (boards[boardIndex][cellIndex] !== '' || isBoardDead(boards[boardIndex])) return;

    const newBoards = boards.map((board, idx) =>
      idx === boardIndex ? [
        ...board.slice(0, cellIndex),
        'X',
        ...board.slice(cellIndex + 1)
      ] : [...board]
    );
    playMoveSound(mute);
    setBoards(newBoards);
    setGameHistory([...gameHistory, newBoards]);

    if (newBoards.every(board => isBoardDead(board))) {
      const loser = currentPlayer;
      const winner = loser === 1 ? 2 : 1;
      const isHumanWinner = gameMode === 'vsComputer' && winner === 1;
      const isComputerWinner = gameMode === 'vsComputer' && winner === 2;
      const rewards = calculateRewards(isHumanWinner, difficulty, numberOfBoards, boardSize);

      if (isHumanWinner) {
        setCoins(coins + rewards.coins);
        setXP(XP + rewards.xp);
      }
      if (isComputerWinner) {
        setXP(Math.round(XP + rewards.xp * 0.25));
      }
      const winnerName = winner === 1 ? player1Name : player2Name;
      setWinner(winnerName);
      setShowWinnerModal(true);
      playWinSound(mute);
      return;
    }

    setCurrentPlayer(prev => prev === 1 ? 2 : 1);
  };

  const resetGame = (num: number, size: BoardSize) => {
    const initialBoards = Array(num).fill(null).map(() => Array(size * size).fill(''));
    setBoards(initialBoards);
    setCurrentPlayer(1);
    setGameHistory([initialBoards]);
    setShowWinnerModal(false);
  };

  const handleBoardConfigChange = (num: number, size: number) => {
    setNumberOfBoards(Math.min(5, Math.max(1, num)));
    setBoardSize(size as BoardSize);
    setShowBoardConfig(false);
    resetGame(num, size as BoardSize);
  };

  const handleUndo = () => {
    if (gameHistory.length >= 3) {
      if (coins >= 100) {
        setCoins(coins - 100);
        setBoards(gameHistory[gameHistory.length - 3]);
        setGameHistory(h => h.slice(0, -2));
      } else {
        console.log('Insufficient Coins', 'You need at least 100 coins to undo!');
      }
    } else {
      console.log('No Moves', 'There are no moves to undo!');
    }
  };

  const handleSkip = () => {
    if (coins >= 200) {
      setCoins(coins - 200);
      setCurrentPlayer(prev => prev === 1 ? 2 : 1);
    } else {
      console.log('Insufficient Coins', 'You need at least 200 coins to skip a move!');
    }
  };

  // Authentication handlers
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Data loading handled by auth state listener
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setCoins(1000);
      setXP(0);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  return (
    <>
      <div className="flex-1 bg-gray-100">
        {gameMode ? (
          <Game
            currentPlayer={currentPlayer === 1 ? player1Name : player2Name}
            boards={boards}
            makeMove={handleMove}
            isBoardDead={isBoardDead}
            onUndo={handleUndo}
            undoMove={handleUndo}
            resetGame={() => resetGame(numberOfBoards, boardSize)}
            exitToMenu={() => { setGameMode(null); }}
            gameMode={gameMode}
            numberOfBoards={numberOfBoards}
            boardSize={boardSize}
            onBoardConfigPress={() => setShowBoardConfig(true)}
            difficulty={difficulty}
            onDifficultyPress={() => setShowDifficultyModal(true)}
            coins={coins}
            experience={XP}
            canUndo={coins >= 100}
            onResetNames={() => setShowNameModal(true)}
            gameHistoryLength={gameHistory.length}
            onSkip={handleSkip}
            canSkip={coins >= 200}
            toggleMute={() => setMute(!mute)}
            isMuted={mute}
            onAddCoins={(amount: number) => setCoins(coins + amount)}
          />
        ) : (
          <Menu
            startGame={(mode) => {
              if (mode === 'vsPlayer') setShowNameModal(true);
              else if (mode === 'vsComputer') {
                setPlayer1Name('You');
                setPlayer2Name('Computer');
              }
              setGameMode(mode);
              resetGame(numberOfBoards, boardSize);
            }}
            showTutorial={() => setShowTutorial(true)}
            signIn={handleSignIn}
            signOut={handleSignOut}
            signed={!!user}
            isMuted={mute}
            toggleMute={() => setMute(!mute)}
          />
        )}

        <TutorialModal visible={showTutorial} onClose={() => setShowTutorial(false)} />
        <PlayerNamesModal
          visible={showNameModal}
          onSubmit={(p1, p2) => {
            setPlayer1Name(p1 || 'Player 1');
            setPlayer2Name(p2 || 'Player 2');
            setShowNameModal(false);
          }}
          initialNames={[player1Name, player2Name]}
        />
        <WinnerModal
          visible={showWinnerModal}
          winner={winner}
          onPlayAgain={() => {
            setShowWinnerModal(false);
            resetGame(numberOfBoards, boardSize);
          }}
          onMenu={() => {
            setShowWinnerModal(false);
            setGameMode(null);
          }}
        />
        <BoardConfigModal
          visible={showBoardConfig}
          currentBoards={numberOfBoards}
          currentSize={boardSize}
          onConfirm={handleBoardConfigChange}
          onCancel={() => setShowBoardConfig(false)}
        />
        <DifficultyModal
          visible={showDifficultyModal}
          onSelect={(level) => {
            setDifficulty(level as DifficultyLevel);
            setShowDifficultyModal(false);
            resetGame(numberOfBoards, boardSize);
          }}
          onClose={() => setShowDifficultyModal(false)}
        />
      </div>

    </>
  )
}

