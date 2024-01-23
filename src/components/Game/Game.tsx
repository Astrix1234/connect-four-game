import scss from './Game.module.scss';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Players } from '../Players/Players';
import { GameHeader } from '../GameHeader/GameHeader';
import { ModalMenuGame } from '../ModalMenuGame/ModalMenuGame';
import { ReactComponent as BoardBlackLarge } from '../../assets/images/board-layer-black-large.svg';
import { ReactComponent as BoardWhiteLarge } from '../../assets/images/board-layer-white-large.svg';
import { ReactComponent as BoardBlackSmall } from '../../assets/images/board-layer-black-small.svg';
import { ReactComponent as BoardWhiteSmall } from '../../assets/images/board-layer-white-small.svg';
import { ReactComponent as TokenRedLarge } from '../../assets/images/counter-red-large.svg';
import { ReactComponent as TokenRedSmall } from '../../assets/images/counter-red-small.svg';
import { ReactComponent as TokenYellowLarge } from '../../assets/images/counter-yellow-large.svg';
import { ReactComponent as TokenYellowSmall } from '../../assets/images/counter-yellow-small.svg';
import { GameContext } from '../App';

type Cell = null | 1 | 2;

export const Game = () => {
  const { playerVsPlayer } = useContext(GameContext);
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();
  const [game, setGame] = useState(true);
  /* eslint-disable */
  const [winsPlayerOne, setWinsPlayerOne] = useState(true);
  const [winsYou, setWinsYou] = useState(true);
  const [playerOne, setPlayerOne] = useState(true);
  const [you, setYou] = useState(true);
  const initialMarkerPosition = 632 / 2;
  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
  const [counter, setCounter] = useState(30);
  /* eslint-disable */

  const ROWS = 6;
  const COLUMNS = 7;
  const initialBoard: Cell[][] = Array.from({ length: ROWS }, () =>
    Array(COLUMNS).fill(null)
  );

  const [gameBoard, setGameBoard] = useState<Cell[][]>(initialBoard);

  const addTokenToColumn = (column: number, player: Cell) => {
    const newBoard = [...gameBoard];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][column] === null) {
        newBoard[row][column] = player;
        break;
      }
    }
    setGameBoard(newBoard);
  };

  const handleColumnClick = (columnIndex: number) => {
    const currentPlayer = playerOne ? 1 : 2;
    addTokenToColumn(columnIndex, currentPlayer);

    setPlayerOne(!playerOne);
  };

  const toggleMenuGame = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const handleMenuClick = () => {
    toggleMenuGame();
  };

  const handleMenuGameBackgroundClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (event.currentTarget === event.target) {
      toggleMenuGame();
    }
  };

  useEffect(() => {
    const handleEscapeKeyMenu = (event: KeyboardEvent) => {
      if (isOpened && event.key === 'Escape') {
        toggleMenuGame();
      }
    };
    if (isOpened) {
      document.addEventListener('keydown', handleEscapeKeyMenu);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyMenu);
    };
  }, [isOpened, toggleMenuGame]);

  const backgroundMenuClasses = `${scss.backgroundMenu} ${
    !isOpened ? scss['is-hidden'] : ''
  }`;

  const handleRestartClick = () => {};
  const handlePlayAgainClick = () => {
    setGame(true);
  };

  const handleRestart = () => {
    toggleMenuGame();
    handleRestartClick();
  };

  const handleContinue = () => {
    toggleMenuGame();
  };

  const handleQuit = () => {
    handleRestart();
    navigate('/');
  };

  const handleMouseMove = (event: MouseEvent) => {
    const boardContainer = document.querySelector(
      `.${scss.game__boardContainer}`
    ) as HTMLElement;
    const containerRect = boardContainer.getBoundingClientRect();
    const containerStartX = containerRect.left;

    const columnWidth = containerRect.width / 7;
    const relativeMouseX = event.clientX - containerStartX;

    const columnIndex = Math.floor(relativeMouseX / columnWidth);
    const markerPosition = columnIndex * columnWidth + columnWidth / 2;
    setMarkerPosition(markerPosition);
  };

  useEffect(() => {
    const boardContainer = document.querySelector(
      `.${scss.game__boardContainer}`
    ) as HTMLElement;
    if (boardContainer) {
      boardContainer.addEventListener('mousemove', handleMouseMove);
    } else {
      console.error('Game container not found');
    }
    return () => {
      if (boardContainer) {
        boardContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  let gameStyle = scss.game;
  let bottomBarStyle = scss.game__bottomBar;
  let boardStyle = scss.game__board;
  let turnStyle = scss.game__turn;
  let winsStyle = scss.game__wins;

  if (isMobile) {
    gameStyle += ` ${scss.gameMobile}`;
    bottomBarStyle += ` ${scss.gameMobile__bottomBar}`;
    boardStyle += ` ${scss.gameMobile__board}`;
    turnStyle += ` ${scss.gameMobile__turn}`;
    winsStyle += ` ${scss.gameMobile__wins}`;
  } else if (isTablet) {
    gameStyle += ` ${scss.gameTablet}`;
    bottomBarStyle += ` ${scss.gameTablet__bottomBar}`;
    boardStyle += ` ${scss.gameTablet__board}`;
    turnStyle += ` ${scss.gameTablet__turn}`;
    winsStyle += ` ${scss.gameTablet__wins}`;
  } else if (isDesktop) {
    gameStyle += ` ${scss.gameDesktop}`;
    bottomBarStyle += ` ${scss.gameDesktop__bottomBar}`;
    boardStyle += ` ${scss.gameDesktop__board}`;
    turnStyle += ` ${scss.gameDesktop__turn}`;
    winsStyle += ` ${scss.gameDesktop__wins}`;
  }

  const turnClasses = `${turnStyle} ${
    playerOne || you ? scss['game__turn-rose'] : scss['game__turn-yellow']
  }`;
  const markerClasses = `${scss.game__marker} ${
    playerOne || you ? scss['game__marker-rose'] : scss['game__marker-yellow']
  }`;
  const bottomBarClasses = `${bottomBarStyle} ${
    !game
      ? winsPlayerOne || winsYou
        ? scss['game__bottomBar-rose']
        : scss['game__bottomBar-yellow']
      : ''
  }`;

  return (
    <>
      <div className={gameStyle}>
        <GameHeader
          onClickMenu={handleMenuClick}
          onClickRestart={handleRestartClick}
        />
        <Players />
        <div className={`${boardStyle} ${scss.game__boardBlack}`}>
          {(isDesktop || isTablet) && <BoardBlackLarge />}
          {isMobile && <BoardBlackSmall />}
        </div>
        <div className={`${boardStyle} ${scss.game__boardWhite}`}>
          <div className={scss.game__boardContainer}>
            {isDesktop && (
              <div
                className={markerClasses}
                style={{
                  left: `${markerPosition}px`,
                  transition: 'all 0.3s ease-in-out',
                }}
              ></div>
            )}
            {(isDesktop || isTablet) && <BoardWhiteLarge />}
            {isMobile && <BoardWhiteSmall />}
            {gameBoard.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={scss.game__token}
                style={{
                  position: 'absolute',
                  top: isMobile
                    ? `${6 + rowIndex * (41 + 6)}px`
                    : `${17 + rowIndex * (70 + 18)}px`,
                  height: `${isMobile ? 41 : 70}px`,
                  width: '100%',
                }}
              >
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={scss.game__token}
                    style={{
                      position: 'absolute',
                      left: isMobile
                        ? `${5.5 + colIndex * (41 + 6)}px`
                        : `${17 + colIndex * (70 + 18)}px`,
                      width: `${isMobile ? 41 : 70}px`,
                      height: '100%',
                    }}
                    onClick={() => handleColumnClick(colIndex)}
                  >
                    {cell === 1 && (
                      <div>
                        {(isDesktop || isTablet) && <TokenRedLarge />}
                        {isMobile && <TokenRedSmall />}
                      </div>
                    )}
                    {cell === 2 && (
                      <div>
                        {(isDesktop || isTablet) && <TokenYellowLarge />}
                        {isMobile && <TokenYellowSmall />}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {game ? (
          <div className={turnClasses}>
            {playerVsPlayer ? (
              <p className={scss.game__turnText}>
                {playerOne ? 'PLAYER 1’S TURN' : 'PLAYER 2’S TURN'}
              </p>
            ) : (
              <p className={scss.game__turnText}>
                {you ? 'YOUR TURN' : 'CPU’S TURN'}
              </p>
            )}
            <p className={scss.game__turnCounter}>{counter}s</p>
          </div>
        ) : (
          <div className={winsStyle}>
            {playerVsPlayer ? (
              <p className={scss.game__winsPlayer}>
                {winsPlayerOne ? 'PLAYER 1' : 'PLAYER 2'}
              </p>
            ) : (
              <p className={scss.game__winsPlayer}>{winsYou ? 'YOU' : 'CPU'}</p>
            )}
            <p className={scss.game__winsWins}>WINS</p>
            <button
              type="button"
              className={scss.game__winsButton}
              onClick={handlePlayAgainClick}
            >
              PLAY AGAIN
            </button>
          </div>
        )}
        <div className={bottomBarClasses}></div>
      </div>
      <div
        className={backgroundMenuClasses}
        onClick={handleMenuGameBackgroundClick}
      >
        <ModalMenuGame
          onClickRestart={handleRestart}
          onClickContinue={handleContinue}
          onClickQuit={handleQuit}
        />
      </div>
    </>
  );
};
