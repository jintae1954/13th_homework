import { PropsWithChildren } from 'react';
import MyapageUserInfo from '@/components/mypage/MypageUserInfoCard';

export default function MypageLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex w-full max-w-7xl flex-col gap-10">
			<h1 className="w-full text-[28px] font-bold">마이 페이지</h1>
			<MyapageUserInfo />
			<>{children}</>
		</div>
	);
}
