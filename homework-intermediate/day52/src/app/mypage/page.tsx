'use client';

import { withLoginCheck } from '@/commons/hocs/with-login-check';
import MypageHistoryCard from '@/components/mypage/MypageHistoryCard';

function Mypage() {
	return (
		<>
			<MypageHistoryCard />
		</>
	);
}

export default withLoginCheck(Mypage);
