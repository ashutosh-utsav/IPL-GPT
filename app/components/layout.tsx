import './global.css';

export const metadata = {
  title: 'IPL-GPT',
  description: 'IPL RAG Chatbot',
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;