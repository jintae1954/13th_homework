'use client';

import { useParams } from 'next/navigation';

export default function BoardDetail() {
  const { boardId } = useParams();
  return <>{boardId}의 상세 페이지 입니다.</>;
}
