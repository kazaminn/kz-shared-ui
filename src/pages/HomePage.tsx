import React from 'react';
import { Button } from '@/components/aria/Button';

const HomePage = (): React.ReactNode => {
  return (
    <div className="m-10">
      <h1>Hello World</h1>
      <Button type="button" variant="primary">
        ボタン
      </Button>
      <a href="https://google.com">Google Serarch</a>
    </div>
  );
};

export default HomePage;
