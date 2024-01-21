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

  const handleMenuClick = () => {};
  const handleRestartClick = () => {};
  const handlePlayAgainClick = () => {};

  return (
    <div className={gameStyle}>
      <GameHeader
        onClickMenu={handleMenuClick}
        onClickRestart={handleRestartClick}
      />
      <Players />
      {isDesktop && <div className={scss.game__marker}></div>}
      <div className={`${boardStyle} ${scss.game__boardBlack}`}>
        {(isDesktop || isTablet) && <BoardBlackLarge />}
        {isMobile && <BoardBlackSmall />}
      </div>
      <div className={`${boardStyle} ${scss.game__boardWhite}`}>
        {(isDesktop || isTablet) && <BoardWhiteLarge />}
        {isMobile && <BoardWhiteSmall />}
      </div>
      <div className={turnStyle}>
        <p className={scss.game__turnText}>PLAYER 1’S TURN</p>
        <p className={scss.game__turnCounter}>30s</p>
      </div>
      <div className={winsStyle}>
        <p className={scss.game__winsPlayer}>PLAYER 1</p>
        <p className={scss.game__winsWins}>WINS</p>
        <button
          type="button"
          className={scss.game__winsButton}
          onClick={handlePlayAgainClick}
        >
          PLAY AGAIN
        </button>
      </div>
      <div className={bottomBarStyle}></div>
    </div>
  );
};
