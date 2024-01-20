import React from 'react';
import scss from './Game.module.scss';
import { useMediaQuery } from 'react-responsive';
import { Players } from '../Players/Players';
import { GameHeader } from '../GameHeader/GameHeader';
import { ReactComponent as BoardBlackLarge } from '../../assets/images/board-layer-black-large.svg';
import { ReactComponent as BoardWhiteLarge } from '../../assets/images/board-layer-white-large.svg';
import { ReactComponent as BoardBlackSmall } from '../../assets/images/board-layer-black-small.svg';
import { ReactComponent as BoardWhiteSmall } from '../../assets/images/board-layer-white-small.svg';

export const Game = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  let gameStyle = scss.game;
  let bottomBarStyle = scss.game__bottomBar;
  let boardStyle = scss.game__board;

  if (isMobile) {
    gameStyle += ` ${scss.gameMobile}`;
    bottomBarStyle += ` ${scss.gameMobile__bottomBar}`;
    boardStyle += ` ${scss.gameMobile__board}`;
  } else if (isTablet) {
    gameStyle += ` ${scss.gameTablet}`;
    bottomBarStyle += ` ${scss.gameTablet__bottomBar}`;
    boardStyle += ` ${scss.gameTablet__board}`;
  } else if (isDesktop) {
    gameStyle += ` ${scss.gameDesktop}`;
    bottomBarStyle += ` ${scss.gameDesktop__bottomBar}`;
    boardStyle += ` ${scss.gameDesktop__board}`;
  }

  return (
    <div className={gameStyle}>
      <GameHeader />
      <Players />
      <div className={`${boardStyle} ${scss.game__boardBlack}`}>
        {(isDesktop || isTablet) && <BoardBlackLarge />}
        {isMobile && <BoardBlackSmall />}
      </div>
      <div className={`${boardStyle} ${scss.game__boardWhite}`}>
        {(isDesktop || isTablet) && <BoardWhiteLarge />}
        {isMobile && <BoardWhiteSmall />}
      </div>
      <div className={bottomBarStyle}></div>
    </div>
  );
};
