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
  const [winsPlayerOne, setWinsPlayerOne] = useState(false);
  const [winsYou, setWinsYou] = useState(false);
  const [playerOne, setPlayerOne] = useState(true);
  const [you, setYou] = useState(true);
  const initialMarkerPosition = 632 / 2;
  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
  const [counter, setCounter] = useState(10);
  const [pointsPlayerOne, setPointsPlayerOne] = useState(0);
  const [pointsPlayerTwo, setPointsPlayerTwo] = useState(0);
  const [pointsYou, setPointsYou] = useState(0);
  const [pointsCpu, setPointsCpu] = useState(0);

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

  const getCurrentPlayer = () => {
    if (playerVsPlayer) {
      return playerOne ? 1 : 2;
    } else {
      return you ? 1 : 2;
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | number;

    if (!isOpened && game) {
      timerId = setInterval(() => {
        setCounter(prevCounter => (prevCounter > 0 ? prevCounter - 1 : 0));
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isOpened, game]);

  useEffect(() => {
    if (counter === 0) {
      if (playerVsPlayer) {
        setWinsPlayerOne(!playerOne);
        if (playerOne) {
          setPointsPlayerTwo(prevPoints => prevPoints + 1);
        } else {
          setPointsPlayerOne(prevPoints => prevPoints + 1);
        }
      } else {
        setWinsYou(!you);
        if (you) {
          setPointsCpu(prevPoints => prevPoints + 1);
        } else {
          setPointsYou(prevPoints => prevPoints + 1);
        }
      }
      setGame(false);
    }
  }, [counter, playerOne, you, playerVsPlayer]);

  const handleColumnClick = (columnIndex: number) => {
    const currentPlayer = getCurrentPlayer();
    addTokenToColumn(columnIndex, currentPlayer);

    if (playerVsPlayer) {
      setPlayerOne(!playerOne);
    } else {
      setYou(!you);
    }
    resetCounter();
  };

  const resetCounter = () => {
    setCounter(10);
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

  const handleRestartClick = () => {};

  const handlePlayAgainClick = () => {
    setCounter(10);
    setGame(true);
    setWinsPlayerOne(false);
    setWinsYou(false);
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
    if (boardContainer && game) {
      boardContainer.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (boardContainer) {
        boardContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [game]);

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
    playerOne ? scss['game__turn-rose'] : scss['game__turn-yellow']
  }`;
  const cpuTurnClasses = you
    ? scss['game__turn-rose']
    : scss['game__turn-yellow'];

  const markerClasses = `${scss.game__marker} ${
    playerOne ? scss['game__marker-rose'] : scss['game__marker-yellow']
  }`;
  const cpuMarkerClasses = you
    ? scss['game__marker-rose']
    : scss['game__marker-yellow'];
  const bottomBarClasses = `${bottomBarStyle} ${
    !game
      ? winsPlayerOne || winsYou
        ? scss['game__bottomBar-rose']
        : scss['game__bottomBar-yellow']
      : ''
  }`;

  const backgroundMenuClasses = `${scss.backgroundMenu} ${
    !isOpened ? scss['is-hidden'] : ''
  }`;

  const getDynamicStyle = (finalTop: string) => {
    return {
      position: 'absolute',
      width: `${isMobile ? 41 : 70}px`,
      height: '100%',
      '--final-top': finalTop,
    };
  };

  return (
    <>
      <div className={gameStyle}>
        <GameHeader
          onClickMenu={handleMenuClick}
          onClickRestart={handleRestartClick}
        />
        <Players
          pointsPlayerOne={pointsPlayerOne}
          pointsPlayerTwo={pointsPlayerTwo}
          pointsYou={pointsYou}
          pointsCpu={pointsCpu}
        />
        <div className={boardStyle}>
          <div className={scss.game__boardContainer}>
            {isDesktop && (
              <div
                className={`${markerClasses} ${cpuMarkerClasses}`}
                style={{
                  left: `${markerPosition}px`,
                  transition: 'all 0.3s ease-in-out',
                }}
              ></div>
            )}
            <div className={scss.game__boardBlack}>
              {(isDesktop || isTablet) && <BoardBlackLarge />}
              {isMobile && <BoardBlackSmall />}
            </div>
            <div className={scss.game__rc}>
              {gameBoard.map((row, rowIndex) => {
                const finalTopDesktop = `${17 + rowIndex * (70 + 18)}px`;
                const finalTopMobile = `${6 + rowIndex * (41 + 6)}px`;

                return (
                  <div
                    key={rowIndex}
                    className={scss.game__token}
                    style={{
                      position: 'absolute',
                      top: isMobile ? finalTopMobile : finalTopDesktop,
                      height: `${isMobile ? 41 : 70}px`,
                      width: '100%',
                    }}
                  >
                    {row.map((cell, colIndex) => {
                      const finalTop = isMobile
                        ? finalTopMobile
                        : finalTopDesktop;
                      const dynamicStyle = getDynamicStyle(finalTop);

                      return (
                        <div
                          key={colIndex}
                          className={`${scss.game__token} ${
                            cell !== null ? scss.tokenDropAnimation : ''
                          }`}
                          style={{
                            ...dynamicStyle,
                            left: isMobile
                              ? `${6 + colIndex * (41 + 5.9)}px`
                              : `${17 + colIndex * (70 + 18)}px`,
                            position: 'absolute' as const,
                          }}
                          onClick={() => {
                            if (game) handleColumnClick(colIndex);
                          }}
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
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className={scss.game__boardWhite}>
              {(isDesktop || isTablet) && <BoardWhiteLarge />}
              {isMobile && <BoardWhiteSmall />}
            </div>
          </div>
        </div>
        {game ? (
          <div className={`${turnClasses} ${cpuTurnClasses}`}>
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
