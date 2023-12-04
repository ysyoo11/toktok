import HeaderNav from './HeaderNav';
import Logo from './Logo';

export default function Header() {
  return (
    <header className='flex justify-between border-b p-3'>
      <Logo />
      <HeaderNav />
    </header>
  );
}
