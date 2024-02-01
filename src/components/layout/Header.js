import IconRefresh from '../ui/IconRefresh';
import Logo from './Logo';

const Header = () => {


  return (
    <header className='header flex'>
        <Logo />
        <IconRefresh />
    </header>
  );
};

export default Header;