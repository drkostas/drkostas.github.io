import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Kostas Georgiou's Profolio."
      />
      <meta
        name="keywords"
        content="kostas georgiou, kostas, georgiou, data scientist portfolio, machine learning engineer, kostas georgiou portfolio, vscode-portfolio"
      />
      <meta property="og:title" content="Kostas Georgiou's Portfolio" />
      <meta
        property="og:description"
        content="Kostas Georgiou's Profolio."
      />
      <meta property="og:image" content="https://imgur.com/YTNNknY.png" />
      <meta property="og:url" content="https://gkos.dev" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Kostas Georgiou',
};
