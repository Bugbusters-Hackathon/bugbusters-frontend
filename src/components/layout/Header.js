import IconRefresh from '../ui/IconRefresh';
import Logo from './Logo';
import { useRefresh } from "../../services/context/RefreshContext";

const Header = () => {
  const refresh = useRefresh();

  return (
    <header className='header flex'>
        <Logo />
        <IconRefresh onRefresh={refresh} />
    </header>
  );
};

export default Header;