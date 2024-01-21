import scss from './Game.module.scss';
import { useMediaQuery } from 'react-responsive';
import { Players } from '../Players/Players';
import { GameHeader } from '../GameHeader/GameHeader';
import { ReactComponent as BoardBlackLarge } from '../../assets/images/board-layer-black-large.svg';
import { ReactComponent as BoardWhiteLarge } from '../../assets/images/board-layer-white-large.svg';
import { ReactComponent as BoardBlackSmall } from '../../assets/images/board-layer-black-small.svg';
import { ReactComponent as BoardWhiteSmall } from '../../assets/images/board-layer-white-small.svg';
import { ReactComponent as MarkerRed } from '../../assets/images/marker-red.svg';
// import { ReactComponent as MarkerYellow } from '../../assets/images/marker-yellow.svg';

export const Game = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  let gameStyle = scss.game;
  let bottomBarStyle = scss.game__bottomBar;
  let boardStyle = scss.game__board;
  let turnStyle = scss.game__turn;

  if (isMobile) {
    gameStyle += ` ${scss.gameMobile}`;
    bottomBarStyle += ` ${scss.gameMobile__bottomBar}`;
    boardStyle += ` ${scss.gameMobile__board}`;
    turnStyle += ` ${scss.gameMobile__turn}`;
  } else if (isTablet) {
    gameStyle += ` ${scss.gameTablet}`;
    bottomBarStyle += ` ${scss.gameTablet__bottomBar}`;
    boardStyle += ` ${scss.gameTablet__board}`;
    turnStyle += ` ${scss.gameTablet__turn}`;
  } else if (isDesktop) {
    gameStyle += ` ${scss.gameDesktop}`;
    bottomBarStyle += ` ${scss.gameDesktop__bottomBar}`;
    boardStyle += ` ${scss.gameDesktop__board}`;
    turnStyle += ` ${scss.gameDesktop__turn}`;
  }

  const handleMenuClick = () => {};
  const handleRestartClick = () => {};
  return (
    <div className={gameStyle}>
      <GameHeader
        onClickMenu={handleMenuClick}
        onClickRestart={handleRestartClick}
      />
      <Players />
      {isDesktop && (
        <div className={scss.game__marker}>
          <MarkerRed />
          {/* <MarkerYellow /> */}
        </div>
      )}
      <div className={`${boardStyle} ${scss.game__boardBlack}`}>
        {(isDesktop || isTablet) && <BoardBlackLarge />}
        {isMobile && <BoardBlackSmall />}
      </div>
      <div className={`${boardStyle} ${scss.game__boardWhite}`}>
        {(isDesktop || isTablet) && <BoardWhiteLarge />}
        {isMobile && <BoardWhiteSmall />}
      </div>
      <div className={turnStyle}></div>
      <div className={bottomBarStyle}></div>
    </div>
  );
};
