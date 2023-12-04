import HeaderNav from './HeaderNav';
import Logo from './Logo';

export default function Header() {
  return (
    <header className='fixed top-0 z-[1] flex w-full items-center justify-between border-b bg-white p-3'>
      <Logo />
      <HeaderNav />
    </header>
  );
}
