'use client';

import { useState } from 'react';

export default function BoardsPage() {
  const [state] = useState('진태');

  return <div>안녕하세요 {state} 정적 페이지 입니다.</div>;
}
