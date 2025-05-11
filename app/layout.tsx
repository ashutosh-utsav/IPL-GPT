import './globle.css';

export const metadata = {
  title: 'IPL-GPT',
  description: 'Ask anything about IPL',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout;