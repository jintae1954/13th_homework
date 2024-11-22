'use client';

import Image from 'next/image';
import profile from '@/assets/profile.png';
import POINT from '@/assets/point.png';
import { RightOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FETCH_USER_LOGGED_IN } from '@/commons/apis/queries/fetch-user-logged-in';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MY_PAGE_USER_INFO_HISTORIES = [
	{
		name: '거래내역&북마크',
		url: '/mypage',
	},
	{
		name: '포인트 사용 내역',
		url: '/mypage/used-point-history',
	},
	{
		name: '비밀번호 변경',
		url: '/mypage/change-password',
	},
];

export default function MyapageUserInfo() {
	const pathname = usePathname();
	const { data: userLoggedIn } = useQuery(FETCH_USER_LOGGED_IN);
	const [point, setPoint] = useState(0);

	useEffect(() => {
		if (userLoggedIn?.fetchUserLoggedIn.userPoint?.amount)
			setPoint(userLoggedIn?.fetchUserLoggedIn.userPoint?.amount);
	}, [userLoggedIn?.fetchUserLoggedIn]);

	return (
		<>
			{/* 사용자 정보 */}
			<div className="flex w-full flex-col gap-6 rounded-lg border p-6">
				{/* 타이틀 영역 */}
				<h1>내 정보</h1>
				{/* 프로필 영역 */}
				<div className="flex gap-1">
					<Image src={profile} alt="프로필" />
					<span>내 이름</span>
				</div>
				{/* 포인트 영역 */}
				<hr className="h-[1px] border-0 bg-[#E4E4E4]" />
				<div className="flex gap-1">
					<Image src={POINT} alt="포인트" />
					<span>{point.toLocaleString()}P</span>
				</div>
				<hr className="h-[1px] border-0 bg-[#E4E4E4]" />
				{/* 기타 정보 영역 */}
				<div className="flex flex-col gap-2">
					{MY_PAGE_USER_INFO_HISTORIES.map(({ name, url }) => {
						const isActiveTab = pathname === url;
						return (
							<Link
								key={url}
								href={url}
								className={`user-info-detail-tab ${isActiveTab ? `active` : ``}`}
							>
								<div>{name}</div>
								<RightOutlined />
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
}
