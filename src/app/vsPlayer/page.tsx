'use client'

import { useState } from 'react';
import Board from '../components/Board';
import { BoardSize, BoardState } from '@/services/types';
import { isBoardDead } from '@/services/logic';
import { playMoveSound, playWinSound } from '@/services/sounds';
import { useMute } from '@/services/store';
import { useRouter } from 'next/navigation';
import PlayerNamesModal from '../components/modals/PlayerNamesModal';
import WinnerModal from '../components/modals/WinnerModal';
import BoardConfigModal from '../components/modals/BoardConfigModal';


const Game = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [boards, setBoards] = useState<BoardState[]>([]);
    const [boardSize, setBoardSize] = useState<BoardSize>(3);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [player1Name, setPlayer1Name] = useState<string>('Player 1');
    const [player2Name, setPlayer2Name] = useState<string>('Player 2');
    const [showNameModal, setShowNameModal] = useState<boolean>(true);
    const [winner, setWinner] = useState<string>('');
    const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
    const [numberOfBoards, setNumberOfBoards] = useState(3);
    const [showBoardConfig, setShowBoardConfig] = useState<boolean>(false);

    const mute = useMute((state) => state.mute);
    const setMute = useMute((state) => state.setMute);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const makeMove = (boardIndex: number, cellIndex: number) => {
        if (boards[boardIndex][cellIndex] !== '' || isBoardDead(boards[boardIndex], boardSize)) return;

        const newBoards = boards.map((board, idx) =>
            idx === boardIndex ? [
                ...board.slice(0, cellIndex),
                'X',
                ...board.slice(cellIndex + 1)
            ] : [...board]
        );
        playMoveSound(mute);
        setBoards(newBoards);

        if (newBoards.every(board => isBoardDead(board, boardSize))) {
            const loser = currentPlayer;
            const winner = loser === 1 ? 2 : 1;
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
        setShowWinnerModal(false);
    };
    const handleBoardConfigChange = (num: number, size: number) => {
        setNumberOfBoards(Math.min(5, Math.max(1, num)));
        setBoardSize(size as BoardSize);
        setShowBoardConfig(false);
        resetGame(num, size as BoardSize);
    };

    const router = useRouter();
    const exitToMenu = () => {
        router.push('/');
    }

    return (
        <div className="flex flex-col min-h-screen bg-black relative">
            <div className="flex-1">
                <div className="flex flex-col items-center px-6 py-4 -mb-8">
                    <h2 className="text-red-600 text-[80px] mb-5 text-center">{currentPlayer == 1 ? `${player1Name}` : `${player2Name}`}</h2>
                </div>

                <div className="flex flex-wrap justify-center gap-4 p-4 w-full mb-20">
                    {boards.map((board, index) => (
                        <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.3%-1.5rem)]" style={{ maxWidth: '400px' }}>
                            <Board
                                boardIndex={index}
                                boardState={board}
                                makeMove={makeMove}
                                isDead={isBoardDead(board, boardSize)}
                                boardSize={boardSize}
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-blue-600 px-6 py-2 mt-2">
                    <button onClick={toggleMenu} className="text-white text-[35px]">Settings</button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-[9999] flex items-center justify-center px-4 overflow-y-auto">
                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl py-8">
                        <button onClick={() => {
                            resetGame(numberOfBoards, boardSize);
                            setIsMenuOpen(false);
                        }} className="w-full sm:w-[45%] bg-blue-600 py-4 text-white text-[30px]">
                            Reset
                        </button>
                        <button onClick={() => {
                            setShowBoardConfig(!showBoardConfig);
                            setIsMenuOpen(false);
                        }
                        } className="w-full sm:w-[45%] bg-blue-600 py-4 text-white text-[30px]">
                            Game Configuration
                        </button>
                        <button onClick={() => {
                            setShowNameModal(true);
                            setIsMenuOpen(false);
                        }} className="w-full sm:w-[45%] bg-blue-600 py-4 text-white text-[30px]">
                            Reset Names
                        </button>
                        <button onClick={() => setMute(!mute)} className="w-full sm:w-[45%] bg-blue-600 py-4 text-white text-[30px]">
                            Sound: {mute ? 'Off' : 'On'}
                        </button>
                        <button onClick={exitToMenu} className="w-full sm:w-[45%] bg-blue-600 py-4 text-white text-[30px]">
                            Main Menu
                        </button>
                        <button onClick={toggleMenu} className="w-full sm:w-[45%] bg-blue-600 py-4 text-white text-[30px]">
                            Return to Game
                        </button>
                    </div>
                </div>
            )}

            <PlayerNamesModal
                visible={showNameModal}
                onSubmit={(name1: string, name2: string) => {
                    setPlayer1Name(name1 || 'Player 1'); // Handle empty names
                    setPlayer2Name(name2 || 'Player 2');
                    setShowNameModal(false);
                    resetGame(numberOfBoards, boardSize); // Reset game after name change
                }}
                initialNames={[player1Name, player2Name]} // Pass current names
                key={player1Name + player2Name}
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
                }}
            />
            <BoardConfigModal
                visible={showBoardConfig}
                currentBoards={numberOfBoards}
                currentSize={boardSize}
                onConfirm={handleBoardConfigChange}
                onCancel={() => setShowBoardConfig(false)}
            />
        </div>
    );
};

export default Game;
